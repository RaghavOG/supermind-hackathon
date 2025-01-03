/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import * as React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Paperclip, 
  Send, 
  FileIcon, 
  ImageIcon, 
  X, 
  Loader2, 
  RotateCcw,
  Bot,
  User
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  files?: File[]
}

export default function Chat() {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [input, setInput] = React.useState('')
  const [files, setFiles] = React.useState<File[]>([])
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)
  const [isTyping, setIsTyping] = React.useState(false)
  
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const chatContainerRef = React.useRef<HTMLDivElement>(null)

  // Memoized message loading
  const loadMessages = React.useCallback(() => {
    try {
      const storedMessages = localStorage.getItem('chatMessages')
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages))
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }, [])

  // Load messages on mount
  React.useEffect(() => {
    loadMessages()
  }, [loadMessages])

  // Save messages with debounce
  React.useEffect(() => {
    const saveTimeout = setTimeout(() => {
      try {
        localStorage.setItem('chatMessages', JSON.stringify(messages))
      } catch (error) {
        console.error('Error saving messages:', error)
      }
    }, 500)
    return () => clearTimeout(saveTimeout)
  }, [messages])

  // Auto scroll to bottom when new messages arrive
  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  // Simulated typing effect
  const simulateTyping = React.useCallback(async (text: string) => {
    setIsTyping(true)
    let displayText = ''
    const newAssistantMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: '',
      timestamp: Date.now()
    }
    
    setMessages(prev => [...prev, newAssistantMessage])
    
    for (let i = 0; i < text.length; i++) {
      displayText += text[i]
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newAssistantMessage.id 
            ? { ...msg, content: displayText }
            : msg
        )
      )
      await new Promise(resolve => setTimeout(resolve, 30))
    }
    setIsTyping(false)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() && files.length === 0) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
      files: files.length > 0 ? files : undefined
    }

    setMessages(prev => [...prev, newUserMessage])
    setInput('')
    setFiles([])
    setIsAnalyzing(true)

    // Simulate response generation
    await new Promise(resolve => setTimeout(resolve, 1000))

    const response = `I've analyzed your message${files.length ? ' and attachments' : ''}. ${
      generateResponse(input)
    }`

    setIsAnalyzing(false)
    simulateTyping(response)
  }

  const generateResponse = (userInput: string): string => {
    const responses = [
      "That's an interesting point! Could you tell me more?",
      "I understand what you're saying. Here's what I think...",
      "Based on your input, I'd suggest...",
      "Let me analyze that for you...",
      "I'm processing your request. Here's what I found..."
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      // Limit total file size to 10MB
      const totalSize = newFiles.reduce((sum, file) => sum + file.size, 0)
      if (totalSize > 10 * 1024 * 1024) {
        alert('Total file size exceeds 10MB limit')
        return
      }
      setFiles(prevFiles => [...prevFiles, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      setMessages([])
      localStorage.removeItem('chatMessages')
    }
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="w-full h-[calc(100vh-5rem)] bg-indigo-500"> {/* Adjust 4rem based on your navbar height */}
      <div className="max-w-3xl mx-auto h-full flex flex-col bg-background">
        {/* Fixed Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b bg-card">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <h2 className="text-base font-medium">Chat Assistant</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={clearChat}
            className="h-8 w-8"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Scrollable Chat Area */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Bot className="h-12 w-12 text-muted-foreground mb-4" />
              <h1 className="text-xl font-medium mb-2">How can I help you today?</h1>
              <p className="text-sm text-muted-foreground">Ask me anything...</p>
            </div>
          ) : (
            messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {message.role === 'user' ? (
                      <User className="h-4 w-4 text-primary" />
                    ) : (
                      <Bot className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div 
                    className={`rounded-lg px-3 py-2 ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs font-medium">
                        {message.role === 'user' ? 'You' : 'Assistant'}
                      </span>
                      <span className="text-xs opacity-50">
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm mt-1 whitespace-pre-wrap break-words">{message.content}</p>
                    
                    {message.files && message.files.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.files.map((file, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs">
                            {file.type.startsWith('image/') ? (
                              <ImageIcon className="h-3 w-3" />
                            ) : (
                              <FileIcon className="h-3 w-3" />
                            )}
                            <span className="truncate">{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          {(isAnalyzing || isTyping) && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">{isAnalyzing ? 'Analyzing...' : 'Typing...'}</span>
            </div>
          )}
        </div>

        {/* Fixed Input Area */}
        <div className="p-4 border-t bg-card">
          {files.length > 0 && (
            <div className="mb-4 p-2 border rounded-lg bg-muted/50">
              <div className="text-xs font-medium mb-1">
                Attachments ({files.length}):
              </div>
              {files.map((file, i) => (
                <div key={i} className="flex items-center justify-between gap-2 text-sm">
                  <span className="truncate text-xs">{file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => removeFile(i)}
                  >
                    <X className="h-3 w-3" />
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
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              disabled={isAnalyzing || isTyping}
              className="flex-shrink-0"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 text-sm"
              disabled={isAnalyzing || isTyping}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <Button 
              type="submit" 
              size="icon"
              disabled={isAnalyzing || isTyping || (!input.trim() && files.length === 0)}
              className="flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}