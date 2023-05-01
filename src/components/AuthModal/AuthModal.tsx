import {
  Divider,
  HStack,
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
} from '@chakra-ui/react'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'

import type { ModalProps } from '@chakra-ui/react'
import type { FC } from 'react'

import { useAuthState } from 'hooks/useAuthState'

import FacebookButton from './parts/FacebookButton'
import GoogleButton from './parts/GoogleButton'
import SignIn from './parts/SignIn'
import SignUp from './parts/SignUp'
import { AuthType } from './type'

const AUTH_TYPES = [
  {
    type: AuthType.sign_in,
    name: 'เข้าสู่ระบบ',
  },
  {
    type: AuthType.sign_up,
    name: 'ลงทะเบียน',
  },
]

interface IProps extends Omit<ModalProps, 'children'> {}

const AuthModal: FC<IProps> = (props) => {
  const { onClose } = props
  const { user } = useAuthState()

  const [authType, setAuthType] = useState(AuthType.sign_in)

  useEffect(() => {
    if (!isEmpty(user)) {
      onClose()
    }
  }, [user])

  return (
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
            {authType === AuthType.sign_up ? (
              <SignUp onClose={onClose} />
            ) : (
              <SignIn onClose={onClose} />
            )}
            <HStack>
              <Divider />
              <Text>หรือ</Text>
              <Divider />
            </HStack>
            <HStack justifyContent='center'>
              <FacebookButton />
              <GoogleButton />
            </HStack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AuthModal
