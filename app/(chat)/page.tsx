import { AiSystemSection } from "@/components/portal/ai-system-section";
import { CareersSection } from "@/components/portal/careers-section";
import { ContactSection } from "@/components/portal/contact-section";
import { CurriculumSection } from "@/components/portal/curriculum-section";
import { FacebookFeedSection } from "@/components/portal/facebook-feed-section";
import { FestivalOverlay } from "@/components/portal/festival-overlay";
import { FloatingChat } from "@/components/portal/floating-chat";
import { HeroSection } from "@/components/portal/hero-section";
import { HomepageStart } from "@/components/portal/homepage-start";
import { PortalNavbar } from "@/components/portal/navbar";
import {
  apiToFacultyMember,
  PersonnelSection,
} from "@/components/portal/personnel-section";
import { PortalFooter } from "@/components/portal/portal-footer";
import type { FacultyMember } from "@/components/portal/types";
import { getAllFaculty } from "@/lib/sqlite";

export default function Page() {
  let initialFaculty: FacultyMember[] = [];
  try {
    const rawFaculty = getAllFaculty();
    initialFaculty = rawFaculty.map(apiToFacultyMember);
  } catch {
    // fallback if SQLite not accessible during build
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-blue-500/20 selection:text-blue-600">
      <HomepageStart />
      <FestivalOverlay />
      <PortalNavbar />
      <HeroSection />
      <FacebookFeedSection />
      <AiSystemSection />
      <CurriculumSection />
      <CareersSection />
      <PersonnelSection initialFaculty={initialFaculty} />
      <ContactSection />
      <PortalFooter />
      <FloatingChat />
    </div>
  );
}
