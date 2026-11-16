import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProviders } from './providers';
import { RootLayout } from './layout';

const HomePage = lazy(() => import('../pages/Home/HomePage'));
const ServicesOverviewPage = lazy(() => import('../pages/Services/ServicesOverviewPage'));
const ServiceDetailPage = lazy(() => import('../pages/Services/ServiceDetailPage'));
const ProjectsPage = lazy(() => import('../pages/Projects/ProjectsPage'));
const ServiceAreaPage = lazy(() => import('../pages/ServiceArea/ServiceAreaPage'));
const LocationHubPage = lazy(() => import('../pages/Locations/LocationHubPage'));
const AboutPage = lazy(() => import('../pages/About/AboutPage'));
const TestimonialsPage = lazy(() => import('../pages/Testimonials/TestimonialsPage'));
const FaqPage = lazy(() => import('../pages/Faq/FaqPage'));
const ContactPage = lazy(() => import('../pages/Contact/ContactPage'));
const NotFoundPage = lazy(() => import('../pages/NotFound/NotFoundPage'));

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProviders>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesOverviewPage />} />
            <Route
              path="/services/garage-door-repair"
              element={<ServiceDetailPage serviceId="garage-door-repair" />}
            />
            <Route
              path="/services/new-garage-door-installation"
              element={<ServiceDetailPage serviceId="new-garage-door-installation" />}
            />
            <Route
              path="/services/fence-and-gate-construction"
              element={<ServiceDetailPage serviceId="fence-and-gate-construction" />}
            />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/service-area" element={<ServiceAreaPage />} />
            <Route
              path="/locations/lafayette"
              element={<LocationHubPage hubId="lafayette" />}
            />
            <Route
              path="/locations/avon"
              element={<LocationHubPage hubId="avon" />}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AppProviders>
    </BrowserRouter>
  );
};
