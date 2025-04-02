"use client"
import { MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface ProfileListProps {
  profiles: any[]
  onSelect: (profile: any) => void
  onViewMap: (profile: any) => void
}

export default function ProfileList({ profiles, onSelect, onViewMap }: ProfileListProps) {
  return (
    <div className="space-y-4">
      {profiles.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
          <p className="text-center text-muted-foreground">No profiles found</p>
        </div>
      ) : (
        profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} onSelect={onSelect} onViewMap={onViewMap} />
        ))
      )}
    </div>
  )
}

function ProfileCard({
  profile,
  onSelect,
  onViewMap,
}: { profile: any; onSelect: (profile: any) => void; onViewMap: (profile: any) => void }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>
              {profile.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold">{profile.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-3 w-3" />
                  <span>
                    {profile.location.city}, {profile.location.country}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {profile.skills.slice(0, 2).map((skill: string) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{profile.description}</p>
            <div className="mt-3 flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewMap(profile)}
                className="flex items-center gap-1"
              >
                <MapPin className="h-4 w-4 animate-pulse" />
                Show on Map
              </Button>
              <Button size="sm" onClick={() => onSelect(profile)}>
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

