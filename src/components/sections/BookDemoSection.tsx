
export const BookDemoSection = () => {
  return (
    <section className="py-28 md:py-36 bg-gradient-to-br from-primary-brand via-[#17303b] to-dark-surface relative overflow-hidden" id="contact">
      
      {/* Animated floating decoration elements */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(-10deg); }
        }
        .animate-float-1 {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-medium 10s ease-in-out infinite;
        }
      `}</style>

      {/* Decorative background glow rings & elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        {/* Neon green/teal soft glow */}
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary-brand rounded-full blur-[140px]"></div>
        {/* Soft yellow glow */}
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-accent-yellow rounded-full blur-[120px]"></div>
      </div>

      {/* Floating geometric decorators */}
      <div className="absolute top-1/4 left-10 md:left-24 w-12 h-12 border-2 border-white/10 rounded-xl animate-float-1 pointer-events-none hidden sm:block z-0"></div>
      <div className="absolute bottom-1/4 right-10 md:right-24 w-16 h-16 border-2 border-accent-yellow/10 rounded-full animate-float-2 pointer-events-none hidden sm:block z-0"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <div className="max-w-4xl mx-auto bg-white/[0.03] backdrop-blur-md border border-white/10 p-12 md:p-20 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group">
          {/* Subtle inside card glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-brand/10 to-transparent pointer-events-none"></div>

          {/* Centered one-liner heading, no subheadings */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight max-w-2xl mx-auto">
            See Intelligent Healthcare Operations in Action
          </h2>
          
          <p className="text-base md:text-lg text-white/80 font-sans leading-relaxed max-w-2xl mx-auto mb-10">
            Discover how automation, real-time intelligence, and connected workflows can help your organization deliver better outcomes with less operational complexity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-accent-yellow hover:bg-white text-dark-surface hover:text-primary-brand font-mono font-bold uppercase tracking-wider px-10 py-4.5 rounded-full transition-all duration-180 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl w-full sm:w-auto text-sm focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:ring-offset-2 focus:ring-offset-dark-surface">
              Schedule a Personalized Demo
            </button>
          </div>
          
          <p className="text-white/40 font-mono text-xs max-w-md mx-auto mt-8 uppercase tracking-widest">
            Custom setup &bull; SOC-2 Compliant &bull; 15-Minute tour
          </p>
        </div>
      </div>
    </section>
  );
};
