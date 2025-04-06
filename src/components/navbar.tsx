import {Button} from "@/components/ui/button"
import {Github, Menu, X} from "lucide-react"
import {useCallback, useState} from "react";
import {useNavigate} from "react-router";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate();

    const tableOfContents = [
        {
            title: "Solutions",
            href: "/solutions",
        },
        {
            title: "Industries",
            href: "/industries",
        },
        {
            title: "About Us",
            href: "/about",
        }
    ]

    const handleLogin = useCallback(() => {
        navigate('/login')
        setIsMenuOpen(false)
    }, [navigate])
    const handleSignUp = useCallback(() => {
        navigate('/signup')
        setIsMenuOpen(false)
    }, [navigate])

    return (
        <>
            <header
                className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            >
                <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
                    <a href="/" className="mr-16 flex items-center">
                        <span className="font-bold">Corn Ton</span>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex md:flex-1 items-center space-x-6 text-sm font-medium">
                        {tableOfContents.map((content, index) => (
                            <a href={content.href} key={index} className="transition-colors hover:text-primary">
                                {content.title}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a href="" target="_blank" rel="noreferrer">
                            <Button variant="ghost" size="icon">
                                <Github className="h-4 w-4"/>
                                <span className="sr-only">GitHub</span>
                            </Button>
                        </a>
                        <Button variant="ghost" size="sm" onClick={handleLogin}>
                            Login
                        </Button>
                        <Button size="sm" onClick={handleSignUp}>Sign Up</Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
                    </button>
                </div>
            </header>
            {/* Mobile Menu */}
            <div
                className={`md:hidden sticky top-14 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none h-0"
                }`}
            >
                <div
                    className="container py-6 space-y-6"
                >
                    <nav className="flex flex-col space-y-4">
                        {tableOfContents.map((content, index) => (
                            <a
                                key={index}
                                href={content.href}
                                className="transition-colors hover:text-primary py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {content.title}
                            </a>
                        ))}
                    </nav>
                    <div className="flex flex-col space-y-2 pt-4 border-t">
                        <a
                            href=""
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center space-x-2 py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Github className="h-4 w-4"/>
                            <span>GitHub</span>
                        </a>
                        <Button variant={'outline'} className="w-full" onClick={handleLogin}>
                            Login
                        </Button>
                        <Button className="w-full" onClick={handleSignUp}>
                            Sign Up
                        </Button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div style={{
                    marginBottom: '-51.25%',
                }}></div>
            )}
        </>
    )
}

