"use client"

import { useState, useEffect } from "react"

interface Location {
  city: string
  country: string
  latitude: number
  longitude: number
}

interface Profile {
  id: string
  name: string
  title: string
  email: string
  phone: string
  website?: string
  description: string
  location: Location
  skills: string[]
  interests: string[]
  avatar: string
  experience: any[]
}

export const useProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(true)
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mock profile data
        const mockProfiles: Profile[] = [
          {
            id: "1",
            name: "John Doe",
            title: "Software Engineer",
            email: "john.doe@example.com",
            phone: "+15551234567",
            website: "https://johndoe.com",
            description: "Experienced software engineer specializing in web development and cloud technologies.",
            location: {
              city: "New York",
              country: "USA",
              latitude: 40.7128,
              longitude: -74.006,
            },
            skills: ["JavaScript", "React", "Node.js", "AWS"],
            interests: ["Hiking", "Photography", "Gaming"],
            avatar: "/placeholder.svg?height=128&width=128",
            experience: [
              {
                id: "e1",
                role: "Senior Software Engineer",
                company: "Acme Corp",
                startDate: "2020-01-01",
                endDate: null,
              },
              {
                id: "e2",
                role: "Software Engineer",
                company: "Beta Inc",
                startDate: "2018-06-01",
                endDate: "2019-12-31",
              },
            ],
          },
          {
            id: "2",
            name: "Jane Smith",
            title: "Data Scientist",
            email: "jane.smith@example.com",
            phone: "+442079460823",
            website: "https://janesmith.co.uk",
            description: "Data scientist with a passion for machine learning and data visualization.",
            location: {
              city: "London",
              country: "UK",
              latitude: 51.5074,
              longitude: 0.1278,
            },
            skills: ["Python", "Machine Learning", "Data Visualization", "Statistics"],
            interests: ["Reading", "Travel", "Cooking"],
            avatar: "/placeholder.svg?height=128&width=128",
            experience: [
              {
                id: "e3",
                role: "Data Scientist",
                company: "Gamma Ltd",
                startDate: "2021-03-01",
                endDate: null,
              },
              {
                id: "e4",
                role: "Data Analyst",
                company: "Delta Corp",
                startDate: "2019-09-01",
                endDate: "2021-02-28",
              },
            ],
          },
          {
            id: "3",
            name: "Alice Johnson",
            title: "UX Designer",
            email: "alice.johnson@example.com",
            phone: "+14169671111",
            website: "https://alicejohnson.ca",
            description: "UX designer focused on creating intuitive and user-friendly interfaces.",
            location: {
              city: "Toronto",
              country: "Canada",
              latitude: 43.6532,
              longitude: -79.3832,
            },
            skills: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
            interests: ["Art", "Music", "Design"],
            avatar: "/placeholder.svg?height=128&width=128",
            experience: [
              {
                id: "e5",
                role: "UX Designer",
                company: "Epsilon Inc",
                startDate: "2022-01-01",
                endDate: null,
              },
              {
                id: "e6",
                role: "UI Designer",
                company: "Zeta Corp",
                startDate: "2020-03-01",
                endDate: "2021-12-31",
              },
            ],
          },
          {
            id: "4",
            name: "Bob Williams",
            title: "Project Manager",
            email: "bob.williams@example.com",
            phone: "+61291918100",
            website: "https://bobwilliams.au",
            description: "Experienced project manager specializing in agile methodologies and team leadership.",
            location: {
              city: "Sydney",
              country: "Australia",
              latitude: -33.8688,
              longitude: 151.2093,
            },
            skills: ["Agile", "Scrum", "Project Planning", "Risk Management"],
            interests: ["Sports", "Outdoors", "Leadership"],
            avatar: "/placeholder.svg?height=128&width=128",
            experience: [
              {
                id: "e7",
                role: "Project Manager",
                company: "Theta Ltd",
                startDate: "2021-06-01",
                endDate: null,
              },
              {
                id: "e8",
                role: "Team Lead",
                company: "Kappa Corp",
                startDate: "2019-01-01",
                endDate: "2021-05-31",
              },
            ],
          },
          {
            id: "5",
            name: "Eva Müller",
            title: "Marketing Manager",
            email: "eva.mueller@example.com",
            phone: "+4930203460",
            website: "https://evamueller.de",
            description: "Marketing manager with a focus on digital marketing and brand strategy.",
            location: {
              city: "Berlin",
              country: "Germany",
              latitude: 52.52,
              longitude: 13.405,
            },
            skills: ["Digital Marketing", "Brand Strategy", "Social Media", "Content Creation"],
            interests: ["Fashion", "Travel", "Photography"],
            avatar: "/placeholder.svg?height=128&width=128",
            experience: [
              {
                id: "e9",
                role: "Marketing Manager",
                company: "Lambda GmbH",
                startDate: "2022-03-01",
                endDate: null,
              },
              {
                id: "e10",
                role: "Marketing Specialist",
                company: "Sigma AG",
                startDate: "2020-07-01",
                endDate: "2022-02-28",
              },
            ],
          },
          {
            id: "6",
            name: "Jean Dubois",
            title: "Chef",
            email: "jean.dubois@example.com",
            phone: "+33145488000",
            website: "https://jeandubois.fr",
            description: "Chef specializing in French cuisine with a passion for creating innovative dishes.",
            location: {
              city: "Paris",
              country: "France",
              latitude: 48.8566,
              longitude: 2.3522,
            },
            skills: ["French Cuisine", "Pastry", "Wine Pairing", "Restaurant Management"],
            interests: ["Cooking", "Food", "Travel"],
            avatar: "/placeholder.svg?height=128&width=128",
            experience: [
              {
                id: "e11",
                role: "Chef",
                company: "Omega S.A.",
                startDate: "2021-09-01",
                endDate: null,
              },
              {
                id: "e12",
                role: "Sous Chef",
                company: "Pi S.A.",
                startDate: "2019-04-01",
                endDate: "2021-08-31",
              },
            ],
          },
          {
            id: "7",
            name: "Sakura Tanaka",
            title: "Graphic Designer",
            email: "sakura.tanaka@example.com",
            phone: "+81332112211",
            website: "https://sakuratanaka.jp",
            description: "Graphic designer with a focus on branding and visual communication.",
            location: {
              city: "Tokyo",
              country: "Japan",
              latitude: 35.6895,
              longitude: 139.6917,
            },
            skills: ["Branding", "Logo Design", "Web Design", "Illustration"],
            interests: ["Art", "Design", "Photography"],
            avatar: "/placeholder.svg?height=128&width=128",
            experience: [
              {
                id: "e13",
                role: "Graphic Designer",
                company: "Rho K.K.",
                startDate: "2022-05-01",
                endDate: null,
              },
              {
                id: "e14",
                role: "Junior Designer",
                company: "Tau K.K.",
                startDate: "2020-10-01",
                endDate: "2022-04-30",
              },
            ],
          },
          {
            id: "8",
            name: "Priya Sharma",
            title: "Software Engineer",
            email: "priya.sharma@example.com",
            phone: "+919876543210",
            website: "https://priyasharma.in",
            description: "Software engineer specializing in mobile app development and cloud technologies.",
            location: {
              city: "Mumbai",
              country: "India",
              latitude: 19.076,
              longitude: 72.8777,
            },
            skills: ["Java", "Android", "Kotlin", "AWS"],
            interests: ["Coding", "Travel", "Music"],
            avatar: "/placeholder.svg?height=128&width=128",
            experience: [
              {
                id: "e15",
                role: "Software Engineer",
                company: "Upsilon Pvt. Ltd.",
                startDate: "2021-07-01",
                endDate: null,
              },
              {
                id: "e16",
                role: "Intern",
                company: "Chi Corp",
                startDate: "2020-01-01",
                endDate: "2020-06-30",
              },
            ],
          },
        ]

        setProfiles(mockProfiles)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch profiles"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfiles()
  }, [])

  return { profiles, isLoading, error }
}

