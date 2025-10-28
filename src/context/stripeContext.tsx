// "use client";

// import React, { createContext, useContext, ReactNode } from 'react';
// import { loadStripe, Stripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// interface StripeContextType {
//   stripe: Promise<Stripe | null>;
// }

// const StripeContext = createContext<StripeContextType | undefined>(undefined);

// export const useStripeContext = () => {
//   const context = useContext(StripeContext);
//   if (!context) {
//     throw new Error('useStripeContext must be used within a StripeProvider');
//   }
//   return context;
// };

// interface StripeProviderProps {
//   children: ReactNode;
// }

// export const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
//   const value: StripeContextType = {
//     stripe: stripePromise
//   };

//   return (
//     <StripeContext.Provider value={value}>
//       {children}
//     </StripeContext.Provider>
//   );
// };

"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeContextType {
  stripe: Promise<Stripe | null>;
}

const StripeContext = createContext<StripeContextType | undefined>(undefined);

export const useStripeContext = () => {
  const context = useContext(StripeContext);
  if (!context) {
    throw new Error('useStripeContext must be used within a StripeProvider');
  }
  return context;
};

interface StripeProviderProps {
  children: ReactNode;
}

export const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
  const value: StripeContextType = {
    stripe: stripePromise
  };

  return (
    <StripeContext.Provider value={value}>
      {children}
    </StripeContext.Provider>
  );
};