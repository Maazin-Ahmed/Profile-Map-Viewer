"use client"

import { X, Mail, Phone, Globe, MapPin, Briefcase, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface ProfileDetailsPanelProps {
  profile: any
  onClose: () => void
}

export default function ProfileDetailsPanel({ profile, onClose }: ProfileDetailsPanelProps) {
  return (
    <Sheet open={true} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader className="mb-4 flex flex-row items-center justify-between">
          <SheetTitle>Profile Details</SheetTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>

        <div className="space-y-6">
          {/* Profile header */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>
                  {profile.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            <h2 className="mt-4 text-xl font-bold">{profile.name}</h2>
            <p className="text-sm text-muted-foreground">{profile.title}</p>
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-3 w-3" />
              <span>
                {profile.location.city}, {profile.location.country}
              </span>
            </div>
          </div>

          <Separator />

          {/* Contact information */}
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase text-muted-foreground">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${profile.email}`} className="text-sm hover:underline">
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${profile.phone}`} className="text-sm hover:underline">
                  {profile.phone}
                </a>
              </div>
              {profile.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                  >
                    {profile.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Bio */}
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase text-muted-foreground">About</h3>
            <p className="text-sm">{profile.description}</p>
          </div>

          <Separator />

          {/* Skills */}
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase text-muted-foreground">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill: string) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Experience */}
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase text-muted-foreground">Experience</h3>
            <div className="space-y-4">
              {profile.experience.map((exp: any) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <h4 className="font-medium">{exp.role}</h4>
                  </div>
                  <p className="text-sm">{exp.company}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {exp.startDate} - {exp.endDate || "Present"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Interests */}
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase text-muted-foreground">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest: string) => (
                <Badge key={interest} variant="outline">
                  <Tag className="mr-1 h-3 w-3" />
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          {/* Map preview */}
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase text-muted-foreground">Location</h3>
            <div className="h-40 rounded-md bg-slate-100 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Map preview would appear here</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

