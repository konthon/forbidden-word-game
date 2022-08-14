import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from 'libs/Firebase'
import { useEffect, useState } from 'react'

import type { User } from 'firebase/auth'

interface IAuthStateOptions {
  // eslint-disable-next-line no-unused-vars
  onUserChanged?: (user: User | null) => Promise<void>
}

const useAuthState = (options?: IAuthStateOptions) => {
  const { currentUser } = firebaseAuth

  const [data, setData] = useState<User | null>(currentUser)
  const [error, setError] = useState<Error>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const listener = onAuthStateChanged(firebaseAuth, async (user) => {
      setIsLoading(true)
      if (options?.onUserChanged) {
        try {
          await options.onUserChanged(user)
        } catch (e) {
          setError(e as Error)
        }
      }
      setData(user)
      setIsLoading(false)
    })

    return () => {
      listener()
    }
  }, [firebaseAuth])

  return { data, error, isLoading }
}

export default useAuthState
