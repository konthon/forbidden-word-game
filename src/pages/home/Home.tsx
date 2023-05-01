import {
  Text,
  Heading,
  Center,
  Button,
  Stack,
  Container,
  useDisclosure,
  Divider,
  Flex,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { isEmpty } from 'lodash'
import { FaPen } from 'react-icons/fa'

import type { FC } from 'react'

import { AuthModal } from 'components/AuthModal'
import { SignOutButton } from 'components/SignOutButton'
import { UpdateNameModal } from 'components/UpdateNameModal'
import { useAuthState } from 'hooks/useAuthState'
import { useRedirectAuth } from 'hooks/useRedirectAuth'
import { signInAnonymously } from 'services/Firebase/authentication'

const HomePage: FC = () => {
  const { user, isLoading } = useAuthState()

  const {
    isOpen: isOpenAuthModal,
    onOpen: onOpenAuthModal,
    onClose: onCloseAuthModal,
  } = useDisclosure()

  const {
    isOpen: isOpenUpdateNameModal,
    onOpen: onOpenUpdateNameModal,
    onClose: onCloseUpdateNameModal,
  } = useDisclosure()

  const displayName = useMemo(() => {
    const NAME_MAX_LENGTH = 20
    if (user && !isEmpty(user)) {
      const name = user.displayName || user.email || user.uid
      const ellipsis = name.length > NAME_MAX_LENGTH ? '...' : ''
      return `${name.slice(0, NAME_MAX_LENGTH)}${ellipsis}`
    }
    return 'User'
  }, [user, user?.displayName, user?.email, user?.uid])

  useRedirectAuth()

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
                <Button
                  isLoading={isLoading}
                  onClick={() => signInAnonymously()}
                >
                  ไม่ระบุตัวตน
                </Button>
              </Stack>
            )}
            {!isEmpty(user) && !isLoading && (
              <>
                <Flex
                  alignItems='center'
                  justifyContent='center'
                  flexWrap='wrap'
                  gap={2}
                  textAlign='center'
                >
                  <Text>ยินดีต้อนรับ!</Text>
                  <Tooltip label='แก้ไขชื่อ'>
                    <Button
                      rightIcon={<FaPen />}
                      onClick={onOpenUpdateNameModal}
                    >
                      {displayName}
                    </Button>
                  </Tooltip>
                </Flex>
                <VStack
                  pt={4}
                  width='full'
                  sx={{ button: { width: 'min(200px, 100%)' } }}
                >
                  <Button colorScheme='blue'>เริ่มเกมใหม่</Button>
                  <Button>ใส่รหัสห้อง</Button>
                  <Divider />
                  <SignOutButton />
                </VStack>
              </>
            )}
          </Stack>
        </Center>
      </Container>
      <AuthModal isOpen={isOpenAuthModal} onClose={onCloseAuthModal} />
      <UpdateNameModal
        isOpen={isOpenUpdateNameModal}
        onClose={onCloseUpdateNameModal}
      />
    </>
  )
}

export default HomePage
