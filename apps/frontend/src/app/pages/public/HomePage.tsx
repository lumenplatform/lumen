import { Box } from '@mui/material';
import { BusinessSection } from './fragments/BusinessSection';
import { FeaturedCourses } from './fragments/FeaturedCourses';
import { Footer } from './fragments/Footer';
import { Header } from './fragments/Header';
import { StudentHero } from './fragments/StudentHero';
import { JoinForFree } from './fragments/JoinForFree';
import { StatsSection } from './fragments/StatsSection';

export default function HomePage() {
  return (
    <Box>
      <Header />
      <StudentHero />
      <StatsSection />
      <FeaturedCourses />
      <BusinessSection />
      <JoinForFree />
      <Footer />
    </Box>
  );
}
