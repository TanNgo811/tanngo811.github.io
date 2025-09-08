'use client'

interface DeleteButtonProps {
  postId: string
}

export default function DeleteButton({ postId }: DeleteButtonProps) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      await fetch(`/api/posts/${postId}`, { method: 'DELETE' })
      window.location.reload()
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-900"
    >
      Delete
    </button>
  )
}
