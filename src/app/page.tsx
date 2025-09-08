import Link from 'next/link'
import { Button } from '@/features/ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/features/ui/components/card'
import { Badge } from '@/features/ui/components/badge'
import { 
  PenTool, 
  Users, 
  Zap, 
  Shield, 
  ArrowRight, 
  Star,
  BookOpen,
  Heart
} from 'lucide-react'

const features = [
  {
    icon: PenTool,
    title: 'Rich Editor',
    description: 'Write with a powerful, intuitive editor that supports markdown and rich formatting.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Connect with writers and readers in a vibrant community of content creators.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built with Next.js and modern technologies for optimal performance.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Your content is safe with enterprise-grade security and reliable hosting.',
  },
]

const stats = [
  { label: 'Posts Published', value: '10K+' },
  { label: 'Active Writers', value: '500+' },
  { label: 'Monthly Readers', value: '50K+' },
  { label: 'Categories', value: '25+' },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto max-w-4xl">
          <Badge variant="secondary" className="mb-6">
            ✨ Modern Blogging Platform
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Write, Share, and 
            <span className="text-primary"> Inspire</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of writers who trust our platform to share their stories, 
            insights, and expertise with the world. Start your blogging journey today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                <PenTool className="h-5 w-5" />
                Start Writing
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" size="lg" className="gap-2">
                <BookOpen className="h-5 w-5" />
                Explore Stories
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to start blogging
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools and features you need to create, 
              manage, and grow your blog.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Heart className="h-8 w-8 text-primary" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to share your story?
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of passionate writers and start creating content 
            that matters. Your voice deserves to be heard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                <Star className="h-5 w-5" />
                Get Started Free
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            No credit card required • Free forever plan available
          </p>
        </div>
      </section>
    </div>
  )
}
