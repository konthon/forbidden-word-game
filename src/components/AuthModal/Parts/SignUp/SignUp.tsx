import {
  Button,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { isEmpty } from 'lodash'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import type { FC } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import { useFeedback } from 'hooks/useFeedback'
import { signUpWithEmail } from 'services/Firebase/authentication'

interface ISignUpAuthFields {
  email: string
  password: string
  confirmPassword: string
}

interface IProps {
  onClose?: () => void
}

const MIN_LENGTH_PASSWORD = 6

const SignUpPart: FC<IProps> = (props) => {
  const { onClose } = props
  const { isOpen: isShowPassword, onToggle: onToggleShowPassword } =
    useDisclosure()
  const { success, error, isLoading, setIsLoading } = useFeedback()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ISignUpAuthFields>()
  const onSubmit: SubmitHandler<ISignUpAuthFields> = async (data) => {
    setIsLoading(true)
    const { email, password } = data
    try {
      await signUpWithEmail(email, password)
      success({ title: 'ลงทะเบียนสำเร็จ' })
      onClose?.()
      reset()
    } catch (err) {
      error(err)
    }
  }

  return (
    <Stack as='form' onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired isInvalid={!isEmpty(errors.email)}>
        <Input
          type='email'
          autoComplete='username'
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
      </FormControl>
      <FormControl isRequired isInvalid={!isEmpty(errors.password)}>
        <InputGroup>
          <Input
            type={isShowPassword ? 'text' : 'password'}
            autoComplete='new-password'
            placeholder='กรอกรหัสผ่าน'
            {...register('password', {
              required: { value: true, message: 'กรุณากรอกรหัสผ่าน' },
              minLength: {
                value: MIN_LENGTH_PASSWORD,
                message: `รหัสผ่านต้องมีความยาวอย่างน้อย ${MIN_LENGTH_PASSWORD} ตัวอักษร`,
              },
            })}
          />
          <InputRightElement>
            <IconButton
              aria-label='แสดง/ซ่อนรหัสผ่าน'
              icon={isShowPassword ? <FaEye /> : <FaEyeSlash />}
              size='sm'
              onClick={onToggleShowPassword}
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!isEmpty(errors.confirmPassword)}>
        <InputGroup>
          <Input
            type={isShowPassword ? 'text' : 'password'}
            autoComplete='new-password'
            placeholder='กรอกรหัสผ่านอีกครั้ง'
            {...register('confirmPassword', {
              required: {
                value: true,
                message: 'กรุณากรอกรหัสผ่านเพื่อยืนยัน',
              },
              minLength: {
                value: MIN_LENGTH_PASSWORD,
                message: `รหัสผ่านต้องมีความยาวอย่างน้อย ${MIN_LENGTH_PASSWORD} ตัวอักษร`,
              },
              validate: {
                match: (value) =>
                  value === watch('password') || 'กรุณากรอกรหัสผ่านให้ตรงกัน',
              },
            })}
          />
          <InputRightElement>
            <IconButton
              aria-label='แสดง/ซ่อนรหัสผ่าน'
              icon={isShowPassword ? <FaEye /> : <FaEyeSlash />}
              size='sm'
              onClick={onToggleShowPassword}
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
      </FormControl>
      <Button
        colorScheme='blue'
        type='submit'
        onClick={handleSubmit(onSubmit)}
        isLoading={isLoading}
      >
        ลงทะเบียน
      </Button>
    </Stack>
  )
}

SignUpPart.defaultProps = {
  onClose: () => {},
}

export default SignUpPart
