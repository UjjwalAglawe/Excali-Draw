
import { Pencil, Share2, Download, Github, Shapes } from 'lucide-react';
import {Button} from "@repo/ui/button";
import { Card } from '@repo/ui/card';
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Navigation */}
      <nav className="border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Shapes className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">Excalidraw Clone</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://github.com" className="text-gray-400 hover:text-white transition">
                <Github className="h-6 w-6" />
              </a>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Sign in
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Virtual Whiteboard for
              <span className="text-blue-400"> Creative Minds</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Create, collaborate, and share beautiful hand-drawn diagrams with our intuitive drawing tool.
            </p>
            <button className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition">
              Start Drawing Now
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-gray-700 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Pencil className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Free-hand Drawing</h3>
              <p className="text-gray-300">Create beautiful diagrams with our intuitive drawing tools</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-700 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Share2 className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Real-time Collaboration</h3>
              <p className="text-gray-300">Work together with your team in real-time</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-700 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Export Options</h3>
              <p className="text-gray-300">Export your drawings in multiple formats</p>
            </div>
          </div>
        </div>
      </div>

      {/* Example Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-gray-700">
            <img 
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=2000&q=80" 
              alt="Whiteboard Example"
              className="w-full h-[600px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Shapes className="h-6 w-6 text-blue-400" />
              <span className="ml-2 text-gray-300">© 2025 Excalidraw Clone</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
