import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { isEmpty } from 'lodash'
import { useForm } from 'react-hook-form'

import type { FC } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import { useFeedback } from 'hooks/useFeedback'
import { signInWithEmail } from 'services/Firebase/authentication'

import { ResetPasswordModal } from '../ResetPasswordModal'

interface ISignInAuthFields {
  email: string
  password: string
}

interface IProps {
  onClose?: () => void
}

const SignInPart: FC<IProps> = (props) => {
  const { onClose } = props
  const { success, error, isLoading, setIsLoading } = useFeedback()

  const {
    isOpen: isOpenResetPassword,
    onClose: onCloseResetPassword,
    onOpen: onOpenResetPassword,
  } = useDisclosure()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISignInAuthFields>()

  const onSubmit: SubmitHandler<ISignInAuthFields> = async (data) => {
    setIsLoading(true)
    const { email, password } = data
    try {
      await signInWithEmail(email, password)
      success({ title: 'เข้าสู่ระบบสำเร็จ' })
      onClose?.()
      reset()
    } catch (err) {
      error(err)
    }
  }

  return (
    <>
      <Stack as='form' onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired isInvalid={!isEmpty(errors.email)}>
          <Input
            type='email'
            autoComplete='username'
            placeholder='กรอกอีเมล'
            {...register('email', {
              required: { value: true, message: 'กรุณากรอกอีเมล' },
            })}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!isEmpty(errors.password)}>
          <Input
            type='password'
            autoComplete='current-password'
            placeholder='กรอกรหัสผ่าน'
            {...register('password', {
              required: { value: true, message: 'กรุณากรอกรหัสผ่าน' },
            })}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button
          colorScheme='blue'
          type='submit'
          onClick={handleSubmit(onSubmit)}
          isLoading={isLoading}
        >
          เข้าสู่ระบบ
        </Button>
        <Box alignSelf='center' py={2}>
          <Button
            variant='link'
            onClick={onOpenResetPassword}
            isDisabled={isLoading}
          >
            ลืมรหัสผ่าน?
          </Button>
        </Box>
      </Stack>
      <ResetPasswordModal
        isOpen={isOpenResetPassword}
        onClose={onCloseResetPassword}
      />
    </>
  )
}

SignInPart.defaultProps = {
  onClose: () => {},
}

export default SignInPart
