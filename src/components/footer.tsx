import {Github, Twitter} from "lucide-react"

export default function Footer() {
    return (
        <footer className="border-t">
            <div className="container flex flex-col gap-8 py-8 md:flex-row md:py-12">
                <div className="flex-1 space-y-4">
                    <h2 className="font-bold">Ton Corn</h2>
                    <p className="text-sm text-muted-foreground">Pioneering software solutions for the digital age.</p>
                </div>
                <div className="grid flex-1 grid-cols-2 gap-12 sm:grid-cols-3">
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium">Solutions</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="/ai-analytics"
                                   className="text-muted-foreground transition-colors hover:text-primary">
                                    AI Analytics
                                </a>
                            </li>
                            <li>
                                <a href="/cloud-services"
                                   className="text-muted-foreground transition-colors hover:text-primary">
                                    Cloud Services
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium">Company</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="/about" className="text-muted-foreground transition-colors hover:text-primary">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/careers"
                                   className="text-muted-foreground transition-colors hover:text-primary">
                                    Careers
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium">Connect</h3>
                        <div className="flex space-x-4">
                            <a
                                href=""
                                className="text-muted-foreground transition-colors hover:text-primary"
                            >
                                <Github className="h-5 w-5"/>
                                <span className="sr-only">GitHub</span>
                            </a>
                            <a
                                href=""
                                className="text-muted-foreground transition-colors hover:text-primary"
                            >
                                <Twitter className="h-5 w-5"/>
                                <span className="sr-only">Twitter</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container border-t py-6">
                <p className="text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Corn Ton, Inc. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

