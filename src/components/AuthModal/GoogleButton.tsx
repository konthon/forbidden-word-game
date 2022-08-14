import { IconButton, Tooltip, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { GoogleAuthProvider } from 'firebase/auth'
import { FaGoogle } from 'react-icons/fa'

import type { FC } from 'react'

import { signInWithProvider } from 'services/Firebase/authentication'

const googleProvider = new GoogleAuthProvider()

const GoogleButton: FC = () => {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const onClick = async () => {
    setIsLoading(true)
    try {
      await signInWithProvider(googleProvider)
      toast({
        status: 'success',
        title: 'เข้าสู่ระบบสำเร็จ',
      })
    } catch (error: any) {
      toast({
        status: 'error',
        title: 'เกิดข้อผิดพลาด',
        description: error.message,
      })
    }
    setIsLoading(false)
  }
  return (
    <Tooltip label='Continue with Google'>
      <IconButton
        aria-label='Continue with Google'
        icon={<FaGoogle />}
        colorScheme='red'
        onClick={onClick}
        isDisabled={!googleProvider.providerId}
        isLoading={isLoading}
      />
    </Tooltip>
  )
}

export default GoogleButton
