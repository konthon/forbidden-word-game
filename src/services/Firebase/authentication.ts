import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as _signOut,
  updateProfile,
} from 'firebase/auth'

import type { AuthProvider, User } from 'firebase/auth'

import { firebaseAuth } from 'libs/Firebase'

export const signInWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(firebaseAuth, email, password)

export const signUpWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(firebaseAuth, email, password)

export const signOut = () => _signOut(firebaseAuth)

export const signInWithProvider = (provider: AuthProvider) =>
  signInWithPopup(firebaseAuth, provider)

export const sendResetPasswordToEmail = (email: string) =>
  sendPasswordResetEmail(firebaseAuth, email)

export const updateUserProfile = (data: {
  displayName?: string | null | undefined
  photoURL?: string | null | undefined
}) => updateProfile(firebaseAuth.currentUser as User, data)
