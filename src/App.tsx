import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { ScreenSwitcher } from './components/ScreenSwitcher';
import { GuestModal } from './components/GuestModal';
import { PropertyAlertModal } from './components/PropertyAlertModal';
import { GuestReviewModal } from './components/GuestReviewModal';
import { PostSpaceModal } from './components/PostSpaceModal';
import { CURRENT_USER, MOCK_PROPERTIES, MOCK_REVIEWS, MOCK_ALERT_SUBSCRIPTIONS, MOCK_NOTIFICATIONS } from './data/mockData';
import { User, UserRole, PropertyAlertSubscription, AppNotification, Property, Review } from './types';
import { Bell, Sparkles, X, ExternalLink, CheckCircle2 } from 'lucide-react';

// Screens
import { LandingPage } from './screens/LandingPage';
import { HomeFeed } from './screens/HomeFeed';
import { SearchResults } from './screens/SearchResults';
import { MapView } from './screens/MapView';
import { PropertyDetail } from './screens/PropertyDetail';
import { SingleReview } from './screens/SingleReview';
import { ScamCheck } from './screens/ScamCheck';
import { ScamReportDetail } from './screens/ScamReportDetail';
import { AgentLandlordProfile } from './screens/AgentLandlordProfile';
import { NeighbourhoodGuide } from './screens/NeighbourhoodGuide';
import { FeeBenchmark } from './screens/FeeBenchmark';
import { HowItWorks } from './screens/HowItWorks';
import { AboutMission } from './screens/AboutMission';
import { LegalPolicies } from './screens/LegalPolicies';
import { FaqHelp } from './screens/FaqHelp';
import { AuthScreens } from './screens/AuthScreens';
import { PostReviewWizard } from './screens/PostReviewWizard';
import { ReportScamWizard } from './screens/ReportScamWizard';
import { ChatScreens } from './screens/ChatScreens';
import { ProfileScreens } from './screens/ProfileScreens';
import { VerificationCentre } from './screens/VerificationCentre';
import { LandlordDashboard } from './screens/LandlordDashboard';
import { RewardsLeaderboard } from './screens/RewardsLeaderboard';
import { AdminDashboard } from './screens/AdminDashboard';
import { SystemStates } from './screens/SystemStates';
import { DesignSystem } from './screens/DesignSystem';
import { PropertyAlertsManager } from './screens/PropertyAlertsManager';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('landing');
  const [screenParam, setScreenParam] = useState<string | undefined>(undefined);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User | null>(CURRENT_USER);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState<boolean>(false);

  // Open Community Spaces & Reviews State
  const [propertiesList, setPropertiesList] = useState<Property[]>(MOCK_PROPERTIES);
  const [reviewsList, setReviewsList] = useState<Review[]>(MOCK_REVIEWS);
  const [isGuestReviewModalOpen, setIsGuestReviewModalOpen] = useState(false);
  const [guestReviewPropertyId, setGuestReviewPropertyId] = useState<string | undefined>(undefined);
  const [isPostSpaceModalOpen, setIsPostSpaceModalOpen] = useState(false);

  // Property Alert Subscriptions State
  const [alertSubscriptions, setAlertSubscriptions] = useState<PropertyAlertSubscription[]>(MOCK_ALERT_SUBSCRIPTIONS);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [alertModalCriteria, setAlertModalCriteria] = useState<any>(undefined);
  const [notificationsList, setNotificationsList] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);

  // Live Simulated Push Toast State
  const [livePushToast, setLivePushToast] = useState<{
    id: string;
    title: string;
    message: string;
    propertyId?: string;
    timestamp: string;
  } | null>(null);

  // Open Community Guest Review Handlers
  const handleOpenGuestReview = (propertyId?: string) => {
    setGuestReviewPropertyId(propertyId);
    setIsGuestReviewModalOpen(true);
  };

  const handleSaveGuestReview = (newReview: Review) => {
    setReviewsList((prev) => [newReview, ...prev]);
    setPropertiesList((prev) =>
      prev.map((p) => {
        if (p.id === newReview.propertyId) {
          const newCount = p.totalReviews + 1;
          const newAvg = parseFloat(
            ((p.averageRating * p.totalReviews + newReview.overallRating) / newCount).toFixed(1)
          );
          return {
            ...p,
            totalReviews: newCount,
            averageRating: newAvg,
          };
        }
        return p;
      })
    );

    setLivePushToast({
      id: `toast-${Date.now()}`,
      title: 'Review Published 🌟',
      message: 'Your community review is now live! Thank you for protecting fellow Akwa Ibom residents.',
      propertyId: newReview.propertyId,
      timestamp: 'Just now',
    });
  };

  // Host Space Listing Handlers
  const handleOpenPostSpace = () => {
    setIsPostSpaceModalOpen(true);
  };

  const handleSaveSpace = (newSpace: Property) => {
    setPropertiesList((prev) => [newSpace, ...prev]);
    setCurrentScreen('search');

    setLivePushToast({
      id: `toast-${Date.now()}`,
      title: 'Space Listed Successfully 🏠',
      message: `"${newSpace.title}" is now live in the Uyo directory. Renters can call & WhatsApp you directly!`,
      propertyId: newSpace.id,
      timestamp: 'Just now',
    });
  };

  const handleNavigate = (screenId: string, param?: string) => {
    setCurrentScreen(screenId);
    setScreenParam(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (role: UserRole) => {
    setIsLoggedIn(true);
    setCurrentUser({
      ...CURRENT_USER,
      role: role,
    });
    setIsGuestModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentScreen('feed');
  };

  const handleOpenCreateAlertModal = (criteria?: any) => {
    setAlertModalCriteria(criteria);
    setIsAlertModalOpen(true);
  };

  const handleSaveSubscription = (newSub: PropertyAlertSubscription) => {
    setAlertSubscriptions((prev) => [newSub, ...prev]);

    // Show confirmation push toast
    setLivePushToast({
      id: `toast-${Date.now()}`,
      title: 'Alert Subscription Active 🔔',
      message: `You'll receive ${newSub.channels.push ? 'Push' : ''}${newSub.channels.push && newSub.channels.email ? ' & ' : ''}${newSub.channels.email ? 'Email' : ''} alerts for ${newSub.name}.`,
      timestamp: 'Just now',
    });

    // Also add to notifications list
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: '🔔 Property Alert Subscribed',
      message: `Alert activated for ${newSub.name} (Max: ₦${(newSub.maxPriceNaira / 1000).toFixed(0)}k).`,
      timestamp: 'Just now',
      type: 'property_alert',
      read: false,
      linkScreen: 'property_alerts',
    };
    setNotificationsList((prev) => [newNotif, ...prev]);

    // Auto-dismiss toast after 6s
    setTimeout(() => {
      setLivePushToast(null);
    }, 6000);
  };

  const handleToggleSubscription = (id: string) => {
    setAlertSubscriptions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const handleDeleteSubscription = (id: string) => {
    setAlertSubscriptions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleTriggerSimulationAlert = (sub: PropertyAlertSubscription) => {
    const loc = sub.location === 'All' ? 'Shelter Afrique' : sub.location;
    const alertTitle = `🔔 New Matching Flat in ${loc}!`;
    const alertBody = `Plot 14, Unit C, ${loc} Estate • ₦850,000/yr • Borehole water running 24/7. Verified Title.`;

    // 1. Real Browser Notification if supported & granted
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(alertTitle, {
          body: alertBody,
          icon: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=128&q=80',
        });
      } catch (e) {
        console.warn('Browser push error', e);
      }
    }

    // 2. Live in-app Push Notification Banner / Toast
    setLivePushToast({
      id: `toast-${Date.now()}`,
      title: alertTitle,
      message: alertBody,
      propertyId: 'prop-1',
      timestamp: 'Just now',
    });

    // 3. Add to notifications feed
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: alertTitle,
      message: alertBody,
      timestamp: 'Just now',
      type: 'property_alert',
      read: false,
      linkScreen: 'property_detail',
      linkParam: 'prop-1',
    };
    setNotificationsList((prev) => [newNotif, ...prev]);

    // Auto-dismiss toast after 7s
    setTimeout(() => {
      setLivePushToast(null);
    }, 7000);
  };

  // Render Screen Helper
  const renderActiveScreen = () => {
    switch (currentScreen) {
      // 1-15: Public Screens
      case 'landing':
        return (
          <LandingPage
            onNavigate={handleNavigate}
            onOpenGuestModal={() => setIsGuestModalOpen(true)}
          />
        );
      case 'feed':
        return (
          <HomeFeed
            onNavigate={handleNavigate}
            onOpenGuestModal={() => setIsGuestModalOpen(true)}
            isLoggedIn={isLoggedIn}
            allProperties={propertiesList}
            allReviews={reviewsList}
            onOpenGuestReview={handleOpenGuestReview}
            onOpenPostSpace={handleOpenPostSpace}
          />
        );
      case 'search':
        return (
          <SearchResults
            onNavigate={handleNavigate}
            onOpenGuestModal={() => setIsGuestModalOpen(true)}
            isLoggedIn={isLoggedIn}
            onOpenCreateAlertModal={handleOpenCreateAlertModal}
            activeAlertsCount={alertSubscriptions.filter((s) => s.active).length}
            allProperties={propertiesList}
          />
        );
      case 'map_view':
        return (
          <MapView
            onNavigate={handleNavigate}
            onOpenGuestModal={() => setIsGuestModalOpen(true)}
          />
        );
      case 'property_detail':
        return (
          <PropertyDetail
            propertyId={screenParam || 'prop-1'}
            onNavigate={handleNavigate}
            onOpenGuestModal={() => setIsGuestModalOpen(true)}
            isLoggedIn={isLoggedIn}
            onOpenGuestReview={handleOpenGuestReview}
            allProperties={propertiesList}
            allReviews={reviewsList}
          />
        );
      case 'single_review':
        return (
          <SingleReview
            reviewId={screenParam || 'rev-1'}
            onNavigate={handleNavigate}
            onOpenGuestModal={() => setIsGuestModalOpen(true)}
            isLoggedIn={isLoggedIn}
          />
        );
      case 'scam_check':
        return (
          <ScamCheck
            initialQuery={screenParam}
            onNavigate={handleNavigate}
            onOpenGuestModal={() => setIsGuestModalOpen(true)}
            isLoggedIn={isLoggedIn}
          />
        );
      case 'scam_report_detail':
        return (
          <ScamReportDetail
            scamId={screenParam}
            onNavigate={handleNavigate}
          />
        );
      case 'agent_profile':
        return (
          <AgentLandlordProfile
            agentId={screenParam}
            onNavigate={handleNavigate}
            onOpenGuestModal={() => setIsGuestModalOpen(true)}
            isLoggedIn={isLoggedIn}
          />
        );
      case 'neighbourhoods':
        return <NeighbourhoodGuide onNavigate={handleNavigate} />;
      case 'fee_benchmark':
        return <FeeBenchmark onNavigate={handleNavigate} />;
      case 'how_it_works':
        return <HowItWorks onNavigate={handleNavigate} />;
      case 'about_mission':
        return <AboutMission onNavigate={handleNavigate} />;
      case 'legal_policies':
        return <LegalPolicies onNavigate={handleNavigate} />;
      case 'faq_help':
        return <FaqHelp onNavigate={handleNavigate} />;

      // 16-20: Authentication & Onboarding
      case 'sign_in':
        return (
          <AuthScreens
            initialSubScreen="sign_in"
            onNavigate={handleNavigate}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case 'otp_verification':
        return (
          <AuthScreens
            initialSubScreen="otp_verification"
            onNavigate={handleNavigate}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case 'onboarding':
        return (
          <AuthScreens
            initialSubScreen="onboarding"
            onNavigate={handleNavigate}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case 'guest_prompt':
        return (
          <AuthScreens
            initialSubScreen="guest_prompt"
            onNavigate={handleNavigate}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case 'recovery':
        return (
          <AuthScreens
            initialSubScreen="recovery"
            onNavigate={handleNavigate}
            onLoginSuccess={handleLoginSuccess}
          />
        );

      // 21-32: Logged-in Features
      case 'post_review':
        return (
          <PostReviewWizard
            onNavigate={handleNavigate}
            onReviewSubmitted={() => {
              // Points updated
            }}
          />
        );
      case 'report_scam':
        return <ReportScamWizard onNavigate={handleNavigate} />;
      case 'chat_inbox':
        return (
          <ChatScreens
            initialView="inbox"
            onNavigate={handleNavigate}
            onOpenGuestModal={() => setIsGuestModalOpen(true)}
            isLoggedIn={isLoggedIn}
          />
        );
      case 'chat_thread':
        return (
          <ChatScreens
            initialView="thread"
            onNavigate={handleNavigate}
            onOpenGuestModal={() => setIsGuestModalOpen(true)}
            isLoggedIn={isLoggedIn}
          />
        );
      case 'profile':
        return (
          <ProfileScreens
            initialSubScreen="profile"
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            notifications={notificationsList}
          />
        );
      case 'edit_profile':
        return (
          <ProfileScreens
            initialSubScreen="edit_profile"
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            notifications={notificationsList}
          />
        );
      case 'saved_properties':
        return (
          <ProfileScreens
            initialSubScreen="saved_properties"
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            notifications={notificationsList}
          />
        );
      case 'notifications':
        return (
          <ProfileScreens
            initialSubScreen="notifications"
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            notifications={notificationsList}
          />
        );
      case 'verification_centre':
        return <VerificationCentre onNavigate={handleNavigate} />;
      case 'landlord_dashboard':
        return <LandlordDashboard onNavigate={handleNavigate} />;
      case 'reply_to_review':
        return <LandlordDashboard onNavigate={handleNavigate} />;
      case 'rewards':
        return (
          <SearchResults
            onNavigate={handleNavigate}
            onOpenGuestModal={() => setIsGuestModalOpen(true)}
            isLoggedIn={isLoggedIn}
            onOpenCreateAlertModal={handleOpenCreateAlertModal}
            activeAlertsCount={alertSubscriptions.filter((s) => s.active).length}
            allProperties={propertiesList}
          />
        );

      // 33: Admin Dashboard
      case 'admin_dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;

      // 34-37: System States
      case 'empty_states':
        return <SystemStates initialState="empty" onNavigate={handleNavigate} />;
      case 'error_states':
        return <SystemStates initialState="error" onNavigate={handleNavigate} />;
      case 'loading_states':
        return <SystemStates initialState="loading" onNavigate={handleNavigate} />;
      case 'success_states':
        return <SystemStates initialState="success" onNavigate={handleNavigate} />;

      // 38: Design System
      case 'design_system':
        return <DesignSystem onNavigate={handleNavigate} />;

      // 39: Property Alert Subscription Manager
      case 'property_alerts':
        return (
          <PropertyAlertsManager
            onNavigate={handleNavigate}
            onOpenCreateAlertModal={handleOpenCreateAlertModal}
            onTriggerSimulationAlert={handleTriggerSimulationAlert}
            subscriptions={alertSubscriptions}
            onToggleActive={handleToggleSubscription}
            onDeleteSubscription={handleDeleteSubscription}
          />
        );

      default:
        return (
          <LandingPage
            onNavigate={handleNavigate}
            onOpenGuestModal={() => setIsGuestModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] font-sans antialiased">
      {/* Floating Global Screen Switcher & Viewport Mode Controller */}
      <ScreenSwitcher
        currentScreen={currentScreen}
        onSelectScreen={handleNavigate}
        isMobileFrame={isMobileFrame}
        onToggleMobileFrame={setIsMobileFrame}
      />

      {/* Guest Sign-Up Bottom Sheet / Modal */}
      <GuestModal
        isOpen={isGuestModalOpen}
        onClose={() => setIsGuestModalOpen(false)}
        onContinueWithGoogle={() => handleLoginSuccess('tenant')}
        onContinueWithPhone={() => {
          setIsGuestModalOpen(false);
          handleNavigate('sign_in');
        }}
        onContinueWithEmail={() => {
          setIsGuestModalOpen(false);
          handleNavigate('sign_in');
        }}
      />

      {/* Property Alert Modal */}
      <PropertyAlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        onSaveSubscription={handleSaveSubscription}
        initialCriteria={alertModalCriteria}
        userEmail={currentUser?.email}
        userPhone={currentUser?.phone}
      />

      {/* Community Guest Review Modal (No Login Required) */}
      <GuestReviewModal
        isOpen={isGuestReviewModalOpen}
        onClose={() => setIsGuestReviewModalOpen(false)}
        properties={propertiesList}
        preSelectedPropertyId={guestReviewPropertyId}
        onSaveReview={handleSaveGuestReview}
      />

      {/* Host Post Space Modal (Apartments, Stores, Rooms, Event Halls, Offices) */}
      <PostSpaceModal
        isOpen={isPostSpaceModalOpen}
        onClose={() => setIsPostSpaceModalOpen(false)}
        isLoggedIn={isLoggedIn}
        onOpenSignIn={() => handleNavigate('sign_in')}
        onSaveSpace={handleSaveSpace}
        currentUser={currentUser}
      />

      {/* Live In-App Push Alert Toast Notification */}
      {livePushToast && (
        <div className="fixed bottom-24 md:bottom-20 right-4 md:right-6 z-50 max-w-sm w-full bg-[#2F3626] text-white p-4 rounded-2xl shadow-2xl border border-[#8B9A6E]/50 animate-bounce-short flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C4684A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C4684A]"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B9A6E]">Instant Alert</span>
            </div>
            <button
              onClick={() => setLivePushToast(null)}
              className="text-[#EAE2D6]/60 hover:text-white text-xs px-1.5 py-0.5 rounded cursor-pointer"
            >
              ✕
            </button>
          </div>
          <p className="text-sm font-semibold text-[#F7F2EB]">{livePushToast.title}</p>
          <p className="text-xs text-[#EAE2D6]/80 leading-relaxed">{livePushToast.message}</p>
          <div className="flex items-center justify-between pt-2 border-t border-white/10 mt-1">
            <span className="text-[11px] text-[#8B9A6E]">{livePushToast.timestamp}</span>
            <button
              onClick={() => {
                setLivePushToast(null);
                handleNavigate(livePushToast.propertyId ? 'property_detail' : 'search', livePushToast.propertyId);
              }}
              className="text-xs font-semibold text-[#EAE2D6] hover:text-[#C4684A] underline flex items-center gap-1 cursor-pointer"
            >
              View Space →
            </button>
          </div>
        </div>
      )}

      {/* Render Viewport: Either Full Width Responsive or Simulated Mobile Bezel Frame */}
      {isMobileFrame ? (
        <div className="py-8 px-4 flex items-center justify-center min-h-screen bg-[#2F3626]/10 backdrop-blur-xs">
          <div className="w-full max-w-[410px] h-[840px] bg-[#F7F2EB] rounded-[48px] shadow-[0_25px_60px_rgba(47,54,38,0.35)] border-8 border-[#2F3626] overflow-hidden flex flex-col relative">
            {/* Phone Notch / Speaker Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#2F3626] rounded-full z-50 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1a1e15] mr-2" />
              <div className="w-10 h-1 rounded-full bg-[#3d4533]" />
            </div>

            {/* Scrollable Phone Screen Content */}
            <div className="flex-1 overflow-y-auto pt-6 scrollbar-none flex flex-col">
              <Navigation
                currentScreen={currentScreen}
                onNavigate={handleNavigate}
                currentUser={currentUser}
                onOpenGuestReview={handleOpenGuestReview}
                onOpenPostSpace={handleOpenPostSpace}
              />
              <main className="flex-1">{renderActiveScreen()}</main>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen">
          <Navigation
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            currentUser={currentUser}
            onOpenGuestReview={handleOpenGuestReview}
            onOpenPostSpace={handleOpenPostSpace}
          />
          <main className="flex-1">{renderActiveScreen()}</main>
        </div>
      )}
    </div>
  );
};

export default App;
