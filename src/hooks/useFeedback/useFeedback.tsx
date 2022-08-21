import { useToast } from '@chakra-ui/react'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'

import type { UseToastOptions } from '@chakra-ui/react'

import { ERROR_MESSAGES } from 'config/errorMessages'

const useFeedback = () => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast({ isClosable: true })

  const success = (toastOptions?: UseToastOptions) => {
    toast({
      status: 'success',
      title: 'สำเร็จ',
      ...toastOptions,
    })
    setIsLoading(false)
  }

  const error = (err: unknown, toastOptions?: UseToastOptions) => {
    if (err instanceof FirebaseError) {
      const errorMessage = ERROR_MESSAGES.find(
        (errorItem) => errorItem.name === err.code
      )
      if (errorMessage) {
        toast({
          status: 'error',
          title: errorMessage.title,
          description: errorMessage.description || 'กรุณาลองใหม่อีกครั้ง',
          ...toastOptions,
        })
      } else {
        toast({
          status: 'error',
          title: `พบปัญหา [${err.code}]`,
          description: err.message,
          ...toastOptions,
        })
      }
    } else {
      toast({ status: 'error', title: 'พบปัญหา', ...toastOptions })
    }
    setIsLoading(false)
  }

  return { success, error, toast, isLoading, setIsLoading }
}

export default useFeedback
