"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MapComponentProps {
  profiles: any[]
  selectedProfile: any | null
  onProfileSelect: (profile: any) => void
}

export default function MapComponent({ profiles, selectedProfile, onProfileSelect }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [activeMarker, setActiveMarker] = useState<any | null>(null)

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // In a real implementation, this would be where you initialize the map
  useEffect(() => {
    if (!isMapLoaded || !mapRef.current) return

    // Initialize map here with your preferred library
    // For example with Mapbox GL:
    // const map = new mapboxgl.Map({
    //   container: mapRef.current,
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   center: [-74.5, 40],
    //   zoom: 9
    // })

    // Add markers for each profile
    // profiles.forEach(profile => {
    //   const marker = new mapboxgl.Marker()
    //     .setLngLat([profile.location.longitude, profile.location.latitude])
    //     .addTo(map)
    // })

    // Clean up function
    return () => {
      // map.remove()
    }
  }, [isMapLoaded, profiles])

  // Update map when selected profile changes
  useEffect(() => {
    if (!isMapLoaded || !selectedProfile) return

    // Center map on selected profile
    // map.flyTo({
    //   center: [selectedProfile.location.longitude, selectedProfile.location.latitude],
    //   zoom: 14
    // })

    setActiveMarker(selectedProfile)
  }, [isMapLoaded, selectedProfile])

  // Handle marker click
  const handleMarkerClick = (profile: any) => {
    setActiveMarker(profile)
  }

  // Handle popup close
  const handlePopupClose = () => {
    setActiveMarker(null)
  }

  // Handle view profile button click
  const handleViewProfile = () => {
    if (activeMarker) {
      onProfileSelect(activeMarker)
    }
  }

  if (!isMapLoaded) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
        <span className="ml-2">Loading map...</span>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full">
      {/* This div would be the map container */}
      <div ref={mapRef} className="h-full w-full bg-slate-100">
        {/* For demonstration purposes, we'll show a placeholder map with markers */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p>Interactive Map Would Render Here</p>
            <p className="text-sm">With {profiles.length} profile markers</p>
          </div>
        </div>

        {/* Simulated markers */}
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className={`absolute h-6 w-6 cursor-pointer rounded-full ${
              selectedProfile?.id === profile.id ? "bg-teal-500" : "bg-blue-500"
            }`}
            style={{
              left: `${30 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            onClick={() => handleMarkerClick(profile)}
          />
        ))}

        {/* Simulated popup */}
        {activeMarker && (
          <Card className="absolute left-1/2 top-1/2 w-64 -translate-x-1/2 -translate-y-1/2 transform">
            <CardContent className="p-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{activeMarker.name}</h3>
                  <Button variant="ghost" size="sm" onClick={handlePopupClose}>
                    ×
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {activeMarker.location.city}, {activeMarker.location.country}
                </p>
                <Button size="sm" onClick={handleViewProfile}>
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

