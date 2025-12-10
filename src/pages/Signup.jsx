import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    const result = await register(name, email, password)
    
    if (result.success) {
      navigate('/')
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="text-3xl font-extrabold text-gray-900 tracking-wide">FOODIES</Link>
        </div>

        <h1 className="text-center text-xl font-semibold text-gray-900">Join Foodies</h1>
        <p className="mt-1 text-center text-gray-600">Create an account to get started</p>

        <div className="mt-6 space-y-3">
          <div className="w-full inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-50">
            Continue with Google
          </div>
          <div className="w-full inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-50">
            Continue with Facebook
          </div>
        </div>

        <div className="my-8 flex items-center">
          <div className="h-px w-full bg-gray-200" />
          <span className="px-3 text-sm text-gray-400">Or sign up with email</span>
          <div className="h-px w-full bg-gray-200" />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullname" className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
            <input 
              id="fullname" 
              type="text" 
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none" 
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email Address</label>
            <input 
              id="email" 
              type="email" 
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none" 
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <input 
              id="password" 
              type="password" 
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none" 
            />
          </div>
          
          <div>
            <label htmlFor="confirm-password" className="mb-1 block text-sm font-medium text-gray-700">Confirm Password</label>
            <input 
              id="confirm-password" 
              type="password" 
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none" 
            />
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <input type="checkbox" required className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
            <span className="ml-2">I agree to the <span className="text-orange-500 cursor-pointer">Terms of Service</span> and <span className="text-orange-500 cursor-pointer">Privacy Policy</span></span>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 w-full rounded-md bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-500 hover:text-orange-600">Sign in</Link>
        </p>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">← Back to Home</Link>
        </div>
      </div>
    </main>
  )
}

export default Signup
