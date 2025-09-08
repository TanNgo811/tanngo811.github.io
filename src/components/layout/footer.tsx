import Link from 'next/link'
import { PenTool, Github, Twitter, Linkedin } from 'lucide-react'
import { Button } from '@/features/ui/components/button'
import { Separator } from '@/features/ui/components/separator'

const footerLinks = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Documentation', href: '/docs' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
  resources: [
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' },
    { name: 'Status', href: '/status' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'GitHub', href: '#', icon: Github },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
]

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <PenTool className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">BlogPlatform</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              A modern blogging platform built with Next.js, designed for writers who want to focus on creating amazing content.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((item) => (
                <Button key={item.name} variant="ghost" size="icon" asChild>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    <item.icon className="h-4 w-4" />
                    <span className="sr-only">{item.name}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BlogPlatform. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ using Next.js and Supabase
          </p>
        </div>
      </div>
    </footer>
  )
}
