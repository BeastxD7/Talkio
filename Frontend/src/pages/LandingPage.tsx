import { useNavigate } from "react-router-dom"
import { MessageCircle, Zap, Globe, ArrowRight, Sparkles, Timer } from "lucide-react"

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500" />
            <span className="text-xl cursor-pointer sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Talkio
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-blue-400 transition-colors duration-300">
              Features
            </a>
          </div>
          <button
            onClick={() => navigate("/chat")}
            className="flex items-center space-x-2 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 py-2 px-4 sm:px-6 rounded-full text-white text-sm sm:text-base font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 group"
          >
            <span>Quick Chat</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="min-h-screen relative overflow-hidden bg-black">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 animate-gradient-shift"></div>
          
          {/* Animated dots pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute w-2 h-2 bg-blue-500 rounded-full animate-float" style={{ top: '10%', left: '20%' }}></div>
            <div className="absolute w-2 h-2 bg-purple-500 rounded-full animate-float-delayed" style={{ top: '30%', left: '70%' }}></div>
            <div className="absolute w-2 h-2 bg-pink-500 rounded-full animate-float" style={{ top: '70%', left: '40%' }}></div>
            <div className="absolute w-2 h-2 bg-blue-500 rounded-full animate-float-delayed" style={{ top: '80%', left: '80%' }}></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 h-screen flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
            <div className="lg:w-1/2 space-y-6 sm:space-y-8 pt-16 lg:pt-0 text-center lg:text-left">
              <div className="flex bg-gray-500/60 py-2 px-4 rounded-full w-fit items-center space-x-2 mb-6 justify-center lg:justify-start">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-blue-200 animate-pulse" />
                <span className="text-blue-200 font-medium text-sm sm:text-base">Instant Chat Platform</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
                Quick Chats
                <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient">
                  Made Simple
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 max-w-lg mx-auto lg:mx-0">
                Jump into instant conversations without the hassle. No sign-ups, no downloads – just quick and easy chats.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => navigate("/chat")}
                  className="group relative cursor-pointer px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white text-base sm:text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 ">
                    Start Chatting Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <a
                  href="#features"
                  className="flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 rounded-full text-gray-300 text-base sm:text-lg font-semibold hover:bg-gray-800 transition-all duration-300 border border-gray-800 hover:border-gray-700"
                >
                  Learn More
                </a>
              </div>
              {/* <div className="flex items-center gap-8 pt-8 justify-center lg:justify-start">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                    100k+
                  </div>
                  <div className="text-gray-500 text-sm sm:text-base">Daily Chats</div>
                </div>
                <div className="w-px h-12 bg-gray-800"></div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                    10k+
                  </div>
                  <div className="text-gray-500 text-sm sm:text-base">Active Users</div>
                </div>
              </div> */}
            </div>
            <div className="lg:w-1/2 relative w-full max-w-lg lg:max-w-none mx-auto">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl shadow-2xl overflow-hidden border border-gray-800 backdrop-blur-xl">
                <div className="relative p-4 sm:p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    <ChatMessage user="Alex" message="Hey! Anyone here for a quick chat? 👋" />
                    <ChatMessage user="Sarah" message="Hi Alex! Just jumped in. What's up? 🌟" />
                    <ChatMessage user="Alex" message="Just wanted to discuss the latest tech trends! 💻" />
                    <ChatMessage
                      user="Sarah"
                      message="Perfect timing! I've been exploring AI lately."
                    />

                  </div>
                  <div className="mt-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className="w-full bg-gray-900/50 text-white rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 text-sm sm:text-base"
                      />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-20 sm:py-32 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <span className="text-blue-500 font-medium">Features</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 sm:mb-16 text-center">
              Why Choose{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Talkio
              </span>
              ?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
              <FeatureCard
                icon={<Zap className="w-12 h-12 text-yellow-500" />}
                title="Lightning Fast"
                description="Start chatting instantly with zero lag. Our optimized platform ensures smooth conversations."
              />
              <FeatureCard
                icon={<Timer className="w-12 h-12 text-green-500" />}
                title="Quick Chats"
                description="Perfect for spontaneous conversations. No commitments, just jump in and chat."
              />
              <FeatureCard
                icon={<Globe className="w-12 h-12 text-blue-500" />}
                title="Global Access"
                description="Chat with people worldwide, anytime. No barriers, no boundaries."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8 sm:py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-6 md:mb-0">
            <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500" />
            <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Talkio
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 text-center md:text-left">
            {/* <div className="flex space-x-6">
              <a href="#" className="hover:text-blue-400 transition-colors text-sm sm:text-base">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors text-sm sm:text-base">
                Terms of Service
              </a>
            </div> */}
            <div className="text-gray-500 text-sm sm:text-base">© {new Date().getFullYear()} Talkio. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="group bg-gray-900/50 p-6 sm:p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5">
    <div className="mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center">{title}</h3>
    <p className="text-gray-400 text-center text-sm sm:text-base">{description}</p>
  </div>
)

interface ChatMessageProps {
  user: string;
  message: string;
}

const ChatMessage = ({ user, message }: ChatMessageProps) => (
  <div className="mb-4 hover:bg-gray-900/30 p-2 rounded-lg transition-colors">
    <span className="font-semibold text-blue-400">{user}: </span>
    <span className="text-gray-300 text-sm sm:text-base">{message}</span>
  </div>
)

export default LandingPage