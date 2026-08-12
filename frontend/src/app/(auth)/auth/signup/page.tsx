'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { signupSchema, type SignupInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

export default function SignUpPage() {
  const router = useRouter()
  const { user, loading, signUpWithEmail, signInWithGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  })

  useEffect(() => {
    if (!loading && !isSubmitting && user) {
      router.replace('/dashboard')
    }
  }, [loading, isSubmitting, user, router])

  if (loading) return <FullPageSpinner />

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.replace('/dashboard')
    } catch {
      toast.error('Google sign-in failed. Please try again.')
    }
  }

  const onSubmit = async (data: SignupInput) => {
    try {
      await signUpWithEmail(data.email, data.password, data.displayName)
      router.push('/auth/signin?verification=sent')
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-already-in-use')) {
        toast.error('An account with this email already exists')
      } else {
        toast.error('Failed to create account. Please try again.')
      }
    }
  }

  return (
    <div className="flex justify-center py-12">
      <div className="relative w-full max-w-md rounded-2xl border-2 border-dashed border-zinc-300 bg-white p-8 dark:bg-zinc-900 dark:border-zinc-700">
        {/* Avatar badge */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="h-16 w-16 rounded-full bg-zinc-200 flex items-center justify-center shadow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-12 w-12 text-zinc-600" fill="none" stroke="currentColor" aria-hidden="true">
              <circle cx="12" cy="12" r="11" strokeWidth="1" />
              <circle cx="12" cy="9.5" r="3.6" fill="none" />
              <path d="M4.5 19c1.6-3 4.9-5 7.5-5s5.9 2 7.5 5" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-1 text-center">
            <h1 className="mx-auto w-full rounded-full text-zinc-900 bg-zinc-200 px-6 py-2 text-lg font-semibold">Create your account</h1>
            <p className="text-sm text-zinc-500">Fill in the details below to create new account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="displayName" className="text-sm font-bold pl-5">Full name</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                  </svg>
                </span>
                <input
                  id="displayName"
                  type="text"
                  autoComplete="name"
                  aria-invalid={!!errors.displayName}
                  aria-describedby={errors.displayName ? 'display-name-error' : undefined}
                  className="w-full rounded-full border-2 border-zinc-300 bg-white px-4 py-2 pl-12 text-md placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-500 focus:outline-none aria-invalid:border-red-500 dark:border-zinc-700 dark:bg-zinc-900"
                  placeholder="Enter your full name"
                  {...register('displayName')}
                />
              </div>
              {errors.displayName && (
                <p id="display-name-error" className="text-xs text-red-500" role="alert">
                  {errors.displayName.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-bold pl-5">Email address</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 8.5l9 6 9-6" />
                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 6H3v12h18V6z" />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="w-full rounded-full border-2 border-zinc-300 bg-white px-4 py-2 pl-12 text-md placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-500 focus:outline-none aria-invalid:border-red-500 dark:border-zinc-700 dark:bg-zinc-900"
                  placeholder="Enter your Email"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-xs text-red-500" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-bold pl-5">Password</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-5 mt-1" fill="none" stroke="currentColor" aria-hidden="true">
                    <rect x="5" y="7" width="14" height="12" rx="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 7V5a4 4 0 018 0v2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="13.6" r="1.2" fill="currentColor" />
                    <rect x="11.1" y="15" width="1.8" height="2" rx="0.5" fill="currentColor" />
                  </svg>
                </span>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  className="w-full rounded-full border-2 border-zinc-300 bg-white px-4 py-2 pl-14 text-md placeholder:text-zinc-400 pr-12 focus:ring-2 focus:ring-zinc-500 focus:outline-none aria-invalid:border-red-500 dark:border-zinc-700 dark:bg-zinc-900"
                  placeholder="Enter your password"
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p id="password-error" className="text-xs text-red-500" role="alert">
                  {errors.password.message}
                </p>
              )}
              <p className="text-xs text-zinc-500 pl-5">Minimum 6 characters and at least 1 number</p>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="text-sm font-bold pl-5">Confirm password</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-5 mt-1" fill="none" stroke="currentColor" aria-hidden="true">
                    <rect x="5" y="7" width="14" height="12" rx="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 7V5a4 4 0 018 0v2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="13.6" r="1.2" fill="currentColor" />
                    <rect x="11.1" y="15" width="1.8" height="2" rx="0.5" fill="currentColor" />
                  </svg>
                </span>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                  className="w-full rounded-full border-2 border-zinc-300 bg-white px-4 py-2 pl-14 text-md placeholder:text-zinc-400 pr-12 focus:ring-2 focus:ring-zinc-500 focus:outline-none aria-invalid:border-red-500 dark:border-zinc-700 dark:bg-zinc-900"
                  placeholder="Confirm your password"
                  {...register('confirmPassword')}
                />
              </div>
              {errors.confirmPassword && (
                <p id="confirm-password-error" className="text-xs text-red-500" role="alert">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-zinc-200 px-4 py-3 text-md font-semibold text-black transition-colors hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200 dark:border-zinc-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-zinc-400 dark:bg-zinc-900">or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <div className="flex justify-center">
            <Link href="/auth/signin" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-700 hover:text-zinc-900 underline dark:text-zinc-300 dark:hover:text-zinc-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" aria-hidden="true">
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
