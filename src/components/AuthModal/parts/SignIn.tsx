import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useBoolean,
  useDisclosure,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import type { FC } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import { useFeedback } from 'hooks/useFeedback'
import { signInWithEmail } from 'services/Firebase/authentication'

import ResetPasswordModal from './ResetPasswordModal'

interface SignInFields {
  email: string
  password: string
}

interface Props {
  onClose?: () => void
}

const SignInPart: FC<Props> = (props) => {
  const { onClose } = props
  const { success } = useFeedback()

  const [showPassword, setShowPassword] = useBoolean()

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
  } = useForm<SignInFields>()

  const { mutate, isLoading } = useMutation({
    mutationFn: signInWithEmail,
    onSuccess: () => {
      success({ title: 'เข้าสู่ระบบสำเร็จ' })
      onClose?.()
      reset()
    },
  })

  const onSubmit: SubmitHandler<SignInFields> = ({ email, password }) => {
    mutate({ email, password })
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
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              autoComplete='current-password'
              placeholder='กรอกรหัสผ่าน'
              {...register('password', {
                required: { value: true, message: 'กรุณากรอกรหัสผ่าน' },
              })}
            />
            <InputRightElement>
              <IconButton
                size='sm'
                aria-label='show/hide password'
                icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                onClick={() => setShowPassword.toggle()}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button type='submit' colorScheme='blue' isLoading={isLoading}>
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
