import BackToTop from "@/components/BackToTop";
import Checklist from "@/components/Checklist";
import Convoy from "@/components/Convoy";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MobileNav from "@/components/MobileNav";
import Providers from "@/components/Providers";
import ScrollProgress from "@/components/ScrollProgress";
import Spots from "@/components/Spots";
import Timeline from "@/components/Timeline";
import Tips from "@/components/Tips";

export default function Home() {
  return (
    <Providers>
      <main>
        <ScrollProgress />
        <Hero />
        <Convoy />
        <Timeline />
        <Spots />
        <Checklist />
        <Tips />
        <Footer />
        <MobileNav />
        <BackToTop />
      </main>
    </Providers>
  );
}
