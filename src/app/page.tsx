import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to Our Blog Platform
        </h1>
        <div className="space-x-4">
          <Link
            href="/blog"
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            View Blog
          </Link>
          <Link
            href="/login"
            className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded bg-purple-500 px-4 py-2 font-bold text-white hover:bg-purple-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
