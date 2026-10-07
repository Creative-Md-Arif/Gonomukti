import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import { AuthProvider } from "@/context/AuthContext";
import Home from "@/pages/Home";

const AboutOverview = lazy(() =>
  import("@/pages/About").then((m) => ({ default: m.AboutOverview })),
);
const AboutMissionVision = lazy(() =>
  import("@/pages/About").then((m) => ({ default: m.AboutMissionVision })),
);
const AboutLeadership = lazy(() =>
  import("@/pages/About").then((m) => ({ default: m.AboutLeadership })),
);
const AboutCeoSpeech = lazy(() =>
  import("@/pages/About").then((m) => ({ default: m.AboutCeoSpeech })),
);
const ProjectsList = lazy(() =>
  import("@/pages/Projects").then((m) => ({ default: m.ProjectsList })),
);
const ProjectDetails = lazy(() =>
  import("@/pages/Projects").then((m) => ({ default: m.ProjectDetails })),
);
const Gallery = lazy(() => import("@/pages/Gallery"));
const Contact = lazy(() => import("@/pages/Contact"));
const Admin = lazy(() => import("@/pages/Admin"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function PageFallback() {
  return <div className="min-h-screen" aria-busy="true" aria-live="polite" />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/*"
              element={
                <Layout>
                  <Suspense fallback={<PageFallback />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route
                        path="/about/overview"
                        element={<AboutOverview />}
                      />
                      <Route
                        path="/about/mission-vision"
                        element={<AboutMissionVision />}
                      />
                      <Route
                        path="/about/leadership"
                        element={<AboutLeadership />}
                      />
                      <Route
                        path="/about/ceo-speech"
                        element={<AboutCeoSpeech />}
                      />
                      <Route path="/projects" element={<ProjectsList />} />
                      <Route
                        path="/projects/:slug"
                        element={<ProjectDetails />}
                      />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </Layout>
              }
            />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
