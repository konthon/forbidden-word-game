import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
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
import { useMutation } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import { useForm } from 'react-hook-form'

import type { ModalProps } from '@chakra-ui/react'
import type { FC } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import { sendResetPasswordToEmail } from 'services/Firebase/authentication'
import { useFeedback } from 'hooks/useFeedback'

interface ResetPasswordFields {
  email: string
}

interface Props extends Omit<ModalProps, 'children'> {}

const ResetPasswordModal: FC<Props> = (props) => {
  const { isOpen, onClose } = props
  const { success } = useFeedback()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFields>()

  const { mutate, isLoading } = useMutation({
    mutationFn: sendResetPasswordToEmail,
    onSuccess: (_, email) => {
      success({
        title: 'ส่งอีเมลเรียบร้อยแล้ว',
        description: `กรุณาตรวจสอบอีเมล: ${email}`,
      })
      onClose()
      reset()
    },
  })

  const onSubmit: SubmitHandler<ResetPasswordFields> = ({ email }) => {
    mutate(email)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>กรอกอีเมลที่เชื่อมต่อกับระบบ</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired isInvalid={!isEmpty(errors.email)}>
              <FormLabel>อีเมล</FormLabel>
              <Input
                type='email'
                placeholder='กรอกอีเมล'
                {...register('email', {
                  required: { value: true, message: 'กรุณากรอกอีเมล' },
                  pattern: {
                    value: /^[\w-/.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: 'กรุณากรอกอีเมลให้ถูกต้อง',
                  },
                })}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              <FormHelperText>
                ระบบจะส่งลิงก์ไปยังอีเมลนี้เพื่อทำการตั้งค่ารหัสผ่านใหม่
              </FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Stack direction='row'>
              <Button
                onClick={() => {
                  reset()
                  onClose()
                }}
                isDisabled={isLoading}
              >
                ยกเลิก
              </Button>
              <Button type='submit' colorScheme='blue' isLoading={isLoading}>
                ส่ง
              </Button>
            </Stack>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default ResetPasswordModal
