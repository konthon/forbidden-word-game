import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as _signOut,
  updateProfile,
  signInAnonymously as _signInAnonymously,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth'

import type { AuthProvider, User } from 'firebase/auth'

import { firebaseAuth } from 'libs/Firebase'

interface EmailParams {
  email: string
  password: string
}

export const signInWithEmail = ({ email, password }: EmailParams) =>
  signInWithEmailAndPassword(firebaseAuth, email, password)
export const signInAnonymously = () => _signInAnonymously(firebaseAuth)

export const signUpWithEmail = ({ email, password }: EmailParams) =>
  createUserWithEmailAndPassword(firebaseAuth, email, password)

export const signOut = () => _signOut(firebaseAuth)

export const signInWithProvider = (provider: AuthProvider) =>
  signInWithPopup(firebaseAuth, provider)
export const signInRedirectProvider = (provider: AuthProvider) =>
  signInWithRedirect(firebaseAuth, provider)
export const getRedirectProviderResult = () => getRedirectResult(firebaseAuth)

export const sendResetPasswordToEmail = (email: string) =>
  sendPasswordResetEmail(firebaseAuth, email)

export const updateUserProfile = (data: {
  displayName?: string | null | undefined
  photoURL?: string | null | undefined
}) => updateProfile(firebaseAuth.currentUser as User, data)
