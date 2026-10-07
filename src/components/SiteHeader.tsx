import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, FileText, Video } from "lucide-react";

export function SiteHeader() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-[1536px] mx-auto px-3 sm:px-4 lg:px-5">
          <div className="flex items-center justify-between py-8">
            {/* Logo and Tagline */}
            <Link to="/" className="flex flex-col items-start group">
              <img
                src="/OTC_logo.png"
                alt="OneTechConnect Logo"
                className="h-24 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <p className="text-base text-muted-foreground font-poppins leading-tight mt-2">
              Championing Africa's<br />Technological & Digital Justice
            </p>
          </Link>

          {/* Quick Actions */}
          <div className="flex items-center space-x-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden md:flex items-center space-x-2 border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Link to="/newsletter">
                <Mail className="h-4 w-4" />
                <span>Subscribe to Newsletter</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden md:flex items-center space-x-2 border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Link to="/news/research-publications">
                <FileText className="h-4 w-4" />
                <span>Research Publications</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden md:flex items-center space-x-2 border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Link to="/media">
                <Video className="h-4 w-4" />
                <span>Webinar Series</span>
              </Link>
            </Button>
            <Button asChild variant="golden" size="sm" className="hidden md:flex">
              <Link to="/donate">Donate</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
