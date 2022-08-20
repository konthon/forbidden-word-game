/* eslint-disable no-unused-vars */
import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tab,
  TabList,
  Tabs,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaFacebook } from 'react-icons/fa'

import type { ModalProps } from '@chakra-ui/react'
import type { FC } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import { useAuthState } from 'hooks/useAuthState'
import {
  signInWithEmail,
  signUpWithEmail,
} from 'services/Firebase/authentication'

import GoogleButton from './GoogleButton'
import ResetPasswordModal from './ResetPasswordModal'

// eslint-disable-next-line no-shadow
enum EAuthType {
  sign_in,
  sign_up,
}

const AUTH_TYPES = [
  {
    type: EAuthType.sign_in,
    name: 'เข้าสู่ระบบ',
  },
  {
    type: EAuthType.sign_up,
    name: 'สมัคร',
  },
]

const MIN_LENGTH_PASSWORD = 6

interface IPasswordAuthFields {
  email: string
  password: string
}

interface IProps extends Omit<ModalProps, 'children'> {}

const AuthModal: FC<IProps> = (props) => {
  const { onClose } = props
  const { data: user } = useAuthState()
  const toast = useToast()

  const {
    isOpen: isOpenResetPassword,
    onOpen: onOpenResetPassword,
    onClose: onCloseResetPassword,
  } = useDisclosure()

  const [authType, setAuthType] = useState(EAuthType.sign_in)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPasswordAuthFields>()
  const onSubmit: SubmitHandler<IPasswordAuthFields> = async (data) => {
    const { email, password } = data
    if (authType === EAuthType.sign_in) {
      try {
        await signInWithEmail(email, password)
        toast({
          status: 'success',
          title: 'เข้าสู่ระบบสำเร็จ',
        })
        onClose()
      } catch (error: any) {
        toast({
          status: 'error',
          title: 'เกิดข้อผิดพลาด',
          description: error.message,
        })
      }
    } else if (authType === EAuthType.sign_up) {
      try {
        await signUpWithEmail(email, password)
        toast({
          status: 'success',
          title: 'สมัครสำเร็จ',
        })
        onClose()
      } catch (error: any) {
        toast({
          status: 'error',
          title: 'เกิดข้อผิดพลาด',
          description: error.message,
        })
      }
    }
  }

  useEffect(() => {
    if (!isEmpty(user)) {
      onClose()
    }
  }, [user])

  return (
    <>
      <Modal {...props}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Tabs index={authType} onChange={(index) => setAuthType(index)}>
              <TabList>
                {AUTH_TYPES.map((item) => (
                  <Tab key={item.type}>{item.name}</Tab>
                ))}
              </TabList>
            </Tabs>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Stack as='form' onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!isEmpty(errors.email)}>
                  <Input
                    type='email'
                    autoComplete='email'
                    placeholder='อีเมล'
                    {...register('email', { required: 'กรุณากรอกอีเมล' })}
                  />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!isEmpty(errors.password)}>
                  <Input
                    type='password'
                    autoComplete={
                      authType === EAuthType.sign_in
                        ? 'current-password'
                        : 'new-password'
                    }
                    placeholder='รหัสผ่าน'
                    {...register('password', {
                      required: 'กรุณากรอกรหัสผ่าน',
                      minLength: {
                        value: MIN_LENGTH_PASSWORD,
                        message: `รหัสผ่านคาดเดาง่าย กรุณากรอกมากกว่า ${MIN_LENGTH_PASSWORD} ตัวอักษร`,
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  type='submit'
                  colorScheme='blue'
                  onClick={handleSubmit(onSubmit)}
                >
                  {AUTH_TYPES.find((item) => item.type === authType)?.name}
                </Button>
                {authType === EAuthType.sign_in && (
                  <Button
                    variant='link'
                    alignSelf='center'
                    onClick={onOpenResetPassword}
                  >
                    ลืมรหัสผ่าน?
                  </Button>
                )}
              </Stack>
              <HStack>
                <Divider />
                <Text>หรือ</Text>
                <Divider />
              </HStack>
              <HStack justifyContent='center'>
                <IconButton
                  icon={<FaFacebook />}
                  aria-label='Continue with Facebook'
                  colorScheme='facebook'
                  isDisabled
                />
                <GoogleButton />
              </HStack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ResetPasswordModal
        isOpen={isOpenResetPassword}
        onClose={onCloseResetPassword}
      />
    </>
  )
}

export default AuthModal
