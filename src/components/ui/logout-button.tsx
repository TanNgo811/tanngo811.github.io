'use client'

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/'
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
    >
      Logout
    </button>
  )
}
