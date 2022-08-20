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
  useToast,
} from '@chakra-ui/react'
import { isEmpty } from 'lodash'
import { useForm } from 'react-hook-form'

import type { ModalProps } from '@chakra-ui/react'
import type { FC } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import { sendResetPasswordToEmail } from 'services/Firebase/authentication'

interface IResetPasswordFields {
  email: string
}

interface IProps extends Omit<ModalProps, 'children'> {}

const ResetPasswordModal: FC<IProps> = (props) => {
  const { isOpen, onClose } = props
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IResetPasswordFields>()
  const onSubmit: SubmitHandler<IResetPasswordFields> = async (data) => {
    const { email } = data
    try {
      await sendResetPasswordToEmail(email)
      toast({
        status: 'success',
        title: 'ส่งอีเมลเรียบร้อยแล้ว',
        description: `กรุณาตรวจสอบอีเมล: ${email}`,
      })
      onClose()
      reset()
    } catch (error: any) {
      toast({
        status: 'error',
        title: 'พบปัญหาการส่งอีเมลตั้งค่ารหัสผ่านใหม่',
        description: error.message,
      })
    }
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
              >
                ยกเลิก
              </Button>
              <Button
                type='submit'
                colorScheme='blue'
                onClick={handleSubmit(onSubmit)}
              >
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
