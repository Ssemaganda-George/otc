import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

// Page title mapping for better analytics
const PAGE_TITLES: Record<string, string> = {
  '/': 'Home - OneTechConnect',
  '/about': 'About Us - OneTechConnect',
  '/about/who-we-are': 'Who We Are - OneTechConnect',
  '/about/vision-mission': 'Vision & Mission - OneTechConnect',
  '/about/philosophy': 'Philosophy - OneTechConnect',
  '/about/team': 'Our Team - OneTechConnect',
  '/about/research-experts': 'Research Experts - OneTechConnect',
  '/about/otc-framework': 'OTC Framework - OneTechConnect',
  '/about/values': 'Our Values - OneTechConnect',
  '/what-we-do': 'What We Do - OneTechConnect',
  '/what-we-do/approach': 'Our Approach - OneTechConnect',
  '/what-we-do/focus-areas': 'Focus Areas - OneTechConnect',
  '/what-we-do/programmes': 'Programmes - OneTechConnect',
  '/programmes/tsg': 'Technology for Social Good (TSG) - OneTechConnect',
  '/programmes/ainow': 'AI Now - OneTechConnect',
  '/programmes/bita': 'BigTech Africa (BiTA) - OneTechConnect',
  '/programmes/emt': 'Evidence Making Technology (EMT) - OneTechConnect',
  '/our-products': 'Our Products - OneTechConnect',
  '/our-products/overview': 'Products Overview - OneTechConnect',
  '/our-products/services': 'Our Services - OneTechConnect',
  '/products/strategic-litigation': 'Strategic Litigation - OneTechConnect',
  '/products/innovations': 'Innovations - OneTechConnect',
  '/products/center-for-digital-justice': 'Center for Digital Justice - OneTechConnect',
  '/products/consultancy': 'Consultancy - OneTechConnect',
  '/products/short-courses': 'Short Courses - OneTechConnect',
  '/news': 'News & Updates - OneTechConnect',
  '/news/research-publications': 'Research Publications - OneTechConnect',
  '/news/repository': 'Repository - OneTechConnect',
  '/team': 'Team - OneTechConnect',
  '/contact': 'Contact Us - OneTechConnect',
  '/donate': 'Donate - OneTechConnect',
  '/newsletter': 'Newsletter - OneTechConnect',
  '/programmes': 'Programmes - OneTechConnect',
};

export const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('🔍 AnalyticsTracker triggered for path:', location.pathname);
    const trackPageView = async () => {
      try {
        // Skip tracking admin pages except analytics
        if (location.pathname.startsWith('/admin') && !location.pathname.includes('/analytics')) {
          console.log('🚫 Skipping tracking for admin page:', location.pathname);
          return;
        }
        console.log('✅ Tracking allowed for:', location.pathname);

        // Get or create session ID
        let sessionId = localStorage.getItem('analytics_session_id');
        console.log('📋 Current session ID from localStorage:', sessionId);
        if (!sessionId) {
          sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          localStorage.setItem('analytics_session_id', sessionId);
          console.log('🆕 Created new session ID:', sessionId);
        } else {
          console.log('♻️ Using existing session ID:', sessionId);
        }

        // Get visitor information
        const userAgent = navigator.userAgent;
        const referrer = document.referrer;
        const screenResolution = `${window.screen.width}x${window.screen.height}`;
        const language = navigator.language;

        // TEMPORARY: Test with hardcoded country data
        let country = 'United States';
        let city = 'New York';
        console.log('📍 Using test location data:', { country, city });

        // Detect device type
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const isTablet = /iPad|Android(?=.*\bMobile\b)|Tablet|PlayBook/i.test(userAgent);
        const deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

        // Detect browser
        let browser = 'Unknown';
        if (userAgent.includes('Chrome')) browser = 'Chrome';
        else if (userAgent.includes('Firefox')) browser = 'Firefox';
        else if (userAgent.includes('Safari')) browser = 'Safari';
        else if (userAgent.includes('Edge')) browser = 'Edge';
        else if (userAgent.includes('Opera')) browser = 'Opera';

        // Detect OS
        let os = 'Unknown';
        if (userAgent.includes('Windows')) os = 'Windows';
        else if (userAgent.includes('Mac')) os = 'macOS';
        else if (userAgent.includes('Linux')) os = 'Linux';
        else if (userAgent.includes('Android')) os = 'Android';
        else if (userAgent.includes('iOS')) os = 'iOS';

        // Check if session exists, if not create it
        const { data: existingSession } = await supabase
          .from('visitor_sessions')
          .select('id, visit_count, total_page_views')
          .eq('session_id', sessionId)
          .single();

        if (!existingSession) {
          // Create new session
          console.log('📝 Creating new session with data:', {
            session_id: sessionId,
            country,
            city,
            device_type: deviceType,
            browser
          });
          const { error: insertError } = await supabase.from('visitor_sessions').insert({
            session_id: sessionId,
            user_agent: userAgent,
            referrer: referrer,
            device_type: deviceType,
            browser: browser,
            os: os,
            screen_resolution: screenResolution,
            language: language,
            country: country,
            city: city,
            visit_count: 1,
            total_page_views: 1
          });
          if (insertError) {
            console.error('❌ Failed to insert session:', insertError);
          } else {
            console.log('✅ Session created successfully');
          }
        } else {
          // Update existing session
          console.log('🔄 Updating existing session:', sessionId, 'with country:', country);
          const { error: updateError } = await supabase
            .from('visitor_sessions')
            .update({
              last_visit: new Date().toISOString(),
              visit_count: existingSession.visit_count + 1,
              total_page_views: existingSession.total_page_views + 1,
              country: country,
              city: city
            })
            .eq('session_id', sessionId);
          if (updateError) {
            console.error('❌ Failed to update session:', updateError);
          } else {
            console.log('✅ Session updated successfully');
          }
        }

        // Track page view
        const pageTitle = PAGE_TITLES[location.pathname] || `${location.pathname} - OneTechConnect`;

        await supabase.from('page_views').insert({
          session_id: sessionId,
          page_path: location.pathname,
          page_title: pageTitle,
          referrer: referrer
        });

      } catch (error) {
        console.error('Analytics tracking error:', error);
      }
    };

    trackPageView();
  }, [location.pathname]);

  return null;
};