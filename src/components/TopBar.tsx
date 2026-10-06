import { Search, Twitter, Linkedin, Facebook } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-gray-900 text-white text-sm">
      <div className="max-w-[1536px] mx-auto px-3 sm:px-4 lg:px-5">
        <div className="flex items-center justify-between h-10">
          {/* Left side - Tagline */}
          <div className="hidden md:block text-gray-300 text-xs">
            Championing Africa's Technological & Digital Justice
          </div>

          {/* Right side - Social icons and search */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* Social Icons */}
            <div className="flex items-center space-x-3">
              <a
                href="https://twitter.com/OneTechConnect"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/company/onetechconnect"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com/OneTechConnect"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>

            {/* Search */}
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-800 text-white text-xs pl-8 pr-3 py-1.5 rounded-full border border-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-32 md:w-40"
                  aria-label="Search"
                />
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
