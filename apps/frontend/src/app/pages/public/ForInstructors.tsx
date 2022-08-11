import { Box } from '@mui/material';
import { BusinessSection } from './fragments/BusinessSection';
import { Footer } from './fragments/Footer';
import { Header } from './fragments/Header';
import TeacherHero from './fragments/TeacherHero';

export default function ForInstructors() {
  return (
    <Box>
      <Header />
      <TeacherHero></TeacherHero>
      <BusinessSection></BusinessSection>
      <Footer />
    </Box>
  );
}
