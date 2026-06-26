import { useState, useEffect } from 'react';
import { 
  ArrowPathIcon, 
  SearchIcon, 
  ArrowTrendingUpIcon, 
  Cog8ToothIcon, 
  ChartPieIcon, 
  EyeIcon,
  ChevronDownIcon
} from '../Icons';

const features = [
  {
    id: 1,
    title: 'UNIFIED DATA STREAMS',
    description: 'Connect CRM, ERP, finance systems, spreadsheets, databases, and APIs into a single intelligent flow.',
    cols: [
      { label: 'CAPABILITY', value: 'Real-time Ingestion' },
      { label: 'LATENCY', value: 'Sub-millisecond' },
      { label: 'SCALE', value: 'Petabyte-scale' }
    ],
    badge: 'LIVE STREAMS',
    icon: 'stream'
  },
  {
    id: 2,
    title: 'INTELLIGENT SIGNAL DETECTION',
    description: 'Automatically identify anomalies, opportunities, risks, and hidden patterns before they impact business performance.',
    cols: [
      { label: 'CAPABILITY', value: 'Anomaly Recognition' },
      { label: 'PRECISION', value: '99.9% Accuracy' },
      { label: 'MONITORING', value: 'Continuous 24/7' }
    ],
    badge: 'ANOMALY ALERTS',
    icon: 'signal'
  },
  {
    id: 3,
    title: 'PREDICTIVE INTELLIGENCE',
    description: 'Forecast revenue, customer behavior, operational demand, and future outcomes using continuously evolving models.',
    cols: [
      { label: 'CAPABILITY', value: 'Forecast Modeling' },
      { label: 'ENGINE', value: 'Deep Learning' },
      { label: 'IMPACT', value: 'Proactive Mitigation' }
    ],
    badge: 'AI FORECASTING',
    icon: 'trend'
  },
  {
    id: 4,
    title: 'AUTONOMOUS WORKFLOWS',
    description: 'Allow AI agents to execute repetitive operational tasks, approvals, notifications, and actions automatically.',
    cols: [
      { label: 'CAPABILITY', value: 'Process Automation' },
      { label: 'EXECUTION', value: 'Zero-touch' },
      { label: 'INTEGRATION', value: 'API-first' }
    ],
    badge: 'AGENT ACTIONS',
    icon: 'cog'
  },
  {
    id: 5,
    title: 'OPERATIONAL AWARENESS',
    description: 'Continuously monitor business systems, workflows, and performance from a centralized intelligence layer.',
    cols: [
      { label: 'CAPABILITY', value: 'Live Dashboards' },
      { label: 'VISIBILITY', value: 'Global' },
      { label: 'REPORTING', value: 'Customizable' }
    ],
    badge: 'REALTIME OBS',
    icon: 'pie'
  },
  {
    id: 6,
    title: 'ENTERPRISE GOVERNANCE',
    description: 'Built-in compliance controls, audit trails, permissions, and security frameworks for enterprise-scale operations.',
    cols: [
      { label: 'CAPABILITY', value: 'Access Control' },
      { label: 'COMPLIANCE', value: 'SOC2 / HIPAA' },
      { label: 'AUDIT', value: 'Immutable Logs' }
    ],
    badge: 'SOC2 / HIPAA',
    icon: 'shield'
  }
];

const FeatureIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'stream':
      return <ArrowPathIcon className={className} />;
    case 'signal':
      return <SearchIcon className={className} />;
    case 'trend':
      return <ArrowTrendingUpIcon className={className} />;
    case 'cog':
      return <Cog8ToothIcon className={className} />;
    case 'pie':
      return <ChartPieIcon className={className} />;
    case 'shield':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    default:
      return null;
  }
};

export const FeatureShowcase = () => {
  // Shared Active Index State for Context Lock Constraint
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [revealedIds, setRevealedIds] = useState<number[]>([]);
  const [pixelatingId, setPixelatingId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // programmatic context lock validation / monitoring on resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
        console.log(`[Context Lock] Viewport threshold crossed. Programmatically transferring index: ${activeIndex} to ${mobile ? 'Mobile Accordion' : 'Desktop Bento Grid'}`);
      }
    };
    
    // Set initial size
    setIsMobile(window.innerWidth < 768);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, activeIndex]);

  const handleToggleDetails = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (pixelatingId === id) return;

    setPixelatingId(id);

    // Halfway point: swap the content representation
    setTimeout(() => {
      setRevealedIds(prev =>
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
    }, 750);

    // End point: remove the pixel overlay
    setTimeout(() => {
      setPixelatingId(null);
    }, 1500);
  };

  return (
    <section className="py-24 md:py-32 bg-primary-bg relative overflow-hidden" id="platform-features">
      {/* Decorative ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-brand/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-20 text-center max-w-4xl mx-auto">
          <h2 className="text-xl md:text-4xl text-dark-surface tracking-tight text-center">
            Real-Time Enterprise Insights
          </h2>
        </div>

        {/* ==================================================== */}
        {/* DESKTOP BENTO-GRID VIEW (768px+)                     */}
        {/* ==================================================== */}
        <div className="hidden md:grid grid-cols-3 gap-6 relative">
          {features.map((feature, idx) => {
            const isRevealed = revealedIds.includes(feature.id);
            const isPixelating = pixelatingId === feature.id;
            const isActive = activeIndex === idx;

            // Define asymmetric grid classes
            const gridSpanClass = (idx === 0 || idx === 3 || idx === 4) 
              ? 'col-span-2' 
              : 'col-span-1';

            return (
              <div
                key={feature.id}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`group relative card-premium rounded-2xl border p-8 flex flex-col justify-between overflow-hidden cursor-pointer min-h-[300px] transition-all duration-300 ${
                  isActive 
                    ? 'border-primary-brand bg-white shadow-lg ring-1 ring-primary-brand scale-[1.01]' 
                    : 'border-black/5 bg-white/50 hover:bg-white/70 hover:border-black/25 opacity-90'
                } ${gridSpanClass}`}
              >
                {/* Pixel Transition Overlay */}
                {isPixelating && (
                  <div
                    className="absolute inset-0 z-50 grid pointer-events-none"
                    style={{ gridTemplateColumns: 'repeat(24, 1fr)', gridTemplateRows: 'repeat(6, 1fr)' }}
                  >
                    {Array.from({ length: 144 }).map((_, i) => {
                      const shades = ['#e0e0e0', '#c0c0c0', '#a0a0a0', '#808080', '#606060', '#404040', '#202020'];
                      const shade = shades[Math.floor(Math.random() * shades.length)];
                      return (
                        <div
                          key={i}
                          className="animate-pixel-fade"
                          style={{
                            backgroundColor: shade,
                            animationDelay: `${Math.random() * 0.4}s`,
                            opacity: 0
                          }}
                        />
                      );
                    })}
                  </div>
                )}

                {/* Card Top: Icon & Badge */}
                <div className="flex justify-between items-center mb-6">
                  <div className={`p-3 rounded-xl transition-colors duration-300 ${isActive ? 'bg-primary-brand/10 text-primary-brand' : 'bg-dark-surface/5 text-dark-surface/70'}`}>
                    <FeatureIcon name={feature.icon} className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${isActive ? 'bg-primary-brand text-white' : 'bg-dark-surface/10 text-dark-surface/80'}`}>
                    {feature.badge}
                  </span>
                </div>

                {/* Card Content Area */}
                <div className="flex-grow flex flex-col justify-start mb-6">
                  <h3 className="text-xl font-mono font-bold text-dark-surface group-hover:text-primary-brand transition-colors mb-3">
                    {feature.title}
                  </h3>
                  
                  {isRevealed ? (
                    <p className="text-sm font-sans font-normal text-dark-surface/80 leading-relaxed">
                      {feature.description}
                    </p>
                  ) : (
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      {feature.cols.map((col, cIdx) => (
                        <div key={cIdx} className="flex flex-col">
                          <span className="text-[9px] font-mono font-bold text-dark-surface/40 tracking-wider uppercase mb-1">
                            {col.label}
                          </span>
                          <span className="text-xs font-sans font-semibold text-dark-surface">
                            {col.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Bottom: Interactive details toggle */}
                <div className="flex justify-end pt-4 border-t border-black/5 mt-auto">
                  <button
                    onClick={(e) => handleToggleDetails(feature.id, e)}
                    className="flex items-center gap-2 text-xs font-mono font-bold text-dark-surface/60 hover:text-primary-brand transition-colors"
                    title={isRevealed ? "Hide details" : "View details"}
                    aria-label={isRevealed ? "Hide details" : "View details"}
                  >
                    <span className="uppercase">{isRevealed ? "Summary" : "Insights"}</span>
                    <EyeIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ==================================================== */}
        {/* MOBILE ACCORDION VIEW (<768px)                       */}
        {/* ==================================================== */}
        <div className="md:hidden flex flex-col gap-4">
          {features.map((feature, idx) => {
            const isRevealed = revealedIds.includes(feature.id);
            const isPixelating = pixelatingId === feature.id;
            const isOpen = activeIndex === idx;

            return (
              <div
                key={feature.id}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-primary-brand bg-white shadow-md' : 'border-black/5 bg-white/50'
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setActiveIndex(isOpen ? -1 : idx)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-lg transition-colors ${isOpen ? 'bg-primary-brand/10 text-primary-brand' : 'bg-dark-surface/5 text-dark-surface/70'}`}>
                      <FeatureIcon name={feature.icon} className="w-5 h-5" />
                    </div>
                    <span className="font-mono font-bold text-sm text-dark-surface leading-tight">
                      {feature.title}
                    </span>
                  </div>
                  <ChevronDownIcon 
                    className={`w-5 h-5 text-dark-surface/50 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-primary-brand' : ''
                    }`} 
                  />
                </button>

                {/* Accordion Content Wrapper */}
                <div
                  className="transition-all duration-300 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: isOpen ? '500px' : '0px',
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <div className="p-6 pt-0 border-t border-black/5 relative">
                    {/* Pixel Transition Overlay */}
                    {isPixelating && (
                      <div
                        className="absolute inset-0 z-50 grid pointer-events-none"
                        style={{ gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'repeat(4, 1fr)' }}
                      >
                        {Array.from({ length: 48 }).map((_, i) => {
                          const shades = ['#e0e0e0', '#c0c0c0', '#a0a0a0', '#808080', '#606060', '#404040', '#202020'];
                          const shade = shades[Math.floor(Math.random() * shades.length)];
                          return (
                            <div
                              key={i}
                              className="animate-pixel-fade"
                              style={{
                                backgroundColor: shade,
                                animationDelay: `${Math.random() * 0.3}s`,
                                opacity: 0
                              }}
                            />
                          );
                        })}
                      </div>
                    )}

                    {/* Metadata Columns */}
                    <div className="grid grid-cols-3 gap-4 mb-4 mt-4">
                      {feature.cols.map((col, cIdx) => (
                        <div key={cIdx} className="flex flex-col">
                          <span className="text-[8px] font-mono font-bold text-dark-surface/40 tracking-wider uppercase mb-1">
                            {col.label}
                          </span>
                          <span className="text-xs font-sans font-semibold text-dark-surface leading-none">
                            {col.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Description Block */}
                    <div className="mt-4">
                      <p className="text-sm font-sans font-normal text-dark-surface/80 leading-relaxed mb-4">
                        {feature.description}
                      </p>
                    </div>

                    {/* Expand/Insights Toggle */}
                    <div className="flex justify-end pt-4 border-t border-black/5">
                      <button
                        onClick={(e) => handleToggleDetails(feature.id, e)}
                        className="flex items-center gap-2 text-xs font-mono font-bold text-dark-surface/60 hover:text-primary-brand transition-colors"
                      >
                        <span className="uppercase">{isRevealed ? "Show Stats" : "Show Deep Insights"}</span>
                        <EyeIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
