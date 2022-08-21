import { IconButton, Tooltip } from '@chakra-ui/react'
import { FC } from 'react'
import { FaFacebook } from 'react-icons/fa'

const FacebookButton: FC = () => (
  <Tooltip label='Connect with Facebook'>
    <IconButton
      aria-label='Connect with Facebook'
      icon={<FaFacebook />}
      colorScheme='facebook'
      isDisabled
    />
  </Tooltip>
)

export default FacebookButton
