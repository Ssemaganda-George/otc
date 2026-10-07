import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-24">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! Page not found</p>
        <Link to="/" className="bg-primary text-white px-8 py-4 rounded-full text-base font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
