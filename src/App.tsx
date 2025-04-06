import './styles/index.css'
import {Navbar as NavigationBar} from './components/navbar'
import CTA from './components/cta'
import Features from "@/components/features.tsx";
import Footer from './components/footer'
import Hero from "@/components/hero.tsx";
import MouseMoveEffect from "@/components/mouse-move-effect.tsx";

function App() {
  return (
    <html lang="en" className="dark">
      <body className={`bg-background text-foreground antialiased transition-colors duration-200`}>
        <MouseMoveEffect />
        <div className="relative min-h-screen">
          {/* Background gradients */}
          <div className="pointer-events-none fixed inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
            <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
          </div>

          <div className="relative z-10">
            <NavigationBar />
            <Hero />
            <Features />
            <CTA />
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}

export default App
