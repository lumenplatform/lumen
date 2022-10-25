import { Box } from '@mui/material';
import { BusinessSection } from './fragments/BusinessSection';
import { Footer } from './fragments/Footer';
import { Header } from './fragments/Header';
import Pricing from './fragments/Pricing';
import TeacherHero from './fragments/TeacherHero';

export default function ForInstructors() {
  return (
    <Box>
      <Header />
      <TeacherHero></TeacherHero>
      <Pricing/>
      <BusinessSection></BusinessSection>
      <Footer />
    </Box>
  );
}
