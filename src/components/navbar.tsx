import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <a href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Corn Ton</span>
        </a>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <a href="/solutions" className="transition-colors hover:text-primary">
            Solutions
          </a>
          <a href="/industries" className="transition-colors hover:text-primary">
            Industries
          </a>
          <a href="/about" className="transition-colors hover:text-primary">
            About Us
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <a href="" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </a>
          <Button variant="ghost" size="sm">
            Contact
          </Button>
          <Button size="sm">Get a Demo</Button>
        </div>
      </div>
    </header>
  )
}

