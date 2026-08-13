'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

// developed with the aid of docs/agent-chats/2026-08-12-cop.txt and docs/agent-chats/2026-08-12-cc.txt
export default function SignInPage() {
  const router = useRouter()
  const { user, loading, signInWithEmail, signInWithGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (!loading && user) {
      router.replace('/team')
    }
  }, [loading, user, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verification') === 'sent') {
      toast.success('Verification email sent. Verify your email, then sign in.')
    }
  }, [])

  if (loading) return <FullPageSpinner />

  const onSubmit = async (data: LoginInput) => {
    try {
      await signInWithEmail(data.email, data.password)
      toast.success('Signed in successfully')
      router.replace('/team')
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-not-verified')) {
        toast.error('Please verify your email before signing in.')
      } else {
        toast.error('Invalid email or password')
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.replace('/team')
    } catch {
      toast.error('Google sign-in failed. Please try again.')
    }
  }

  return (
    <div className="flex justify-center py-12">
      <div className="relative w-full max-w-md rounded-2xl border-2 border-dashed border-zinc-300 bg-white p-8 dark:border-zinc-700 dark:bg-zinc-900">
        {/* Avatar badge */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 transform">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-200 shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-12 w-12 text-zinc-600"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              {/* outer circle */}
              <circle cx="12" cy="12" r="11" strokeWidth="1" />
              {/* head (larger, filled) */}
              <circle cx="12" cy="9.5" r="3.6" fill="none" />
              {/* shoulders/body */}
              <path
                d="M4.5 19c1.6-3 4.9-5 7.5-5s5.9 2 7.5 5"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-1 text-center">
            <h1 className="mx-auto w-full rounded-full bg-zinc-200 px-6 py-2 text-lg font-semibold text-zinc-900">
              Log into your account
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Welcome back! Please sign in to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="pl-5 text-sm font-bold text-zinc-900 dark:text-zinc-50"
              >
                Email address
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 transform text-zinc-500 dark:text-zinc-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8.5l9 6 9-6"
                    />
                    <path
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 6H3v12h18V6z"
                    />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="text-md w-full rounded-full border-2 border-zinc-300 bg-white px-4 py-2 pl-12 placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-500 focus:outline-none aria-invalid:border-red-500 dark:border-zinc-700 dark:bg-zinc-900"
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="-mb-1 pl-5 text-sm font-bold text-zinc-900 dark:text-zinc-50"
                >
                  Password
                </label>
              </div>

              <div className="relative">
                <span
                  className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 transform text-zinc-500 dark:text-zinc-400"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="mt-1 h-8 w-5"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    {/* taller lock body */}
                    <rect
                      x="5"
                      y="7"
                      width="14"
                      height="12"
                      rx="2"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* shackle (adjusted) */}
                    <path
                      d="M8 7V5a4 4 0 018 0v2"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* keyhole: larger circle + stem (filled) */}
                    <circle cx="12" cy="13.6" r="1.2" fill="currentColor" />
                    <rect x="11.1" y="15" width="1.8" height="2" rx="0.5" fill="currentColor" />
                  </svg>
                </span>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  className="text-md w-full rounded-full border-2 border-zinc-300 bg-white px-4 py-2 pr-12 pl-14 placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-500 focus:outline-none aria-invalid:border-red-500 dark:border-zinc-700 dark:bg-zinc-900"
                  placeholder="Enter your Password"
                  {...register('password')}
                />
              </div>

              {errors.password && (
                <p id="password-error" className="text-xs text-red-500" role="alert">
                  {errors.password.message}
                </p>
              )}

              <div className="text-right">
                <Link
                  href="/auth/forgot"
                  className="text-[13px] font-bold text-zinc-700 underline hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-200"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="text-md w-full rounded-full bg-zinc-200 px-4 py-3 font-semibold text-black transition-colors hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Signing in…' : 'Sign in'}
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
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/signup"
              className="text-sm font-bold text-zinc-700 underline hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-200"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
