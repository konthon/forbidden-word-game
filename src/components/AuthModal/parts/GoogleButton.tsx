import { IconButton, Tooltip } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { GoogleAuthProvider } from 'firebase/auth'
import { FaGoogle } from 'react-icons/fa'

import type { FC } from 'react'

import { signInRedirectProvider } from 'services/Firebase/authentication'

const googleProvider = new GoogleAuthProvider()

const GoogleButton: FC = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: () => signInRedirectProvider(googleProvider),
  })

  return (
    <Tooltip label='Continue with Google'>
      <IconButton
        aria-label='Continue with Google'
        icon={<FaGoogle />}
        colorScheme='red'
        onClick={() => mutate()}
        isDisabled={!googleProvider.providerId}
        isLoading={isLoading}
      />
    </Tooltip>
  )
}

export default GoogleButton
