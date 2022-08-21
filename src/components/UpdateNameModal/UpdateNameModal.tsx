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
import { useForm } from 'react-hook-form'

import type { ModalProps } from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import { useAuthState } from 'hooks/useAuthState'
import { useFeedback } from 'hooks/useFeedback'
import { updateUserProfile } from 'services/Firebase/authentication'

interface IUpdateNameField {
  displayName: string
}

interface IProps extends Omit<ModalProps, 'children'> {}

const UpdateNameModal: FC<IProps> = (props) => {
  const { onClose, ...restProps } = props
  const { user } = useAuthState()
  const { success, error, isLoading, setIsLoading } = useFeedback()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUpdateNameField>()
  const onSubmit: SubmitHandler<IUpdateNameField> = async (data) => {
    setIsLoading(true)
    const { displayName } = data
    try {
      await updateUserProfile({ displayName })
      success({ title: 'บันทึกชื่อแล้ว' })
      onClose()
    } catch (err) {
      error(err)
    }
  }

  useEffect(() => {
    if (user && !isEmpty(user) && user.displayName) {
      setValue('displayName', user.displayName)
    }
  }, [user])

  return (
    <Modal onClose={onClose} {...restProps}>
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
              <Button onClick={onClose} isDisabled={isLoading}>
                ยกเลิก
              </Button>
              <Button
                colorScheme='green'
                type='submit'
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
