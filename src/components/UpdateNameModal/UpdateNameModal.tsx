import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'
import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import type { ModalProps } from '@chakra-ui/react'
import type { FC } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import { useAuthState } from 'hooks/useAuthState'
import { useFeedback } from 'hooks/useFeedback'
import { updateUserProfile } from 'services/Firebase/authentication'
import { useMutation } from '@tanstack/react-query'

interface UpdateNameFields {
  displayName: string
}

interface Props extends Omit<ModalProps, 'children'> {}

const UpdateNameModal: FC<Props> = (props) => {
  const { onClose, ...restProps } = props

  const { user } = useAuthState()
  const { success } = useFeedback()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<UpdateNameFields>()

  const handleClose = () => {
    onClose()
    reset({ displayName: user?.displayName || '' })
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      success({ title: 'บันทึกชื่อแล้ว' })
      handleClose()
    },
  })

  const onSubmit: SubmitHandler<UpdateNameFields> = ({ displayName }) => {
    mutate({ displayName })
  }

  useEffect(() => {
    reset({ displayName: user?.displayName || '' })
  }, [user])

  return (
    <Modal onClose={handleClose} {...restProps}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>กรุณากรอกชื่อผู้เล่น</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired isInvalid={!isEmpty(errors.displayName)}>
              <Input
                autoComplete='name'
                placeholder='กรอกชื่อ'
                {...register('displayName', {
                  required: { value: true, message: 'กรุณากรอกชื่อผู้เล่น' },
                })}
              />
              <FormErrorMessage>{errors.displayName?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Stack direction='row'>
              <Button onClick={handleClose} isDisabled={isLoading}>
                ยกเลิก
              </Button>
              <Button
                type='submit'
                colorScheme='green'
                isDisabled={!isDirty}
                onClick={handleSubmit(onSubmit)}
                isLoading={isLoading}
              >
                บันทึก
              </Button>
            </Stack>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default UpdateNameModal
