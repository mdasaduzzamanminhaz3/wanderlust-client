import { BannerSection } from "@/components/Home/banner-section";
import FeaturedDestinations from "@/components/Home/featured-destinations";
import { WhyChooseUs } from "@/components/Home/whyChooseUs";
import { Testimonials } from "@/components/Home/testimonials";
import { CtaSection } from "@/components/Home/ctaSection";

export default function Home() {
  return (
    <>
      <BannerSection />
      <FeaturedDestinations />
      <WhyChooseUs />
      <Testimonials />
      <CtaSection />
    </>
  );
}
