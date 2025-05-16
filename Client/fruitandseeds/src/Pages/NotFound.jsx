import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white px-4">
      <h1 className="text-9xl font-extrabold text-red-600 tracking-widest">404</h1>
      <p className="text-2xl mt-4 mb-6 text-gray-300">Page Not Found</p>
      <Link
        to="/"
        className="px-6 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 transition duration-300"
      >
        Go Home
      </Link>
    </div>
  )
}

export default NotFound
