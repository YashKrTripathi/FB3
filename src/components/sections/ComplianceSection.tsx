import { 
  CubeSolidIcon, 
  Cog8ToothIcon, 
  ArrowPathIcon, 
  SearchIcon, 
  LinkIcon, 
  ChartPieIcon 
} from '../Icons';

const securityFeatures = [
  {
    title: 'End-to-End Encryption',
    description: 'Protect patient records and private data keys with military-grade encryption across every interaction.',
    icon: LinkIcon,
    accent: 'bg-[#FFC801]'
  },
  {
    title: 'Role-Based Access Control',
    description: 'Ensure strict data access controls, allowing permissions only to authorized personnel.',
    icon: SearchIcon,
    accent: 'bg-[#114C5A]'
  },
  {
    title: 'Comprehensive Audit Trails',
    description: 'Maintain permanent logs of actions, updates, and data workflow history for full transparency.',
    icon: ChartPieIcon,
    accent: 'bg-[#FF9932]'
  },
  {
    title: 'Data Governance',
    description: 'Centralized, automated policies ensuring adherence to evolving healthcare compliance protocols.',
    icon: CubeSolidIcon,
    accent: 'bg-white/40'
  },
  {
    title: 'Continuous Monitoring',
    description: 'Detect anomalies and security threats proactively with real-time system monitoring.',
    icon: ArrowPathIcon,
    accent: 'bg-primary-brand'
  },
  {
    title: 'Enterprise Reliability',
    description: 'High-availability infrastructure designed to support mission-critical healthcare workflows.',
    icon: Cog8ToothIcon,
    accent: 'bg-accent-yellow'
  }
];

export const ComplianceSection = () => {
  return (
    <section className="py-24 md:py-32 bg-dark-surface text-white relative overflow-hidden" id="compliance">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-brand/10 rounded-full blur-[100px] pointer-events-none translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-orange/5 rounded-full blur-[80px] pointer-events-none -translate-x-1/4 translate-y-1/4"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Centered one-liner header, no subheadings */}
        <div className="mb-20 text-center max-w-4xl mx-auto">
          <h2 className="text-xl md:text-4xl text-white tracking-tight text-center">
            Security & Compliance Built-In
          </h2>
        </div>

        {/* Premium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx} 
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Accent line */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-dark-surface transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    {/* Small accent line indicator */}
                    <div className={`h-[3px] w-8 rounded-full ${feature.accent} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                  </div>

                  {/* Heading */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-yellow transition-colors font-sans tracking-tight">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 font-sans text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                {/* Accent link styling at bottom */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono font-bold text-white/40 group-hover:text-white/80 transition-colors">
                  <span>HIPAA & SOC-2 CERTIFIED</span>
                  <svg className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
