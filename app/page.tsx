import dynamic from "next/dynamic";
import { MotionProvider } from "@/components/ui/MotionProvider";
import EmojiProvider from "@/components/ui/EmojiProvider";
import ScrollProgress from "@/components/landing/ScrollProgress";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import ConceptFlow from "@/components/landing/ConceptFlow";
import BentoFeatures from "@/components/landing/BentoFeatures";
import AIFuture from "@/components/landing/AIFuture";
import Experiences from "@/components/landing/Experiences";
import Topics from "@/components/landing/Topics";
import Paths from "@/components/landing/Paths";
import CampaignBanner from "@/components/landing/CampaignBanner";
import Footer from "@/components/landing/Footer";

const PhoneMockup = dynamic(() => import("@/components/landing/PhoneMockup"));
const LeadSection = dynamic(() => import("@/components/landing/LeadSection"));
const FAQ = dynamic(() => import("@/components/landing/FAQ"));

export default function Home() {
  return (
    <MotionProvider>
      <EmojiProvider>
      <div className="flex min-h-screen flex-col bg-white text-black">
        <ScrollProgress />
        <Header />
        <main className="flex-1">
          <Hero />
          <ConceptFlow />
          <BentoFeatures />
          <AIFuture />
          <Experiences />
          <Topics />
          <Paths />
        <CampaignBanner />
        <PhoneMockup />
        <LeadSection />
        <FAQ />
        </main>
        <Footer />
      </div>
      </EmojiProvider>
    </MotionProvider>
  );
}
