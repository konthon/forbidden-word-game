import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from 'libs/Firebase'
import { useEffect, useState } from 'react'

import type { User } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

interface IAuthStateOptions {
  // eslint-disable-next-line no-unused-vars
  onUserChanged?: (user: User | null) => Promise<void>
}

const useAuthState = (options?: IAuthStateOptions) => {
  const { currentUser } = firebaseAuth

  const [data, setData] = useState<User | null>(currentUser)
  const [error, setError] = useState<FirebaseError>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const listener = onAuthStateChanged(firebaseAuth, async (user) => {
      setIsLoading(true)
      if (options?.onUserChanged) {
        try {
          await options.onUserChanged(user)
        } catch (err) {
          if (err instanceof FirebaseError) {
            setError(err)
          } else {
            // eslint-disable-next-line no-console
            console.error(error)
          }
        }
      }
      setData(user)
      setIsLoading(false)
    })

    return () => {
      listener()
    }
  }, [firebaseAuth])

  return { user: data, error, isLoading }
}

export default useAuthState
