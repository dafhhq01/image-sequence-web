"use client";

import { SmoothScroll } from "@/utils/lenis";
import SequenceScroll from "@/components/SequenceScroll";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import ContentSections from "@/components/ContentSections";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Preloader />
        <Navbar />
        <SequenceScroll />
        <ContentSections />
      </main>
    </SmoothScroll>
  );
}
