import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "otc-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem(STORAGE_KEY);
      if (!accepted) {
        setVisible(true);
      }
    } catch (e) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch (e) {
      // ignore
    }
    setVisible(false);
  };

  const handleDismiss = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[100] max-w-sm w-[calc(100%-2rem)] sm:w-96">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-5 flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
          <Cookie className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-bold text-foreground font-poppins mb-1">
            We value your privacy
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            We use cookies to improve your experience. By continuing to browse, you agree to
            our <a href="/cookies" className="text-primary font-semibold hover:underline">Cookie Policy</a>.
          </p>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleAccept}
              size="sm"
              className="flex-1 bg-primary text-white hover:bg-primary-dark font-semibold"
            >
              Accept
            </Button>
            <Button
              onClick={handleDismiss}
              size="sm"
              variant="outline"
              className="px-3"
              aria-label="Dismiss cookie notice"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
