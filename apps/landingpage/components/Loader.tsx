'use client'

export function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-400 border-t-transparent"></div>
      </div>
    </div>
  )
}
