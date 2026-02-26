import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { InfrastructureSection } from "@/components/landing/InfrastructureSection";
import { ChainsSection } from "@/components/landing/ChainsSection";
import { PrinciplesSection } from "@/components/landing/PrinciplesSection";
import { BuildersSection } from "@/components/landing/BuildersSection";
import { ProofSection } from "@/components/landing/ProofSection";
import { TeamSection } from "@/components/landing/TeamSection";
import { LabNotesSection } from "@/components/landing/LabNotesSection";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ProblemSection />
        <InfrastructureSection />
        <ChainsSection />
        <PrinciplesSection />
        <BuildersSection />
        <ProofSection />
        <TeamSection />
        <LabNotesSection />
      </main>
      <Footer />
    </div>
  );
}
