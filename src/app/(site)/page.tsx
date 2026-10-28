/**
 * PolicyHawk marketing home page.
 */

import {
  CaseStudiesSection,
  DemoCtaSection,
  HeroSection,
  HomeClosingCta,
  HowItWorksTeaser,
  LogoStrip,
  ProblemSection,
  SolutionSection,
  TrackedCompaniesPreview,
} from "@/components/marketing/home-sections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoStrip />
      <ProblemSection />
      <SolutionSection />
      <TrackedCompaniesPreview />
      <HowItWorksTeaser />
      <CaseStudiesSection />
      <DemoCtaSection />
      <HomeClosingCta />
    </>
  );
}
