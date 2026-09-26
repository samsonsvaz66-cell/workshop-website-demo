import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import ResourcePersonSection from './components/ResourcePersonSection';
import WorkshopDetailsSection from './components/WorkshopDetailsSection';
import VenueMapSection from './components/VenueMapSection';
import RegistrationSection from './components/RegistrationSection';
import IntroVideoSection from './components/IntroVideoSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import FinalCTASection from './components/FinalCTASection';
import Footer from './components/Footer';
import workshopData from './data/workshopData';

function App() {
  return (
    <div className="min-h-screen bg-surface-base text-content-primary flex flex-col transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        <HeroSection data={workshopData} />
        <IntroSection data={workshopData} />
        <ResourcePersonSection data={workshopData} />
        <WorkshopDetailsSection data={workshopData} />
        <VenueMapSection data={workshopData} />
        <RegistrationSection data={workshopData} />
        <IntroVideoSection data={workshopData} />
        <TestimonialsSection data={workshopData} />
        <FAQSection data={workshopData} />
        <FinalCTASection data={workshopData} />
      </main>
      <Footer data={workshopData} />
    </div>
  );
}

export default App;
