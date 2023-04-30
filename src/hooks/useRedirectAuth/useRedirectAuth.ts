import { useEffect } from 'react'

import { useFeedback } from 'hooks/useFeedback'
import { getRedirectProviderResult } from 'services/Firebase/authentication'
import { ProviderId } from 'firebase/auth'

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
  const { success, error } = useFeedback()

  useEffect(() => {
    getRedirectProviderResult()
      .then((result) => {
        if (result) {
          switch (result.operationType) {
            case 'signIn':
              success({
                title: `เข้าสู่ระบบด้วย ${getProviderName(
                  result.providerId
                )} สำเร็จแล้ว`,
              })
              break

            default:
              break
          }
        }
      })
      .catch((err) => {
        error(err)
      })
  }, [])
}

export default useRedirectAuth
