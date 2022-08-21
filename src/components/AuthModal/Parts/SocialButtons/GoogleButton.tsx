import { IconButton, Tooltip } from '@chakra-ui/react'
import { GoogleAuthProvider } from 'firebase/auth'
import { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'

import type { FC } from 'react'

import { useFeedback } from 'hooks/useFeedback'
import { signInWithProvider } from 'services/Firebase/authentication'

const googleProvider = new GoogleAuthProvider()

const GoogleButton: FC = () => {
  const { success, error } = useFeedback()
  const [isLoading, setIsLoading] = useState(false)
  const onClick = async () => {
    setIsLoading(true)
    try {
      await signInWithProvider(googleProvider)
      success({ title: 'เข้าสู่ระบบสำเร็จ' })
    } catch (err) {
      error(err)
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
