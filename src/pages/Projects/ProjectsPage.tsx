import React, { useState } from 'react';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { PROJECT_CATEGORIES, PROJECTS } from '../../data/projects.js';
import { useSeo } from '../../lib/seo';
import { PageHero } from '../../components/layout/PageHero';
import { ChipToggle } from '../../components/ui/ChipToggle';
import { SmartImage, ImageKey } from '../../components/ui/SmartImage';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { BeforeAfterSection } from '../../components/sections/BeforeAfterSection';
import { CtaBand } from '../../components/sections/CtaBand';

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useSeo({
    title: 'Project Gallery & Before/After | Crossroads Garage & Fence Co.',
    description:
      'Browse sample residential garage door installations, spring and opener repairs, and wood, vinyl, aluminum, and custom gate builds across Indiana.',
    path: '/projects',
  });

  const filtered = PROJECTS.filter((p) =>
    activeCategory === 'All' ? true : p.category === activeCategory
  );

  const selectedProject =
    selectedIndex !== null && filtered[selectedIndex] ? filtered[selectedIndex] : null;

  return (
    <>
      <PageHero
        imageKey="woodGrainGarageDoor"
        kicker="Portfolio · Sample Reference Imagery"
        title="Work built across"
        italicAccent="Central Indiana."
        subtitle="Explore sample project references covering residential garage door upgrades, spring & cable repairs, privacy fences, and custom gates. Filter by trade below."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Projects' }]}
      />

      <section className="surface-cream section-pad border-b border-[var(--line-dark)]">
        <div className="container-arch">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-9">
            <div>
              <p className="spec-kicker text-[var(--color-rust)] mb-2">
                Filter By Trade Category
              </p>
              <h2 className="h-section text-[var(--color-charcoal)]">
                Sample Project Gallery
              </h2>
              <p className="font-mono-spec text-[0.72rem] text-[var(--color-steel-dark)] mt-2">
                Note: Photos shown represent sample project imagery for preview until client job-site photography is uploaded.
              </p>
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
              {PROJECT_CATEGORIES.map((cat) => (
                <ChipToggle
                  key={cat}
                  label={cat}
                  selected={activeCategory === cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setSelectedIndex(null);
                  }}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((project, idx) => (
              <article
                key={project.id}
                className="group bg-[var(--color-paper)] border border-[rgba(28,27,26,0.2)] rounded-[var(--radius-xs)] overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className="relative w-full block text-left cursor-pointer overflow-hidden"
                    aria-label={`Inspect ${project.title} in lightbox`}
                  >
                    <SmartImage
                      imageKey={project.imageKey as ImageKey}
                      aspectRatio="4 / 3"
                      showSampleTag
                      imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-3 right-3 w-9 h-9 bg-[rgba(18,17,16,0.8)] text-[var(--color-cream)] rounded-[var(--radius-xs)] flex items-center justify-center opacity-85 group-hover:bg-[var(--color-rust)] transition-colors">
                      <Maximize2 size={15} />
                    </span>
                  </button>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 font-mono-spec text-[0.72rem] text-[var(--color-rust)]">
                      <span>{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[var(--color-steel-dark)]">{project.town}</span>
                    </div>
                    <h3 className="font-display font-bold text-[1.15rem] text-[var(--color-charcoal)]">
                      {project.title}
                    </h3>
                    <p className="text-[0.92rem] text-[var(--color-steel-dark)] leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3.5 border-t border-[rgba(28,27,26,0.12)] flex items-center justify-between gap-3">
                  <span className="font-mono-spec text-[0.7rem] text-[var(--color-steel-dark)] truncate">
                    {project.specs.join(' · ')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className="btn btn--ghost btn--ghost-light btn--sm font-mono-spec text-[0.72rem] uppercase shrink-0"
                  >
                    Inspect
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BeforeAfterSection />

      <CtaBand />

      {/* Custom Accessible Lightbox */}
      <Modal
        open={Boolean(selectedProject)}
        onClose={() => setSelectedIndex(null)}
        title={
          selectedProject
            ? `${selectedProject.category} · ${selectedProject.town}`
            : ''
        }
        onPrev={
          selectedIndex !== null
            ? () => setSelectedIndex((selectedIndex - 1 + filtered.length) % filtered.length)
            : undefined
        }
        onNext={
          selectedIndex !== null
            ? () => setSelectedIndex((selectedIndex + 1) % filtered.length)
            : undefined
        }
      >
        {selectedProject && (
          <div className="space-y-5">
            <SmartImage
              imageKey={selectedProject.imageKey as ImageKey}
              aspectRatio="16 / 10"
              showSampleTag
              className="rounded-[var(--radius-xs)]"
            />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-8 space-y-2">
                <h3 className="font-display font-bold text-[1.5rem] text-[var(--color-cream)]">
                  {selectedProject.title}
                </h3>
                <p className="text-[0.98rem] text-[var(--color-paper)] leading-relaxed">
                  {selectedProject.summary}
                </p>
              </div>
              <div className="md:col-span-4 space-y-3">
                <span className="font-mono-spec text-[0.7rem] uppercase text-[var(--color-rust-light)] block">
                  Project Specifications
                </span>
                <ul className="space-y-1.5 font-mono-spec text-[0.8rem] text-[var(--color-paper)]">
                  {selectedProject.specs.map((s) => (
                    <li key={s}>+ {s}</li>
                  ))}
                </ul>
                <Button
                  to={`/contact?style=${encodeURIComponent(selectedProject.title)}`}
                  size="sm"
                  className="w-full"
                >
                  <span>Quote Similar Project</span>
                  <ArrowRight size={14} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
