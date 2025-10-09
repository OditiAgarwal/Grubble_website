
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-grubble-400 overflow-hidden">
              <span className="inline-block animate-bounce">G</span>
              <span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>r</span>
              <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>u</span>
              <span className="inline-block animate-bounce" style={{ animationDelay: '0.3s' }}>b</span>
              <span className="inline-block animate-bounce" style={{ animationDelay: '0.4s' }}>b</span>
              <span className="inline-block animate-bounce" style={{ animationDelay: '0.5s' }}>l</span>
              <span className="inline-block animate-bounce" style={{ animationDelay: '0.6s' }}>e</span>
            </h3>
            <p className="text-gray-300">
              Empowering Indian students and professionals to build successful tech careers through personalized learning and career guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-grubble-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-grubble-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-grubble-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-grubble-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/career-assessment" className="text-gray-300 hover:text-grubble-400 transition-colors">
                  Career Assessment
                </Link>
              </li>
              <li>
                <Link to="/learning-roadmap" className="text-gray-300 hover:text-grubble-400 transition-colors">
                  Learning Roadmap
                </Link>
              </li>
              <li>
                <Link to="/course-comparison" className="text-gray-300 hover:text-grubble-400 transition-colors">
                  Course Comparison
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-grubble-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-grubble-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-grubble-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-grubble-400" />
                <span className="text-gray-300">Gurgaon, Haryana, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-grubble-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-grubble-400" />
                <span className="text-gray-300">support@grubble.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Grubble. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-grubble-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-grubble-400 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
