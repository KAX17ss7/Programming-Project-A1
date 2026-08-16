'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Info, Send } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { resetPassword } from '@/lib/firebase/auth'
import { resetPasswordSchema, type ResetPasswordInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

// developed with the aid of docs/agent-chats/2026-08-12-cop.txt and docs/agent-chats/2026-08-12-cc.txt
export default function ForgotPasswordPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  })

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard')
    }
  }, [loading, user, router])

  if (loading) return <FullPageSpinner />

  const onSubmit = async (data: ResetPasswordInput) => {
    try {
      await resetPassword(data.email)
    } catch {
      // Avoid leaking whether an account exists for this email.
    } finally {
      setSent(true)
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
              <rect x="5" y="10" width="14" height="10" rx="2" strokeWidth="1" />
              <path
                d="M8 10V7a4 4 0 018 0v3"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="15" r="1.4" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-1 text-center">
            <h1 className="mx-auto w-full rounded-full bg-zinc-200 px-6 py-2 text-lg font-semibold text-zinc-900">
              Forgot password?
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Enter your email address to reset your password.
            </p>
          </div>

          {sent ? (
            <div className="space-y-3">
              <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                Check your inbox for a link to reset your password.
              </p>

              <div className="flex items-center gap-3 rounded-full bg-zinc-100 px-3 py-2 text-sm dark:bg-zinc-800">
                <Info
                  className="h-5 w-5 shrink-0 text-zinc-600 dark:text-zinc-400"
                  aria-hidden="true"
                />
                <span className="text-zinc-600 dark:text-zinc-300">
                  A password reset link was sent to your email.
                </span>
              </div>
            </div>
          ) : (
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="text-md flex w-full items-center justify-center gap-2 rounded-full bg-zinc-200 px-4 py-3 font-semibold text-black transition-colors hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-6 w-6" aria-hidden="true" />
                {isSubmitting ? 'Sending…' : 'Send reset email'}
              </button>

              <div className="flex items-center gap-3 rounded-full bg-zinc-100 px-3 py-1 text-xs dark:bg-zinc-800">
                <Info
                  className="h-6 w-6 shrink-0 text-zinc-600 dark:text-zinc-400"
                  aria-hidden="true"
                />
                <span className="text-zinc-600 dark:text-zinc-300">
                  A password reset link will be sent to your email.
                </span>
              </div>
            </form>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200 dark:border-zinc-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-zinc-400 dark:bg-zinc-900">or</span>
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              href="/auth/signin"
              className="inline-flex items-center gap-2 text-sm font-bold text-zinc-700 underline hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
