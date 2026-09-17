import { MotionProvider } from "@/components/ui/motion";
import EmojiProvider from "@/components/ui/EmojiProvider";
import ScrollProgress from "@/components/landing/ScrollProgress";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import ConceptFlow from "@/components/landing/ConceptFlow";
import BentoFeatures from "@/components/landing/BentoFeatures";
import AiFuture from "@/components/landing/AiFuture";
import Experiences from "@/components/landing/Experiences";
import Topics from "@/components/landing/Topics";
import Paths from "@/components/landing/Paths";
import CampaignBanner from "@/components/landing/CampaignBanner";
import PhoneMockup from "@/components/landing/PhoneMockup";
import Faq from "@/components/landing/Faq";
import LeadForm from "@/components/landing/LeadForm";
import Footer from "@/components/landing/Footer";

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
          <AiFuture />
          <Experiences />
          <Topics />
          <Paths />
        <CampaignBanner />
        <PhoneMockup />
        <Faq />
          <LeadForm />
        </main>
        <Footer />
      </div>
      </EmojiProvider>
    </MotionProvider>
  );
}
