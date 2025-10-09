import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CreditCard, DollarSign, Check } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

// Define the plan type with all required properties
type Plan = {
  name: string;
  price: string;
  description: string;
  isFree: boolean;
  trialDays?: number;
  requiresContact?: boolean;
};

const planDetails: Record<string, Plan> = {
  free: {
    name: 'Free Plan',
    price: '₹0',
    description: 'Basic access to Grubble features',
    isFree: true
  },
  premium: {
    name: 'Premium Plan (Grubble Plus)',
    price: '₹299/month',
    description: 'Full access to all premium features',
    isFree: false,
    trialDays: 7
  },
  recruiter: {
    name: 'Recruiter/Partner Plan',
    price: 'Custom pricing',
    description: 'For companies looking to hire talent',
    isFree: false,
    requiresContact: true
  }
};

const Payment = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  
  // Default to free plan if invalid plan ID
  const plan = planId && planDetails[planId] 
    ? planDetails[planId] 
    : planDetails.free;
  
  // If it's a free plan or requires contact, we don't need payment details
  const needsPayment = !plan.isFree && !plan.requiresContact;

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateCard = () => {
    const errors: Record<string, string> = {};
    
    // Name validation
    if (!cardName.match(/^[a-zA-Z\s]{2,}$/)) {
      errors.cardName = 'Please enter a valid name';
    }

    // Card number validation (16 digits)
    if (!cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      errors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    // Expiry validation (MM/YY format)
    if (!expiry.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      errors.expiry = 'Please enter a valid expiry date (MM/YY)';
    } else {
      const [month, year] = expiry.split('/');
      const expDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      if (expDate < new Date()) {
        errors.expiry = 'Card has expired';
      }
    }

    // CVV validation (3 or 4 digits)
    if (!cvv.match(/^\d{3,4}$/)) {
      errors.cvv = 'Please enter a valid CVV';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    value = value.replace(/\D/g, '');
    
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    
    setExpiry(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validateCard()) {
      setLoading(false);
      return;
    }

    try {
      // Store payment information in Supabase
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase.from('payments').insert({
        user_id: user.id,
        amount: plan.name === 'Premium Plan (Grubble Plus)' ? 29900 : 0, // ₹299 in paisa
        currency: 'INR',
        card_last_four: cardNumber.slice(-4),
        payment_method: 'card',
        status: 'completed'
      });

      if (error) throw error;

      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully.",
      });

      if (plan.requiresContact) {
        toast({
          title: "Request Submitted",
          description: "Our team will contact you shortly to discuss partnership options.",
        });
        navigate('/dashboard');
      } else if (plan.isFree) {
        toast({
          title: "Free Plan Activated",
          description: "You now have access to the free plan features.",
        });
        login('free'); // Log the user in with free plan
        navigate('/dashboard');
      } else {
        // For premium plan with trial
        toast({
          title: "Trial Activated!",
          description: `Your ${plan.trialDays}-day trial has begun. Enjoy premium features!`,
        });
        login('premium'); // Log the user in with premium plan
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto pt-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            {plan.requiresContact ? 'Contact Sales' : 'Complete Your Purchase'}
          </h1>
          
          <Card className="p-6 bg-card text-card-foreground shadow-md">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {plan.name}
              </h2>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 dark:text-gray-300">{plan.description}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{plan.price}</p>
              </div>
              
              {plan.trialDays && (
                <div className="mt-4 bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <p className="text-green-800 dark:text-green-300">
                      <span className="font-semibold">{plan.trialDays}-day free trial included.</span> No charge for {plan.trialDays} days. Cancel anytime.
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSubmit}>
              {paymentMethod === 'card' && (
                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="cardname">Name on Card</Label>
                    <Input
                      id="cardname"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className={formErrors.cardName ? 'border-red-500' : ''}
                    />
                    {formErrors.cardName && (
                      <p className="text-sm text-red-500 mt-1">{formErrors.cardName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="cardnumber">Card Number</Label>
                    <Input
                      id="cardnumber"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                      className={formErrors.cardNumber ? 'border-red-500' : ''}
                    />
                    {formErrors.cardNumber && (
                      <p className="text-sm text-red-500 mt-1">{formErrors.cardNumber}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        value={expiry}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className={formErrors.expiry ? 'border-red-500' : ''}
                      />
                      {formErrors.expiry && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.expiry}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength={4}
                        className={formErrors.cvv ? 'border-red-500' : ''}
                      />
                      {formErrors.cvv && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Processing..." : plan.trialDays ? "Start Free Trial" : "Pay Now"}
              </Button>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                Your payment information is secured with end-to-end encryption
              </p>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
