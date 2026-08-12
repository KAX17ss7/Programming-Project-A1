import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Image from 'next/image'
import { requireAuth } from '@/actions/auth.actions'

export const metadata: Metadata = {
  title: 'Team',
}

interface TeamMember {
  name: string
  role: string
  studentNumber: string
  skills: string
  background: string
  course: string
}

/**
 * Portrait photos live in `frontend/public/images/team/`, one file per
 * member, named as the kebab-case of their full name (e.g. "Casper Shilo"
 * -> `casper-shilo.jpg`).
 */
function photoSrc(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `/images/team/${slug}.jpg`
}

function renderWithBold(text: string): ReactNode {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))
}

const projectDescription =
  "This project is about automating the initial connection between Motorola's body camera " +
  'to and interact with their controlling app. This is achieved through the Android Debug ' +
  'Bridge (ADB), which is where our team will build scripts that establish a reliable ' +
  'connection with the camera hardware and then handle key tasks within the PSCore app, ' +
  'like signing in, starting a recording, and signing out, without needing manual input. ' +
  "We're developing and testing this using WatchGuard's AD6 and SVX camera families, " +
  'working through it in 3 focused sprints that cover initial pairing, core automation, ' +
  'and documentation.'

const teamMembers: TeamMember[] = [
  {
    name: 'Casper Shilo',
    role: 'Project Manager',
    studentNumber: 's4008936',
    skills:
      'The majority of my skills are related to network engineering and automation. ' +
      'I regularly use Ansible Automation Platform to automate complex and repetitive ' +
      "tasks. I've recently be experimenting with using AAP to automatically create " +
      'containerlab topologies and deploy different overlay networks using technologies ' +
      'such as MPLS VPWS, MPLS VPLS, EVPN VXLAN, etc.',
    background:
      'I got my first interest with technology doing SIGINT and using SDR to listen in ' +
      "on all things other than music. More recently I've focused on large scale ISP " +
      'networking technologies and am studying for my CCNP (ENARSI). In my spare time, ' +
      'I enjoy experimenting with media broadcast technologies in my homelab.',
    course: 'Bachelor of Computer & Network Engineering / Bachelor of Computer Science (4th year)',
  },
  {
    name: 'Jesse Lang',
    role: 'Developer',
    studentNumber: 's4002576',
    skills:
      '**Logistics Automation:** I use end-of-day operational data to digitise ' +
      'paper-based processes, improve visibility into operational inefficiencies, and ' +
      'generate actionable insights for operational teams and senior management.\n' +
      '**Web Development:** I ideate, develop, and deploy full-stack applications using ' +
      'ReactTS, Java Spring Boot, and PostgreSQL.\n' +
      '**System Integration:** I connect platforms, services, and data sources into ' +
      'reliable workflows with built-in validation, automation, and auditability.',
    background:
      'My skills have largely developed through solving real operational ' +
      'inefficiencies. Non-digitised documents provide little visibility beyond the ' +
      'people handling them, often leading to delays, confusion, and missed follow-up ' +
      'actions. Through reviewing end-of-day reports and transferring information ' +
      'between disconnected systems, I began building tools to streamline and automate ' +
      'these processes. I’ve since applied the same practical, problem-focused approach ' +
      'to developing full-stack applications that address real operational needs.',
    course: 'Bachelor of Computer & Network Engineering / Bachelor of Computer Science (4th year)',
  },
  {
    name: 'Daniel Granville',
    role: 'Developer',
    studentNumber: 's4008936',
    skills:
      'My skills revolve around my knowledge of coding and networking gained throughout ' +
      'university. I am able to code in a variety of languages such as assembly, C++, ' +
      'javascript, etc. Ive also got practical experience in using some of these skills ' +
      'as part of projects to create bigger solutions to tasks.',
    background:
      'I first got interested in technology when I was young through research parts to ' +
      'build a pc with my dad. This lead into doing some out of school tech activities ' +
      'such as a coding bootcamp and learning to code a website through an activity ' +
      'book. While in university my interest has expanded to networking and ' +
      'microcontrollers as I gained experience with them through classes.',
    course: 'Bachelor of Computer & Network Engineering / Bachelor of Computer Science (4th year)',
  },
  {
    name: 'Asbi Babu',
    role: 'UX Designer',
    studentNumber: 'S4075945',
    skills: '',
    background: '',
    course: 'Bachelor of Information Technology (3rd year)',
  },
  {
    name: 'Bevin Chathely',
    role: 'Business Analyst',
    studentNumber: 'S4092723',
    skills:
      'My skills centres on Cybersecurity, IT Ticketing, and Troubleshooting/Analysis ' +
      'which are all skills that I continue to build on today through my degree and ' +
      "through work. I've applied security principles and developed troubleshooting " +
      'skills through my experience as Service Desk and Security Analyst, whilst ' +
      'continuing to learn and gain more skills within the tech industry.',
    background:
      'I first got into technology back in year 7 when I got my first computer and ' +
      'immediately got into videogames and problem-solving based problems. Although I ' +
      'never got into and was never a fan of coding, the idea of being able to work on ' +
      'computers, fix digital equipment that break, and teaching others how to securely ' +
      'use their devices have all stood out to me. This ultimately lead me down the ' +
      'path of Cybersecurity which I am now studying  and applying through work.',
    course: 'Bachelor of Information Technology (3rd year)',
  },
]

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-3">
        <Image
          src={photoSrc(member.name)}
          alt={member.name}
          width={128}
          height={128}
          className="h-32 w-32 shrink-0 rounded-full bg-zinc-200 object-cover dark:bg-zinc-800"
        />
        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-50">{member.name}
            
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{member.role}
            <span className="text-xs text-zinc-400 dark:text-zinc-500">
               · {member.studentNumber}
            </span>
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{member.course}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
            Skills
          </p>
          <p className="mt-1 text-sm whitespace-pre-line text-zinc-600 dark:text-zinc-300">
            {renderWithBold(member.skills)}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
            Background
          </p>
          <p className="mt-1 text-sm whitespace-pre-line text-zinc-600 dark:text-zinc-300">
            {member.background}
          </p>
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
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Our Team
        </h1>
        <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-zinc-50">
          73 - Automated Testing Framework for Body Worn Camera Integration with PSCore - Team A
        </p>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <p className="font-semibold text-zinc-900 dark:text-zinc-50">About the project:</p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{projectDescription}</p>
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
