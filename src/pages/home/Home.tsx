import {
  Text,
  Heading,
  Center,
  Button,
  Stack,
  Container,
  useDisclosure,
  Divider,
} from '@chakra-ui/react'
import { AuthModal } from 'components/AuthModal'
import { useAuthState } from 'hooks/useAuthState'
import { isEmpty } from 'lodash'

import type { FC } from 'react'

import { signOut } from 'services/Firebase/authentication'

const HomePage: FC = () => {
  const { data: user, isLoading } = useAuthState()
  const {
    isOpen: isOpenAuthModal,
    onOpen: onOpenAuthModal,
    onClose: onCloseAuthModal,
  } = useDisclosure()
  return (
    <>
      <Container>
        <Center minHeight='100vh'>
          <Stack alignItems='center'>
            <Heading as='h1'>เกมคำต้องห้าม</Heading>
            {isEmpty(user) && (
              <Stack width='min(200px, 100%)' pt={4}>
                <Button
                  colorScheme='blue'
                  onClick={() => onOpenAuthModal()}
                  isLoading={isLoading}
                >
                  เข้าสู่ระบบ
                </Button>
                <Button isLoading={isLoading}>ไม่ระบุตัวตน</Button>
              </Stack>
            )}
            {!isEmpty(user) && !isLoading && (
              <>
                <Text textAlign='center'>
                  ยินดีต้อนรับกลับ!{' '}
                  {user?.displayName || user?.email || user?.uid}
                </Text>
                <Stack
                  pt={4}
                  width='full'
                  alignItems='center'
                  sx={{ button: { width: 'min(200px, 100%)' } }}
                >
                  <Button colorScheme='blue'>เริ่มเกมใหม่</Button>
                  <Button>ใส่รหัสห้อง</Button>
                  <Divider />
                  <Button
                    colorScheme='red'
                    onClick={() => signOut()}
                    isLoading={isLoading}
                  >
                    ออกจากระบบ
                  </Button>
                </Stack>
              </>
            )}
          </Stack>
        </Center>
      </Container>
      <AuthModal isOpen={isOpenAuthModal} onClose={onCloseAuthModal} />
    </>
  )
}

export default HomePage
