import { 
  ArrowPathIcon, 
  LinkIcon, 
  CubeSolidIcon, 
  Cog8ToothIcon, 
  SearchIcon, 
  ChartPieIcon 
} from '../Icons';

const workflows = [
  {
    title: 'Patient Intake & Registration',
    description: 'Reduce paperwork and accelerate onboarding with automated data capture and verification.',
    metricNum: '45%',
    metricText: 'Faster Registration',
    icon: ArrowPathIcon
  },
  {
    title: 'Appointment Coordination',
    description: 'Optimize scheduling, reminders, and patient communication across departments.',
    metricNum: '30%',
    metricText: 'Fewer Patient No-Shows',
    icon: LinkIcon
  },
  {
    title: 'Clinical Documentation',
    description: 'Simplify record management and reduce administrative burden for care teams.',
    metricNum: '2.5h',
    metricText: 'Saved Daily Per Nurse',
    icon: CubeSolidIcon
  },
  {
    title: 'Care Pathway Automation',
    description: 'Standardize treatment workflows while maintaining personalized patient experiences.',
    metricNum: '99%',
    metricText: 'Protocol Adherence',
    icon: Cog8ToothIcon
  },
  {
    title: 'Referral Management',
    description: 'Enable seamless coordination between providers, specialists, and healthcare networks.',
    metricNum: '12d',
    metricText: 'Cycle Time Saved',
    icon: SearchIcon
  },
  {
    title: 'Follow-Up & Engagement',
    description: 'Automate patient outreach, reminders, and post-care communication.',
    metricNum: '60%',
    metricText: 'Higher Response Rate',
    icon: ChartPieIcon
  }
];

export const ClinicalWorkflowsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-surface relative overflow-hidden" id="clinical-workflows">
      {/* Decorative subtle ambient pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#114c5a_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Rephrased and centered heading, NO subheading */}
        <div className="mb-20 text-center max-w-4xl mx-auto">
          <h2 className="text-xl md:text-4xl text-dark-surface tracking-tight text-center">
            Transform Clinical Operations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workflows.map((workflow, idx) => {
            const Icon = workflow.icon;
            return (
              <div 
                key={idx} 
                className="bg-white border border-dark-surface/10 rounded-2xl p-8 shadow-sm hover:shadow-[0_20px_40px_rgba(23,43,54,0.05)] hover:border-primary-brand/30 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between"
              >
                <div>
                  {/* Top row with Icon and decorative metric accent */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-12 h-12 bg-primary-bg rounded-xl flex items-center justify-center text-primary-brand group-hover:bg-primary-brand group-hover:text-white transition-all duration-300 transform group-hover:scale-105 group-hover:rotate-3">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-orange animate-pulse"></span>
                  </div>

                  {/* Large Metric Display with Staggered Hover Effect */}
                  <div className="mb-5 overflow-hidden">
                    <p className="text-4xl font-extrabold text-primary-brand tracking-tight transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                      {workflow.metricNum}
                    </p>
                    <p className="text-xs font-mono font-bold text-accent-orange uppercase tracking-wider mt-1 transition-all duration-300 ease-out delay-75 group-hover:text-accent-orange/90">
                      {workflow.metricText}
                    </p>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-dark-surface mb-3 transition-colors duration-300 group-hover:text-primary-brand font-sans tracking-tight">
                    {workflow.title}
                  </h3>

                  {/* Description with Staggered Transition */}
                  <p className="text-dark-surface/70 font-sans text-sm leading-relaxed transition-all duration-300 delay-100">
                    {workflow.description}
                  </p>
                </div>

                {/* Accent strip on hover */}
                <div className="mt-8 pt-4 border-t border-dark-surface/5 flex items-center justify-end text-xs font-mono font-bold text-primary-brand/60 group-hover:text-primary-brand transition-colors duration-300">
                  <span className="flex items-center gap-1.5">
                    DEPLOYED WORKFLOW
                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
