import React, { useEffect, useRef } from 'react';

// ==========================================
// FEATURE 1: DYNAMIC MULTI-DIMENSIONAL MATRIX
// ==========================================
type Currency = 'USD' | 'INR' | 'EUR';
type Billing = 'Monthly' | 'Annual';

const CONFIG_MATRIX = {
  currencies: {
    USD: { symbol: '$', rate: 1, tariff: 1 },
    INR: { symbol: '₹', rate: 83.5, tariff: 0.95 },
    EUR: { symbol: '€', rate: 0.92, tariff: 1.05 },
  },
  billing: {
    Monthly: { multiplier: 1 },
    Annual: { multiplier: 0.8 }, // 20% discount
  },
  plans: [
    {
      id: 'starter',
      title: 'Starter',
      baseRate: 10,
      features: ['Up to 10 Data Sources', 'Basic AI Workflows', 'Standard Support', '24h Data Retention'],
      isPopular: false
    },
    {
      id: 'professional',
      title: 'Professional',
      baseRate: 30,
      features: ['Unlimited Data Sources', 'Advanced AI Agents', 'Priority Support', '30-day Data Retention', 'Predictive Analytics'],
      isPopular: true
    },
    {
      id: 'enterprise',
      title: 'Enterprise',
      baseRate: 80,
      features: ['Custom Integrations', 'Dedicated AI Models', '24/7 Phone Support', 'Unlimited Retention', 'On-Premise Deployment'],
      isPopular: false
    }
  ]
};

// ==========================================
// ZERO-RENDER STATE ENGINE (Isolates updates to localized DOM nodes)
// ==========================================
class PricingStateEngine {
  private currency: Currency = 'USD';
  private billing: Billing = 'Monthly';
  private priceNodes: Set<{ baseRate: number, symbolRef: HTMLElement, valRef: HTMLElement }> = new Set();
  private controlNodes: Set<{ type: 'currency' | 'billing', val: string, ref: HTMLElement }> = new Set();

  public registerPriceNode(baseRate: number, symbolRef: HTMLElement, valRef: HTMLElement) {
    const node = { baseRate, symbolRef, valRef };
    this.priceNodes.add(node);
    this.updateSingleNode(node);
    return () => this.priceNodes.delete(node);
  }

  public registerControlNode(type: 'currency' | 'billing', val: string, ref: HTMLElement) {
    const node = { type, val, ref };
    this.controlNodes.add(node);
    this.updateControls();
    return () => this.controlNodes.delete(node);
  }

  public setCurrency(c: Currency) {
    if (this.currency === c) return;
    this.currency = c;
    this.orchestrateUpdate();
  }

  public setBilling(b: Billing) {
    if (this.billing === b) return;
    this.billing = b;
    this.orchestrateUpdate();
  }

  private updateSingleNode(node: { baseRate: number, symbolRef: HTMLElement, valRef: HTMLElement }) {
    const currConfig = CONFIG_MATRIX.currencies[this.currency];
    const billConfig = CONFIG_MATRIX.billing[this.billing];
    
    // Dynamic calculation via matrix
    const finalPrice = node.baseRate * billConfig.multiplier * currConfig.rate * currConfig.tariff;
    
    // Strict isolation guardrail: ONLY update the localized text node. NO React re-renders.
    node.symbolRef.textContent = currConfig.symbol;
    node.valRef.textContent = (finalPrice % 1 === 0) ? finalPrice.toString() : finalPrice.toFixed(2);
  }

  private updateControls() {
    this.controlNodes.forEach(({ type, val, ref }) => {
      const isActive = (type === 'currency' && val === this.currency) || (type === 'billing' && val === this.billing);
      if (isActive) {
        ref.classList.add('bg-white', 'text-dark-surface', 'font-bold');
        ref.classList.remove('text-white/70');
      } else {
        ref.classList.remove('bg-white', 'text-dark-surface', 'font-bold');
        ref.classList.add('text-white/70');
      }
    });
  }

  private orchestrateUpdate() {
    // 1. Shimmer out
    this.priceNodes.forEach(({ valRef, symbolRef }) => {
      valRef.style.opacity = '0';
      valRef.style.transform = 'translateY(-6px)';
      symbolRef.style.opacity = '0';
    });

    // 2. Compute & Update DOM & Shimmer in
    setTimeout(() => {
      this.priceNodes.forEach(node => this.updateSingleNode(node));
      
      requestAnimationFrame(() => {
        this.priceNodes.forEach(({ valRef, symbolRef }) => {
          valRef.style.opacity = '1';
          valRef.style.transform = 'translateY(0)';
          symbolRef.style.opacity = '1';
        });
      });
    }, 150); // micro-interaction timing

    this.updateControls();
  }
}

const pricingEngine = new PricingStateEngine();

// ==========================================
// REACT COMPONENTS
// ==========================================

const PricingControls = () => {
  const monRef = useRef<HTMLButtonElement>(null);
  const annRef = useRef<HTMLButtonElement>(null);
  const usdRef = useRef<HTMLButtonElement>(null);
  const eurRef = useRef<HTMLButtonElement>(null);
  const inrRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const unsubs = [
      pricingEngine.registerControlNode('billing', 'Monthly', monRef.current!),
      pricingEngine.registerControlNode('billing', 'Annual', annRef.current!),
      pricingEngine.registerControlNode('currency', 'USD', usdRef.current!),
      pricingEngine.registerControlNode('currency', 'EUR', eurRef.current!),
      pricingEngine.registerControlNode('currency', 'INR', inrRef.current!),
    ];
    return () => unsubs.forEach(fn => fn());
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 mb-16 pt-8 border-t border-white/10" role="toolbar" aria-label="Pricing controls">
      <div className="flex bg-white/5 p-1 rounded-full border border-white/10 pricing-toggle-track">
        <button
          ref={monRef}
          className="pricing-toggle-btn rounded-full px-8 py-3 font-semibold text-sm transition-all"
          onClick={() => pricingEngine.setBilling('Monthly')}
          aria-label="Monthly billing"
        >
          Monthly
        </button>
        <button
          ref={annRef}
          className="pricing-toggle-btn rounded-full px-8 py-3 font-semibold text-sm transition-all flex items-center gap-2"
          onClick={() => pricingEngine.setBilling('Annual')}
          aria-label="Annual billing with 20% discount"
        >
          Annual <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-accent-yellow text-dark-surface">-20%</span>
        </button>
      </div>

      <div className="flex bg-white/5 p-1 rounded-full border border-white/10 pricing-toggle-track md:ml-auto">
        <button ref={usdRef} className="pricing-toggle-btn rounded-full px-6 py-3 font-semibold text-sm transition-all" onClick={() => pricingEngine.setCurrency('USD')}>USD</button>
        <button ref={eurRef} className="pricing-toggle-btn rounded-full px-6 py-3 font-semibold text-sm transition-all" onClick={() => pricingEngine.setCurrency('EUR')}>EUR</button>
        <button ref={inrRef} className="pricing-toggle-btn rounded-full px-6 py-3 font-semibold text-sm transition-all" onClick={() => pricingEngine.setCurrency('INR')}>INR</button>
      </div>
    </div>
  );
};

const PriceDisplay = ({ baseRate, isDark }: { baseRate: number, isDark?: boolean }) => {
  const symbolRef = useRef<HTMLSpanElement>(null);
  const valRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (symbolRef.current && valRef.current) {
      const unsub = pricingEngine.registerPriceNode(baseRate, symbolRef.current, valRef.current);
      return () => {
        unsub();
      };
    }
  }, [baseRate]);

  return (
    <div className="my-8 h-16 flex items-baseline gap-1" aria-live="polite">
      <span ref={symbolRef} className={`text-3xl font-bold transition-opacity duration-200 ${isDark ? 'text-accent-yellow' : 'text-primary-brand'}`}>$</span>
      <span ref={valRef} className={`text-6xl font-extrabold tracking-tighter price-value ${isDark ? 'text-white' : 'text-dark-surface'}`}>
        {baseRate}
      </span>
      <span className={`text-sm uppercase tracking-widest font-semibold ml-2 ${isDark ? 'text-white/50' : 'text-dark-surface/50'}`}>/mo</span>
    </div>
  );
};

const PricingCard = React.memo(({ title, baseRate, features, isPopular }: { title: string, baseRate: number, features: string[], isPopular?: boolean }) => {
  const cardBg = isPopular ? 'bg-dark-surface border-dark-surface' : 'bg-white border-dark-surface/10';
  const titleColor = isPopular ? 'text-white' : 'text-dark-surface';
  const featureColor = isPopular ? 'text-white' : 'text-dark-surface/80';
  const checkColor = isPopular ? 'text-accent-yellow' : 'text-primary-brand';

  return (
    <article className={`p-10 flex flex-col h-full border rounded-3xl card-premium ${cardBg} ${isPopular ? 'shadow-2xl lg:scale-105 z-10' : 'shadow-lg'}`}>
      {isPopular && (
        <div className="inline-block bg-accent-yellow text-dark-surface text-xs font-bold uppercase tracking-widest py-1 px-4 mb-6 self-start rounded-full">
          Enterprise Recommended
        </div>
      )}
      <h3 className={`text-3xl font-bold tracking-tight ${titleColor} ${!isPopular && 'mt-8'}`}>{title}</h3>
      <PriceDisplay baseRate={baseRate} isDark={isPopular} />
      
      <div className={`w-full h-px mb-8 ${isPopular ? 'bg-white/10' : 'bg-dark-surface/10'}`} aria-hidden="true"></div>

      <ul className="space-y-5 mb-12 flex-1" aria-label={`Features for ${title} plan`}>
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-4">
            <svg className={`w-6 h-6 shrink-0 ${checkColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className={`text-lg font-medium ${featureColor}`}>{feature}</span>
          </li>
        ))}
      </ul>
      
      <button className={`w-full h-14 font-bold uppercase tracking-widest text-sm rounded-xl btn-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-yellow shadow-md hover:shadow-xl ${isPopular ? 'bg-accent-yellow text-dark-surface hover:bg-white' : 'bg-primary-bg text-dark-surface hover:bg-dark-surface hover:text-white border border-dark-surface/10'}`}>
        Begin Deployment
      </button>
    </article>
  );
});

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-32 bg-primary-bg" aria-labelledby="pricing-heading">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-brand/10 text-primary-brand font-semibold text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-brand animate-pulse"></span>
            Transparent Economics
          </div>
          <h2 id="pricing-heading" className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-dark-surface text-center">
            Infinite Scale, Predictable Cost
          </h2>
        </div>

        <div className="bg-dark-surface rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-brand/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <PricingControls />

          <div className="grid grid-cols-1 lg:grid-cols-3 items-center pt-8 gap-y-12 lg:gap-y-0 lg:gap-x-8 relative z-10">
            {CONFIG_MATRIX.plans.map(plan => (
              <PricingCard 
                key={plan.id}
                title={plan.title}
                baseRate={plan.baseRate}
                features={plan.features}
                isPopular={plan.isPopular}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
