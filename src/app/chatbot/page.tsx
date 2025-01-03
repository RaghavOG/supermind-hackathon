'use client'

import * as React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Paperclip, Send, FileIcon, ImageIcon, X, Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"

export default function Chat() {
  const [messages, setMessages] = React.useState<Array<{
    role: 'user' | 'assistant'
    content: string
    files?: File[]
  }>>([])
  const [input, setInput] = React.useState('')
  const [files, setFiles] = React.useState<File[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()

  // Scroll to bottom when messages change
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() && files.length === 0) return

    // Add user message
    setMessages(prev => [...prev, {
      role: 'user',
      content: input,
      files: files.length > 0 ? files : undefined
    }])

    // Simulate assistant response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm a demo chatbot. I can see that you sent a message" + (files.length > 0 ? " and some files!" : "!")
      }])
    }, 1000)

    setInput('')
    setFiles([])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4 dark:bg-gray-900">
      <Button 
        onClick={toggleTheme} 
        variant="outline" 
        size="icon" 
        className="self-end mb-4"
      >
        {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        <span className="sr-only">Toggle theme</span>
      </Button>
      <Card className="flex-1 flex flex-col dark:bg-gray-800">
        <ScrollArea 
          ref={scrollAreaRef} 
          className="flex-1 p-4"
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h1 className="text-2xl font-bold mb-2 dark:text-white">What can I help you ship?</h1>
              <p className="text-muted-foreground dark:text-gray-400">Ask a question to get started...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, i) => (
                <div 
                  key={i} 
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`rounded-lg p-4 max-w-[80%] ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground dark:bg-blue-600' 
                        : 'bg-muted dark:bg-gray-700 dark:text-white'
                    }`}
                  >
                    {message.content}
                    
                    {message.files && message.files.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.files.map((file, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            {file.type.startsWith('image/') ? (
                              <ImageIcon className="h-4 w-4" />
                            ) : (
                              <FileIcon className="h-4 w-4" />
                            )}
                            <span>{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        <CardContent className="p-4 border-t dark:border-gray-700">
          {files.length > 0 && (
            <div className="mb-4 p-2 border rounded-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="text-xs font-medium mb-1 dark:text-gray-300">Selected files:</div>
              {files.map((file, i) => (
                <div key={i} className="flex items-center justify-between gap-2 text-sm">
                  <span className="truncate dark:text-gray-300">{file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => removeFile(i)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              <Paperclip className="h-4 w-4" />
              <span className="sr-only">Attach files</span>
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask v0 a question..."
              className="flex-1 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
            <Button type="submit" className="dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
