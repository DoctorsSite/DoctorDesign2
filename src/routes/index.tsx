import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ClientOnly } from "@/components/portfolio/ClientOnly";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { BackgroundScene } from "@/components/portfolio/BackgroundScene";
import { useThemeInit } from "@/components/portfolio/ThemeToggle";
import {
  TopNav,
  ScrollProgress,
  Loader,
  MouseLight,
  SectionQuestion,
  SectionPatient,
  SectionAnalysis,
  SectionReveal,
  SectionJourney,
  SectionExpertise,
  SectionImpact,
  SectionStories,
  SectionResearch,
  SectionPhilosophy,
  SectionConsultation,
} from "@/components/portfolio/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inside the Doctor's Mind — Dr. Arjun Rao" },
      {
        name: "description",
        content:
          "A cinematic portfolio of Dr. Arjun Rao — Internal Medicine specialist. An interactive journey through how a doctor thinks, observes, and treats people.",
      },
      { property: "og:title", content: "Inside the Doctor's Mind — Dr. Arjun Rao" },
      {
        property: "og:description",
        content:
          "An interactive cinematic journey through the mind of an Internal Medicine specialist.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  useThemeInit();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative bg-background text-foreground noise">
      <Loader done={loaded} />
      <ClientOnly>
        <SmoothScroll />
        <BackgroundScene />
        <MouseLight />
      </ClientOnly>
      <ScrollProgress />
      <TopNav />
      <main className="relative">
        <SectionQuestion />
        <SectionPatient />
        <SectionAnalysis />
        <SectionReveal />
        <SectionJourney />
        <SectionExpertise />
        <SectionImpact />
        <SectionStories />
        <SectionResearch />
        <SectionPhilosophy />
        <div id="consult">
          <SectionConsultation />
        </div>
      </main>
    </div>
  );
}
