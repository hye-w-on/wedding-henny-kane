import styled from "@emotion/styled";
import { useRef } from "react";
import ProfileScrollPage from "@/pages/ProfileScrollPage";
import NamePage from "@/pages/NamePage";
import EnvelopePage from "@/pages/EnvelopePage";
import WeddingDayPage from "@/pages/WeddingDayPage";
import LocationPage from "@/pages/LocationPage";
import MainFrame from "@/pages/common/MainFrame";
import TimetablePage from "@/pages/TimetablePage";
import ContactPage from "@/pages/ContactPage";
import PhotoSlideCard from "@/components/PhotoSlideCard";
import OverlayExpandGallery from "@/pages/OverlayExpandGallery";
import FlexExpandGallery from "@/pages/FlexExpandGallery";
import CarouselGallery from "@/pages/CarouselGallery";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  maxWidth: "100vw",
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
  zIndex: 1,
  position: "relative",
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  touchAction: "pan-y",
  "& > div": {
    marginBottom: 0,
    marginTop: 0,
  },
  backgroundColor: "transparent",
});

const PageSection = styled.div({
  margin: 0,
  padding: 0,
  position: "relative",
});

const ScrollScreen: React.FC = () => {
  const nameCardRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const timetableRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <MainFrame
        scrollToSection={scrollToSection}
        refs={{
          nameCardRef,
          profileRef,
          galleryRef,
          locationRef,
          timetableRef,
          envelopeRef,
          contactRef,
        }}
      />
      <Container id="container">
        <PageSection ref={nameCardRef}>
          <NamePage />
        </PageSection>
        <PageSection>
          <WeddingDayPage />
        </PageSection>
        <PageSection>
          <PhotoSlideCard />
        </PageSection>
        <PageSection ref={envelopeRef}>
          <EnvelopePage />
        </PageSection>
        <PageSection ref={locationRef}>
          <LocationPage />
        </PageSection>
        <PageSection ref={timetableRef}>
          <TimetablePage />
        </PageSection>
        <PageSection ref={galleryRef}>
          <OverlayExpandGallery />
        </PageSection>
        <PageSection>
          <FlexExpandGallery />
        </PageSection>
        <PageSection>
          <CarouselGallery />
        </PageSection>
        <PageSection ref={profileRef}>
          <ProfileScrollPage />
        </PageSection>
        <PageSection ref={contactRef}>
          <ContactPage />
        </PageSection>
      </Container>
    </>
  );
};

export default ScrollScreen;
