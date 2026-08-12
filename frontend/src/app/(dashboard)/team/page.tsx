import type { Metadata } from 'next'
import { requireAuth } from '@/actions/auth.actions'

export const metadata: Metadata = {
  title: 'Team',
}

interface TeamMember {
  name: string
  skills: string
  background: string
}

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function renderWithBold(text: string): React.ReactNode {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

const teamMembers: TeamMember[] = [
  {
    name: 'Casper Shilo',
    skills: "",
    background: "",
  },
  {
    name: 'Jesse Lang',
    skills: "",
    background: "",
  },
  {
    name: 'Daniel Granville',
    skills: "",
    background: "",
  },
  {
    name: 'Asbi Babu',
    skills: "",
    background: "",
  },
  {
    name: 'Bevin Chathely',
    skills: "",
    background: "",
  },
]

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {initials(member.name)}
        </div>
        <p className="font-semibold">{member.name}</p>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Skills</p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
            {renderWithBold(member.skills)}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Background</p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-line">{member.background}</p>
        </div>
      </div>
    </div>
  )
}

export default async function TeamPage() {
  await requireAuth()

  const topRow = teamMembers.slice(0, 2)
  const bottomRow = teamMembers.slice(2)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Our Team</h1>
        <p className="mt-1 text-lg font-bold">
          73 - Automated Testing Framework for Body Worn Camera Integration with PSCore - Team A
        </p>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <p className="font-semibold">About the project:</p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          description
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {topRow.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {bottomRow.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </div>
  )
}
