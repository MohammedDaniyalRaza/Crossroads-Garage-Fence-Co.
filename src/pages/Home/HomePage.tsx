import React from 'react';
import { FAQS } from '../../data/faqs.js';
import { buildFaqSchema, useSeo } from '../../lib/seo';
import { HeroDoorReveal } from '../../components/sections/HeroDoorReveal';
import { TrustStrip } from '../../components/sections/TrustStrip';
import { ServicePanels } from '../../components/sections/ServicePanels';
import { SymptomHelper } from '../../components/sections/SymptomHelper';
import { StyleExplorer } from '../../components/sections/StyleExplorer';
import { ProcessBlueprint } from '../../components/sections/ProcessBlueprint';
import { MaterialsSpec } from '../../components/sections/MaterialsSpec';
import { BeforeAfterSection } from '../../components/sections/BeforeAfterSection';
import { AreaMapSection } from '../../components/sections/AreaMapSection';
import { TestimonialsSection } from '../../components/sections/TestimonialsSection';
import { FaqSection } from '../../components/sections/FaqSection';
import { CtaBand } from '../../components/sections/CtaBand';
import { PicketDivider } from '../../components/svg/PicketDivider';

export default function HomePage() {
  useSeo({
    title: 'Crossroads Garage & Fence Co. | Lafayette, Avon & Indy Metro',
    description:
      'Garage door repair, new garage door installation, and custom wood, vinyl, and aluminum fence construction across Lafayette, Avon, and Central Indiana.',
    path: '/',
    jsonLd: buildFaqSchema(FAQS.filter((f) => f.featured).slice(0, 6)),
  });

  return (
    <>
      <HeroDoorReveal />
      <TrustStrip />
      <ServicePanels />
      <SymptomHelper />
      <StyleExplorer />
      <ProcessBlueprint />
      <MaterialsSpec />
      <PicketDivider topColor="var(--color-cream)" bottomColor="var(--color-charcoal)" />
      <BeforeAfterSection />
      <AreaMapSection />
      <TestimonialsSection limit={6} />
      <FaqSection />
      <CtaBand />
    </>
  );
}
