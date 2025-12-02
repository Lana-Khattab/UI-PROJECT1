import { Link } from 'react-router-dom'

function Login() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="text-3xl font-extrabold text-gray-900 tracking-wide">FOODIES</Link>
        </div>

        <h1 className="text-center text-xl font-semibold text-gray-900">Welcome Back</h1>
        <p className="mt-1 text-center text-gray-600">Sign in to access your Foodies account</p>

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
          <span className="px-3 text-sm text-gray-400">Or sign in with email</span>
          <div className="h-px w-full bg-gray-200" />
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email address</label>
            <input 
              id="email" 
              type="email" 
              placeholder="you@example.com"
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none" 
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <input 
              id="password" 
              type="password" 
              placeholder="Enter your password"
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none" 
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="inline-flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
              <span>Remember me</span>
            </div>
            <span className="cursor-pointer hover:text-orange-500">Forgot password?</span>
          </div>

          <button 
            type="submit" 
            className="mt-2 w-full rounded-md bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-orange-500 hover:text-orange-600">Sign up for free</Link>
        </p>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">← Back to Home</Link>
        </div>
      </div>
    </main>
  )
}

export default Login
