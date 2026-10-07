import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import { AuthProvider } from '@/context/AuthContext';
import Home from '@/pages/Home';
import { AboutOverview, AboutMissionVision, AboutLeadership, AboutCeoSpeech } from '@/pages/About';
import { ProjectsList, ProjectDetails } from '@/pages/Projects';
import Gallery from '@/pages/Gallery';
import Contact from '@/pages/Contact';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about/overview" element={<AboutOverview />} />
                  <Route path="/about/mission-vision" element={<AboutMissionVision />} />
                  <Route path="/about/leadership" element={<AboutLeadership />} />
                  <Route path="/about/ceo-speech" element={<AboutCeoSpeech />} />
                  <Route path="/projects" element={<ProjectsList />} />
                  <Route path="/projects/:slug" element={<ProjectDetails />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
