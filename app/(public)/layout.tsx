import Header from "@/components/layout/Header";
import PageTransition from "@/components/layout/PageTransition";
import Footer from "@/components/layout/Footer";
import { LayoutGroup } from "framer-motion";
import IntroOverlay from "@/components/layout/IntroOverlay";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutGroup>
      <IntroOverlay />
      <Header />
      <PageTransition>
        {children}
      </PageTransition>
      <Footer />
    </LayoutGroup>
  );
}
