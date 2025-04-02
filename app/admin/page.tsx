"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  PlusCircle,
  Search,
  Trash2,
  Edit,
  Eye,
  ArrowLeft,
  Loader2,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ProfileForm from "@/components/profile-form"
import { useProfiles } from "@/hooks/use-profiles"

export default function AdminDashboard() {
  const router = useRouter()
  const { profiles, isLoading, error } = useProfiles()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("profiles")
  const [isAddingProfile, setIsAddingProfile] = useState(false)
  const [editingProfile, setEditingProfile] = useState<any>(null)

  // Filter profiles based on search query
  const filteredProfiles =
    profiles?.filter(
      (profile) =>
        profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.location.city.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || []

  const handleAddProfile = () => {
    setEditingProfile(null)
    setIsAddingProfile(true)
    setActiveTab("add-edit")
  }

  const handleEditProfile = (profile: any) => {
    setEditingProfile(profile)
    setIsAddingProfile(false)
    setActiveTab("add-edit")
  }

  const handleDeleteProfile = (profileId: string) => {
    // In a real app, this would call an API to delete the profile
    console.log("Deleting profile:", profileId)
  }

  const handleViewProfile = (profileId: string) => {
    // In a real app, this would navigate to the profile view
    console.log("Viewing profile:", profileId)
  }

  const handleFormCancel = () => {
    setActiveTab("profiles")
    setIsAddingProfile(false)
    setEditingProfile(null)
  }

  const handleFormSubmit = (formData: any) => {
    // In a real app, this would call an API to save the profile
    console.log("Form submitted:", formData)
    setActiveTab("profiles")
    setIsAddingProfile(false)
    setEditingProfile(null)
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
        <span className="ml-2 text-lg">Loading profiles...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-500">Failed to load profiles</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-background md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="px-4 py-2">
            <h2 className="mb-2 text-xs font-semibold text-muted-foreground">Dashboard</h2>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Overview
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("profiles")}>
                <Users className="mr-2 h-4 w-4" />
                Profiles
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </nav>
        <div className="mt-auto border-t p-4">
          <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/")}>
            <LogOut className="mr-2 h-4 w-4" />
            Back to App
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <Button variant="ghost" size="icon" className="md:hidden">
            <LayoutDashboard className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to app</span>
          </Button>
        </header>

        <main className="p-4 sm:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="mb-6 flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="profiles">Profiles</TabsTrigger>
                <TabsTrigger value="add-edit" disabled={!isAddingProfile && !editingProfile}>
                  {isAddingProfile ? "Add Profile" : editingProfile ? "Edit Profile" : "Add/Edit"}
                </TabsTrigger>
              </TabsList>
              {activeTab === "profiles" && (
                <Button onClick={handleAddProfile}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Profile
                </Button>
              )}
            </div>

            <TabsContent value="profiles" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Profile Management</CardTitle>
                  <CardDescription>Manage user profiles and their locations on the map</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search profiles..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Profile</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Skills</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProfiles.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                              No profiles found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredProfiles.map((profile) => (
                            <TableRow key={profile.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-9 w-9">
                                    <AvatarImage src={profile.avatar} alt={profile.name} />
                                    <AvatarFallback>
                                      {profile.name
                                        .split(" ")
                                        .map((n: string) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{profile.name}</div>
                                    <div className="text-sm text-muted-foreground">{profile.title}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                                  <span>
                                    {profile.location.city}, {profile.location.country}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {profile.skills.slice(0, 2).map((skill: string) => (
                                    <Badge key={skill} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                  {profile.skills.length > 2 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{profile.skills.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon" onClick={() => handleViewProfile(profile.id)}>
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">View</span>
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => handleEditProfile(profile)}>
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => handleDeleteProfile(profile.id)}>
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="add-edit">
              <Card>
                <CardHeader>
                  <CardTitle>{isAddingProfile ? "Add New Profile" : "Edit Profile"}</CardTitle>
                  <CardDescription>
                    {isAddingProfile
                      ? "Create a new user profile with location information"
                      : "Update existing profile information"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileForm profile={editingProfile} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

