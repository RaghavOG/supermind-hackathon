import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black py-6 mt-auto border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Powered by AI - Enhancing conversations, one message at a time.
            </p>
          </div>
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                Home
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/chat">
                Chat
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/charts">
                Data Charts
              </Link>
            </Button>
          </div>
          {/* <div className="flex space-x-4">
            <Button variant="outline" size="icon" asChild>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="https://your-website.com" target="_blank" rel="noopener noreferrer" aria-label="Website">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div> */}
        </div>
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} NeuralNitwits. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
