import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-primary-600">Advantal Internship</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-primary-600">Home</Link>
              <Link to="/about" className="text-primary-600 font-medium">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary-600">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* About Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About This Project</h1>
          <p className="text-lg text-gray-600">A comprehensive MERN stack internship project</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4 text-primary-600">Frontend Technologies</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• React 18 with Hooks</li>
              <li>• Vite for fast development</li>
              <li>• Tailwind CSS v3 for styling</li>
              <li>• React Router for navigation</li>
              <li>• Axios for API calls</li>
              <li>• React Hook Form for forms</li>
            </ul>
          </div>

          <div className="card">
            <h2 className="text-2xl font-semibold mb-4 text-primary-600">Backend Technologies</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Node.js with Express</li>
              <li>• MongoDB with Mongoose</li>
              <li>• JWT for authentication</li>
              <li>• bcryptjs for password hashing</li>
              <li>• Express validation</li>
              <li>• CORS and security middleware</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 text-primary-600">Project Structure</h2>
          <p className="text-gray-700 mb-4">
            This project follows a clean and organized structure with separate client and server directories,
            making it easy to develop and maintain both frontend and backend components.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="text-sm text-gray-800">
{`my-mern-app/
├── client/               # React frontend
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── assets/       # Images, fonts, icons
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page-level components
│   │   ├── services/     # API calls
│   │   ├── context/      # React context
│   │   ├── hooks/        # Custom hooks
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/               # Express backend
│   ├── config/           # DB connection
│   ├── controllers/      # Request handlers
│   ├── models/           # Mongoose models
│   ├── routes/           # Express routes
│   ├── middlewares/      # Auth, error handlers
│   ├── utils/            # Helper functions
│   ├── server.js
│   └── package.json
└── package.json          # Root scripts`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About 