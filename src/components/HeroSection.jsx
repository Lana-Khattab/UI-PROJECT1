function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{backgroundImage: 'url("https://images.unsplash.com/photo-1636647511414-c9ec06da32bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwY29va2luZyUyMGtpdGNoZW58ZW58MXx8fHwxNzYyMDM3OTY5fDA&ixlib=rb-4.1.0&q=80&w=1080")'}}
      />
      
      <div className="absolute inset-0 bg-black/40" />
    
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl text-white font-bold">
            Discover, share, and savor the world
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Join our community of food lovers and explore thousands of delicious recipes from around the globe. Share your culinary creations and connect with fellow foodies.
          </p>
          
          <div className="pt-4">
            <button className="bg-gray-900 text-white px-6 py-3 rounded-md text-lg hover:bg-gray-800 transition-colors">
              Join us!
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
