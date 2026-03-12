import React from 'react'

function About() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-6">
          About Gallery App
        </h1>

        {/* Intro */}
        <p className="text-gray-600 text-center mb-10">
          Gallery App is a modern photo management application where users
          can upload, view and manage their personal images securely.
          This project was built to practice full-stack MERN development
          and modern UI design.
        </p>

        {/* Features */}
        <h2 className="text-2xl font-semibold mb-4">Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg">Upload Images</h3>
            <p className="text-gray-500 text-sm">
              Users can upload photos to their personal gallery.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg">Gallery Grid</h3>
            <p className="text-gray-500 text-sm">
              Images are displayed in a clean Pinterest-style layout.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg">Delete Photos</h3>
            <p className="text-gray-500 text-sm">
              Easily remove unwanted images from your gallery.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg">Secure Login</h3>
            <p className="text-gray-500 text-sm">
              Authentication system using JWT tokens.
            </p>
          </div>

        </div>

        {/* Technologies */}
        <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>

        <div className="flex flex-wrap gap-3 mb-10">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded">
            React
          </span>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded">
            Node.js
          </span>
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded">
            Express
          </span>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded">
            MongoDB
          </span>
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded">
            JWT Auth
          </span>
          <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded">
            Tailwind CSS
          </span>
        </div>

        {/* Developer */}
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Developer</h2>

          <p className="text-gray-600">
            This project was built by <span className="font-semibold">Mudassar</span>
            as part of learning the MERN stack and building real-world
            full-stack applications.
          </p>
        </div>

      </div>

    </div>
  )
}

export default About