"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, Upload, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"

// Define the form validation schema
const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  description: z.string().min(20, "Description must be at least 20 characters"),
  location: z.object({
    city: z.string().min(2, "City is required"),
    country: z.string().min(2, "Country is required"),
    latitude: z.number().or(z.string().transform(Number)),
    longitude: z.number().or(z.string().transform(Number)),
  }),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  interests: z.array(z.string()),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface ProfileFormProps {
  profile?: any
  onSubmit: (data: ProfileFormValues) => void
  onCancel: () => void
}

export default function ProfileForm({ profile, onSubmit, onCancel }: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const [newInterest, setNewInterest] = useState("")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile?.avatar || null)

  // Initialize form with existing profile data or defaults
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: profile
      ? {
          ...profile,
          website: profile.website || "",
        }
      : {
          name: "",
          title: "",
          email: "",
          phone: "",
          website: "",
          description: "",
          location: {
            city: "",
            country: "",
            latitude: 0,
            longitude: 0,
          },
          skills: [],
          interests: [],
        },
  })

  // Handle form submission
  const handleFormSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true)

    try {
      // In a real app, you would upload the avatar file here
      // and get back a URL to include in the form data

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Call the parent's onSubmit function with the form data
      onSubmit({
        ...data,
        avatar: avatarPreview || "/placeholder.svg?height=128&width=128",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle avatar file selection
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setAvatarFile(file)

    // Create a preview URL
    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  // Remove avatar
  const handleRemoveAvatar = () => {
    setAvatarFile(null)
    setAvatarPreview(null)
  }

  // Add a new skill
  const handleAddSkill = () => {
    if (!newSkill.trim()) return

    const currentSkills = form.getValues("skills") || []
    if (!currentSkills.includes(newSkill)) {
      form.setValue("skills", [...currentSkills, newSkill])
    }

    setNewSkill("")
  }

  // Remove a skill
  const handleRemoveSkill = (skill: string) => {
    const currentSkills = form.getValues("skills") || []
    form.setValue(
      "skills",
      currentSkills.filter((s) => s !== skill),
    )
  }

  // Add a new interest
  const handleAddInterest = () => {
    if (!newInterest.trim()) return

    const currentInterests = form.getValues("interests") || []
    if (!currentInterests.includes(newInterest)) {
      form.setValue("interests", [...currentInterests, newInterest])
    }

    setNewInterest("")
  }

  // Remove an interest
  const handleRemoveInterest = (interest: string) => {
    const currentInterests = form.getValues("interests") || []
    form.setValue(
      "interests",
      currentInterests.filter((i) => i !== interest),
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Avatar upload */}
        <div className="mb-6">
          <FormLabel>Profile Picture</FormLabel>
          <div className="mt-2 flex items-center gap-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border">
              {avatarPreview ? (
                <>
                  <img
                    src={avatarPreview || "/placeholder.svg"}
                    alt="Avatar preview"
                    className="h-full w-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-0 top-0 h-6 w-6 rounded-full"
                    onClick={handleRemoveAvatar}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Input type="file" accept="image/*" onChange={handleAvatarChange} className="w-full max-w-xs" />
              <p className="text-xs text-muted-foreground">Upload a profile picture (max 5MB, JPG or PNG)</p>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Write a brief description about yourself" className="min-h-[120px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location */}
        <div>
          <h3 className="mb-4 text-sm font-medium">Location</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="location.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USA">United States</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Japan">Japan</SelectItem>
                        <SelectItem value="India">India</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location.latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.000001"
                      placeholder="e.g. 40.7128"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location.longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.000001"
                      placeholder="e.g. -74.0060"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Skills */}
        <div>
          <FormLabel>Skills</FormLabel>
          <FormDescription>Add skills that showcase your expertise</FormDescription>

          <div className="mt-2 flex flex-wrap gap-2">
            {form.watch("skills")?.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="ml-1 h-4 w-4 rounded-full"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  <X className="h-2 w-2" />
                </Button>
              </Badge>
            ))}
          </div>

          <div className="mt-2 flex gap-2">
            <Input
              placeholder="Add a skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddSkill()
                }
              }}
            />
            <Button type="button" onClick={handleAddSkill}>
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
          {form.formState.errors.skills && (
            <p className="mt-1 text-sm text-destructive">{form.formState.errors.skills.message}</p>
          )}
        </div>

        {/* Interests */}
        <div>
          <FormLabel>Interests (Optional)</FormLabel>
          <FormDescription>Add personal or professional interests</FormDescription>

          <div className="mt-2 flex flex-wrap gap-2">
            {form.watch("interests")?.map((interest) => (
              <Badge key={interest} variant="outline">
                {interest}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="ml-1 h-4 w-4 rounded-full"
                  onClick={() => handleRemoveInterest(interest)}
                >
                  <X className="h-2 w-2" />
                </Button>
              </Badge>
            ))}
          </div>

          <div className="mt-2 flex gap-2">
            <Input
              placeholder="Add an interest"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddInterest()
                }
              }}
            />
            <Button type="button" onClick={handleAddInterest}>
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>Save Profile</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

