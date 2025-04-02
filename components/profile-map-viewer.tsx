"use client"

import { useState, useEffect } from "react"
import { Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileList from "@/components/profile-list"
import MapComponent from "@/components/map-component"
import ProfileDetailsPanel from "@/components/profile-details-panel"
import { useProfiles } from "@/hooks/use-profiles"

export default function ProfileMapViewer() {
  const { profiles, isLoading, error } = useProfiles()
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [selectedProfile, setSelectedProfile] = useState<any>(null)
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("profiles")
  const [showProfileDetails, setShowProfileDetails] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  // Filter profiles based on search query and location filter
  useEffect(() => {
    if (!profiles) return

    let filtered = [...profiles]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (profile) => profile.name.toLowerCase().includes(query) || profile.location.city.toLowerCase().includes(query),
      )
    }

    // Apply location filter
    if (locationFilter !== "all") {
      filtered = filtered.filter((profile) => profile.location.country === locationFilter)
    }

    setFilteredProfiles(filtered)
  }, [searchQuery, locationFilter, profiles])

  // Handle profile selection
  const handleProfileSelect = (profile: any) => {
    setSelectedProfile(profile)
    setShowProfileDetails(true)
  }

  // Handle view on map
  const handleViewOnMap = (profile: any) => {
    setSelectedProfile(profile)
    setActiveTab("map")
  }

  // Close profile details
  const handleCloseDetails = () => {
    setShowProfileDetails(false)
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
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold">Profile Map Viewer</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <a href="/admin">Admin Dashboard</a>
            </Button>
          </div>
        </div>
      </header>

      <div className="container flex flex-1 flex-col gap-6 py-6 md:flex-row">
        <div className="w-full md:w-1/2 lg:w-[45%]">
          <div className="mb-6 flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or location"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="USA">United States</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profiles">Profiles</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>
            <TabsContent value="profiles" className="mt-4">
              <ProfileList profiles={filteredProfiles} onSelect={handleProfileSelect} onViewMap={handleViewOnMap} />
            </TabsContent>
            <TabsContent value="map" className="mt-4 md:hidden">
              <div className="h-[400px] rounded-lg border">
                <MapComponent
                  profiles={filteredProfiles}
                  selectedProfile={selectedProfile}
                  onProfileSelect={handleProfileSelect}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="hidden h-[calc(100vh-8rem)] w-1/2 rounded-lg border md:block lg:w-[55%]">
          <MapComponent
            profiles={filteredProfiles}
            selectedProfile={selectedProfile}
            onProfileSelect={handleProfileSelect}
          />
        </div>
      </div>

      {showProfileDetails && selectedProfile && (
        <ProfileDetailsPanel profile={selectedProfile} onClose={handleCloseDetails} />
      )}
    </div>
  )
}

