import dynamic from "next/dynamic";
import Reveal from "@/components/ui/Reveal";
import LeadIntro from "@/components/landing/LeadIntro";

const LeadForm = dynamic(() => import("@/components/landing/LeadForm"));

export default function LeadSection() {
  return (
    <section id="lead" className="scroll-mt-24 border-t border-gray-200">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid items-stretch gap-5 lg:grid-cols-2">
          <LeadIntro />
          <Reveal delay={100} className="h-full">
            <div className="flex h-full flex-col justify-center border border-gray-200 bg-white p-8 sm:p-10 card-r-md">
              <LeadForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
