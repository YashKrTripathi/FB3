import { Navbar } from './components/layout/Navbar';
import { SecondaryNav } from './components/layout/SecondaryNav';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { MarqueeSection } from './components/sections/MarqueeSection';
import { FeatureShowcase } from './components/sections/FeatureShowcase';
import { PricingSection } from './components/sections/PricingSection';
import { SocialProofSection } from './components/sections/SocialProofSection';
import { ClinicalWorkflowsSection } from './components/sections/ClinicalWorkflowsSection';
import { ComplianceSection } from './components/sections/ComplianceSection';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-dark-surface bg-primary-bg selection:bg-accent-yellow selection:text-primary-brand">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <MarqueeSection />
        <SecondaryNav />
        <FeatureShowcase />
        <ClinicalWorkflowsSection />
        <PricingSection />
        <SocialProofSection />
        <ComplianceSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
