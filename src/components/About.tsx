/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink } from 'lucide-react'

interface GitHubUser {
  login: string
  name: string
  avatar_url: string
  bio: string
  html_url: string
}

export default function GitHubProfileCards() {
  const [users, setUsers] = useState<GitHubUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const usernames = ['abhishekkapoorx', 'RaghavOG', 'DesignDread', 'Anshul23782']

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userPromises = usernames.map(username =>
          fetch(`https://api.github.com/users/${username}`).then(res => res.json())
        )
        const fetchedUsers = await Promise.all(userPromises)
        setUsers(fetchedUsers)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch GitHub data')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (

      <div className="min-h-screen bg-black p-4 sm:p-8 md:p-12 lg:p-24 mt-48">
        <h1 className="text-5xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 lg:mb-6 font-akira text-center">
          Meet the Developers
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="w-full bg-gray-900 border-2 border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.5)]">
              <CardHeader className="space-y-4">
                <Skeleton className="h-12 w-12 rounded-full bg-black" />
                <Skeleton className="h-4 w-3/4 bg-gray-700" />
                <Skeleton className="h-4 w-1/2 bg-gray-700" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full bg-gray-700" />
                <Skeleton className="h-4 w-5/6 bg-gray-700" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500 p-6">{error}</div>
  }

  return (
    <div className=" bg-black p-4 sm:p-8 md:p-12 lg:p-24 min-h-screen mt-48 flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-6xl lg:text-8xl text-white font-akira text-center">Meet the Developers</h1>
      <h2 className='font-akira text-zinc-500 tracking-wide text-3xl mb-12'>The real OGs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 max-w-7xl w-full mt-12">
        {users.map((user) => (
          <Card key={user.login} className="w-full bg-black border shadow-[0_0_15px_rgba(147,51,234,0.5)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(147,51,234,0.8)]">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12 ring-2 ring-purple-500">
                  <AvatarImage src={user.avatar_url} alt={user.name} />
                  <AvatarFallback>{user.login?.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl text-zinc-200 font-sans font-bold">{user.name || 'N/A'}</CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-purple-400">
                    <span>@{user.login}</span>
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">{user.bio || 'No bio available'}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}