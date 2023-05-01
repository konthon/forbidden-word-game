import { useMutation } from '@tanstack/react-query'
import { ProviderId } from 'firebase/auth'
import { useEffect, useRef } from 'react'

import { useFeedback } from 'hooks/useFeedback'
import { getRedirectProviderResult } from 'services/Firebase/authentication'

type ProviderIdKey = keyof typeof ProviderId
type ProviderIdValue = (typeof ProviderId)[ProviderIdKey]

const isValidProvider = (
  providerId: string | null
): providerId is ProviderIdValue =>
  !!providerId &&
  Object.values(ProviderId).some((provider) => provider === providerId)
const getProviderName = (providerId: string | null) => {
  if (isValidProvider(providerId)) {
    switch (providerId) {
      case 'google.com':
        return 'Google'
      case 'facebook.com':
        return 'Facebook'
      default:
        return providerId
    }
  }
  return providerId
}

const useRedirectAuth = () => {
  const { success } = useFeedback()
  const isMounted = useRef(false)

  const { mutate } = useMutation({
    mutationFn: getRedirectProviderResult,
    onSuccess: (userCredential) => {
      if (userCredential) {
        switch (userCredential.operationType) {
          case 'signIn':
            success({
              title: `เข้าสู่ระบบด้วย ${getProviderName(
                userCredential.providerId
              )} สำเร็จแล้ว`,
            })
            break
          default:
            break
        }
      }
    },
  })

  useEffect(() => {
    if (!isMounted.current) {
      mutate()
    }
    return () => {
      isMounted.current = true
    }
  }, [])
}

export default useRedirectAuth
