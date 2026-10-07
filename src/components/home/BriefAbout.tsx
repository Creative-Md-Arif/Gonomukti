import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui";
import type { SiteData } from "@/hooks/useSiteData";

export function BriefAbout({
  data,
  header,
}: {
  data: SiteData["briefAbout"];
  header: SiteData["sectionHeaders"]["briefAbout"];
}) {
  return (
    <section className="py-16 sm:py-20 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">
        <Reveal>
          <div className="relative w-full max-w-lg lg:max-w-none mx-auto lg:mx-0">
            <img
              src={data.image}
              alt="Coastal community in Bangladesh"
              className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover"
            />
            {/* Est badge — ছোট স্ক্রিনে ভেতরের দিকে, বড় স্ক্রিনে বাইরে overlap */}
            <div className="absolute -bottom-5 right-3 sm:right-6 md:-bottom-6 md:-right-6 bg-coral-500 text-white rounded-xl md:rounded-2xl p-3.5 sm:p-5 md:p-6 shadow-xl">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold leading-none">
                Est.
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">
                {data.establishedYear}
              </div>
            </div>
            {/* Decorative border — 320px-এ ছোট ও ভেতরের দিকে, যেন overflow না হয় */}
            <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-2 border-ocean-200 rounded-2xl -z-10" />
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div>
            <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-widest text-coral-600 mb-2.5 sm:mb-3">
              {header.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-ocean-950 leading-tight mb-4 sm:mb-6">
              {header.title}
            </h2>
            <p className="text-base sm:text-lg text-ocean-700/80 leading-relaxed mb-6 sm:mb-8">
              {data.text}
            </p>
            <Link
              to="/about/overview"
              className="inline-flex items-center gap-2 rounded-full bg-ocean-600 px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-white hover:bg-ocean-700 transition-all hover:shadow-lg"
            >
              Learn More <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
