
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type SubscriptionTier = 'free' | 'premium' | 'recruiter' | null;

interface AuthContextType {
  isLoggedIn: boolean;
  subscriptionTier: SubscriptionTier;
  trialEndDate: Date | null;
  userName: string | null;
  login: (tier?: SubscriptionTier, name?: string) => void;
  logout: () => void;
  setSubscription: (tier: SubscriptionTier, trialEndDate?: Date | null) => void;
  updateUserName: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>(null);
  const [trialEndDate, setTrialEndDate] = useState<Date | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Load auth state from localStorage on init
  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      const parsedAuth = JSON.parse(savedAuth);
      setIsLoggedIn(parsedAuth.isLoggedIn);
      setSubscriptionTier(parsedAuth.subscriptionTier);
      setTrialEndDate(parsedAuth.trialEndDate ? new Date(parsedAuth.trialEndDate) : null);
      setUserName(parsedAuth.userName || null);
    }
  }, []);

  // Save auth state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify({
      isLoggedIn,
      subscriptionTier,
      trialEndDate: trialEndDate?.toISOString(),
      userName
    }));
  }, [isLoggedIn, subscriptionTier, trialEndDate, userName]);

  const login = (tier: SubscriptionTier = 'free', name?: string) => {
    setIsLoggedIn(true);
    setSubscriptionTier(tier);
    if (name) {
      setUserName(name);
    }
    
    // If tier is premium, set a trial end date 7 days from now
    if (tier === 'premium') {
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + 7);
      setTrialEndDate(trialEnd);
    } else {
      setTrialEndDate(null);
    }
    
    // Check if there's a redirect path stored
    const redirectPath = localStorage.getItem('redirectAfterAuth');
    if (redirectPath && redirectPath !== '/login' && redirectPath !== '/signup') {
      localStorage.removeItem('redirectAfterAuth');
      navigate(redirectPath);
    } else {
      navigate('/dashboard');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setSubscriptionTier(null);
    setTrialEndDate(null);
    setUserName(null);
    localStorage.removeItem('auth');
    localStorage.removeItem('redirectAfterAuth');
    navigate('/');
  };

  const setSubscription = (tier: SubscriptionTier, endDate: Date | null = null) => {
    setSubscriptionTier(tier);
    setTrialEndDate(endDate);
  };

  const updateUserName = (name: string) => {
    setUserName(name);
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      subscriptionTier, 
      trialEndDate,
      userName,
      login, 
      logout,
      setSubscription,
      updateUserName
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
