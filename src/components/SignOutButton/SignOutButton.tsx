import { Button } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import type { ButtonProps } from '@chakra-ui/react'
import type { FC } from 'react'

import { signOut } from 'services/Firebase/authentication'

interface Props extends ButtonProps {}

const SignOutButton: FC<Props> = (props) => {
  const { isLoading, ...restProps } = props
  const { mutate, isLoading: isSigningOut } = useMutation({
    mutationFn: signOut,
  })
  return (
    <Button
      colorScheme='red'
      isLoading={isLoading || isSigningOut}
      onClick={() => mutate()}
      {...restProps}
    >
      ออกจากระบบ
    </Button>
  )
}

export default SignOutButton
