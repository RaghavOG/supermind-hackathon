
'use client'
import * as React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Send,
  FileIcon,
  ImageIcon,
  RotateCcw,
  Bot,
  User,
  Search,
  Smile,
  ChevronDown,
  Sparkles,
  Copy
} from 'lucide-react'
import EmojiPickerComponent from './EmojiPickerComponent'
import toast from 'react-hot-toast'
import { formatMessage } from '@/utils/formatMessage'


interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  files?: File[]
}

interface AIPrompt {
  text: string
  action: string
}



const ChatComponent = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('')
  const [files, setFiles] = React.useState<File[]>([])
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)
  const [isTyping, setIsTyping] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [showScrollButton, setShowScrollButton] = React.useState(false)
  const [typingText, setTypingText] = React.useState('')

  const chatContainerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  const aiPrompts: AIPrompt[] = [
    { text: "Reels vs Stories", action: "Compare the performance of Reels vs Stories" },
    { text: "Engagement trends", action: "Show me engagement trends" },
    { text: "Top performing content", action: "What's my top performing content?" },
    { text: "Growth analysis", action: "Analyze my account growth" }
  ]

  const handleScroll = React.useCallback(() => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100)
    }
  }, [])

  const scrollToBottom = React.useCallback(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }, [])

  React.useEffect(() => {
    const chatContainer = chatContainerRef.current
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll)
      return () => chatContainer.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  React.useEffect(() => {
    if (!showScrollButton) {
      scrollToBottom()
    }
  }, [messages, showScrollButton, scrollToBottom])

  React.useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const simulateTyping = async (text: string) => {
    setIsTyping(true)
    let currentText = ''

    for (let i = 0; i < text.length; i++) {
      currentText += text[i]
      setTypingText(currentText)
      scrollToBottom();
      // Random delay between 20-50ms for more natural typing
      await new Promise(resolve => setTimeout(resolve, Math.random() * 30 + 20))
    }

    setIsTyping(false)
    setTypingText('')
    return currentText
  }

  const filteredMessages = React.useMemo(() => {
    if (!searchQuery) return messages
    const query = searchQuery.toLowerCase()
    return messages.filter(message =>
      message.content.toLowerCase().includes(query)
    )
  }, [messages, searchQuery])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() && files.length === 0) return

    // Create and add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
      files: files.length > 0 ? files : undefined
    }

    setMessages(prev => [...prev, newMessage])
    setInput('')
    setFiles([])
    setIsAnalyzing(true)

    try {
      // Add and show the analyzing message for a consistent duration
      const analyzingText = "Thinking... 🤔 , This might take a while"
      await simulateTyping(analyzingText)
      const analyzingMessage: Message = {
        id: `analyzing-${Date.now()}`,
        role: 'assistant',
        content: analyzingText,
        timestamp: Date.now()
      }

      setMessages(prev => [...prev, analyzingMessage])
      scrollToBottom()

      // Simulate API call delay and keep "Analyzing" message visible
      try {
        const response = await fetch('/api/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response');
        }

        const data = await response.json();

        // console.log(data)

        // Remove analyzing message before showing the response
        setMessages(prev => prev.filter(msg => msg.id !== analyzingMessage.id))

        // Show the response with typing effect
        const typedResponse = await simulateTyping(data.response)

        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: typedResponse,
          timestamp: Date.now()
        }

        setMessages(prev => [...prev, responseMessage])

      } catch (error) {
        console.error('Error:', error)

        // Remove analyzing message before showing error
        setMessages(prev => prev.filter(msg => msg.id !== analyzingMessage.id))

        let errorText = 'Sorry, I encountered an error. Please try again.'

      if (error.message === 'API rate limit exceeded. Please try again later.') {
        errorText = 'API rate limit exceeded. Please try again later.'
      }


        const typedError = await simulateTyping(errorText)

        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: typedError,
          timestamp: Date.now()
        }

        setMessages(prev => [...prev, errorMessage])
      }

    } finally {
      setIsAnalyzing(false)
      setIsTyping(false)
      setTypingText('')
    }
  }



  const clearChat = () => {
    if (window.confirm('Clear chat history?')) {
      setMessages([])
      localStorage.removeItem('chatMessages')
    }
  }

  const handleEmojiSelect = (emojiData: { unified: string; names: string[] }) => {
    const emoji = String.fromCodePoint(...emojiData.unified.split('-').map(u => parseInt(u, 16)));
    setInput(prev => prev + emoji);
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard')
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast.error('Failed to copy to clipboard')
    });
  }

  return (
    <main className="w-full h-screen pt-20 bg-gradient-to-r from-black via-slate-950 to-black">
    <div className="max-w-3xl mx-auto h-[35rem] flex flex-col bg- border border-gray-800 p-3 rounded-md my-5">
      <header className="flex justify-between items-center px-4 py-2 border-b border-gray-800 bg-black">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-400" />
          <h2 className="text-sm md:text-lg font-medium text-gray-200">Chat Assistant</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="pl-8 h-8 w-[200px] text-sm bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={clearChat}
            className="h-8 w-8 text-gray-400 hover:text-gray-200 hover:bg-gray-800"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 relative scroll-smooth bg-black"
      >
        {filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <Bot className="h-12 w-12 text-gray-600 mb-4" />
            <h1 className="text-xl font-medium mb-2 text-gray-200">How can I help you today?</h1>
            <p className="text-sm text-gray-400">Ask me anything...</p>

            <div className="mt-6 grid sm:grid-cols-2 gap-2 w-full max-w-md">
              {aiPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-sm justify-start bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
                  onClick={() => setInput(prompt.action)}
                >
                  <Sparkles className="h-3 w-3 mr-2 text-blue-400" />
                  <span className=''>
                    {prompt.text}
                    </span>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                    {message.role === 'user' ? (
                      <User className="h-4 w-4 text-blue-400" />
                    ) : (
                      <Bot className="h-4 w-4 text-blue-400" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg px-3 py-2 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-medium">
                        {message.role === 'user' ? 'You' : 'Assistant'}
                      </span>
                      <span className="text-xs opacity-50">
                        {formatTime(message.timestamp)}
                      </span>
                      {message.role === 'assistant' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(message.content)}
                          className="ml-2 text-gray-400 hover:text-gray-200"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="text-sm whitespace-pre-wrap break-words break-all">
                      {formatMessage(message.content)}
                    </div>

                    {(message.files?.length ?? 0) > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.files?.map((file, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                            {file.type.startsWith('image/') ? (
                              <ImageIcon className="h-3 w-3" />
                            ) : (
                              <FileIcon className="h-3 w-3" />
                            )}
                            <span className="truncate max-w-[150px]">{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="flex gap-2 max-w-[85%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="rounded-lg px-3 py-2 bg-gray-800 text-gray-200">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-medium">Assistant</span>
                      <span className="text-xs opacity-50">{formatTime(Date.now())}</span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {formatMessage(typingText)}
                      <span className="animate-pulse">▋</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {showScrollButton && (
          <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-50">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-lg bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
              onClick={scrollToBottom}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <footer className="p-4 border-t border-gray-800 bg-gray-950">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 text-sm bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400"
              disabled={isAnalyzing || isTyping}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="flex-shrink-0 bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 border-none bg-gray-800">
                <EmojiPickerComponent onEmojiClick={handleEmojiSelect} />
              </PopoverContent>
            </Popover>
          </div>

          <Button
            type="submit"
            size="icon"
            disabled={isAnalyzing || isTyping || (!input.trim() && files.length === 0)}
            className="flex-shrink-0 bg-blue-600 text-white hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </footer>
    </div>
  
  </main>
  )
}

export default ChatComponent
