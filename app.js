"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BoxIcon, GitBranchIcon, CodepenIcon, DatabaseIcon, BeanIcon, DribbbleIcon, Redo2Icon, WindIcon, TypeIcon, MailIcon, LinkedinIcon, ZapIcon, GitGraphIcon, ArrowRightIcon } from 'lucide-react'

export default function TechFlowDiagram() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="relative bg-gray-950 p-8 rounded-xl">
        {/* Left Section - List Building & Enrichment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-emerald-900/20 p-6 rounded-lg border border-emerald-500/20">
              <h3 className="text-xl font-semibold text-emerald-400 mb-4">List Building & Enrichment</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: DribbbleIcon, name: "React" },
                  { icon: TypeIcon, name: "TypeScript" },
                  { icon: CodepenIcon, name: "JavaScript" },
                  { icon: BeanIcon, name: "Node.js" },
                  { icon: DatabaseIcon, name: "MongoDB" },
                  { icon: GitBranchIcon, name: "Git" }
                ].map((tech, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-3 bg-emerald-950/50 rounded-lg">
                    <tech.icon className="w-8 h-8 text-emerald-400 mb-2" />
                    <span className="text-xs text-emerald-300">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Logo */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-orange-500/20 rounded-full blur-xl"></div>
              <div className="relative bg-white p-6 rounded-full">
                <h2 className="text-2xl font-bold text-gray-900">RepliQ</h2>
              </div>
            </div>
          </div>

          {/* Right Section - Outbound Sending Software */}
          <div className="md:col-start-2">
            <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-500/20">
              <h3 className="text-xl font-semibold text-orange-400 mb-4">Outbound Sending Software</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: WindIcon, name: "Tailwind" },
                  { icon: BoxIcon, name: "shadcn/ui" },
                  { icon: GitGraphIcon, name: "GraphQL" },
                  { icon: Redo2Icon, name: "Redux" },
                  { icon: MailIcon, name: "Email" },
                  { icon: LinkedinIcon, name: "LinkedIn" }
                ].map((tech, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-3 bg-orange-950/50 rounded-lg">
                    <tech.icon className="w-8 h-8 text-orange-400 mb-2" />
                    <span className="text-xs text-orange-300">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Connection Lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 flex items-center justify-center pointer-events-none">
          <div className="flex gap-2">
            <ArrowRightIcon className="w-6 h-6 text-emerald-400" />
            <ArrowRightIcon className="w-6 h-6 text-orange-400" />
          </div>
        </div>

        {/* AI Personalization Box */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-indigo-900/20 px-4 py-2 rounded-lg border border-indigo-500/20">
            <h4 className="text-sm font-medium text-indigo-400">AI Personalization At Scale</h4>
            <p className="text-xs text-indigo-300">Videos, Sales Pages, Images & Email Writer</p>
          </div>
        </div>
      </div>
    </div>
  )
}


<div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <TechFlowDiagram />
    </div>



// work flow'

import { Check } from 'lucide-react'
import { Card } from "@/components/ui/card"

interface WorkExperienceProps {
  company: string
  location: string
  startDate: string
  endDate?: string
  isCurrent?: boolean
  role: string
  description?: string
}

interface TimelineItemProps {
  experience: WorkExperienceProps
}

function TimelineItem({ experience }: TimelineItemProps) {
  const { company, location, startDate, endDate, isCurrent, role, description } = experience
  
  return (
    <div className="relative flex gap-4 pb-12 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-[15px] top-[30px] h-full w-[2px] bg-gray-200 last:hidden" />
      
      {/* Status indicator */}
      <div className="relative z-10">
        {isCurrent ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
            <Check className="h-5 w-5 text-green-600" />
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
            <div className="h-3 w-3 rounded-full bg-gray-300" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <Card className="p-4">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg">{company}</h3>
              <p className="text-sm text-gray-600">{location}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">
                {startDate}
                {endDate ? ` - ${endDate}` : ' - Present'}
              </p>
              {isCurrent && (
                <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                  Current
                </span>
              )}
            </div>
          </div>
          <div className="mt-2">
            <p className="font-medium">{role}</p>
            {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
          </div>
        </Card>
      </div>
    </div>
  )
}

export function WorkTimeline() {
  const experiences: WorkExperienceProps[] = [
    {
      company: "Pinelabs",
      location: "Noida",
      startDate: "Jan 2024",
      role: "Software Engineer",
      isCurrent: true,
      description: "Working on frontend development using React and Next.js"
    },
    {
      company: "Chetu India",
      location: "Noida",
      startDate: "Jan 2022",
      endDate: "Dec 2023",
      role: "Software Engineer",
      description: "Worked on various client projects using React and related technologies"
    }
  ]

  return (
    <div className="max-w-2xl p-6">
      <h2 className="mb-8 text-2xl font-bold">Work Experience</h2>
      <div className="space-y-0">
        {experiences.map((exp, index) => (
          <TimelineItem key={index} experience={exp} />
        ))}
      </div>
    </div>
  )
}


