import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, MapPin, Phone, Ruler, ArrowRight } from 'lucide-react';
import { AREA_REGIONS } from '../../data/areas.js';
import { BUSINESS, formatPhoneTel } from '../../data/business.js';
import { SERVICES } from '../../data/services.js';
import { submitQuoteRequest, validateQuoteRequest } from '../../services/quote.js';
import { useSeo } from '../../lib/seo';
import { PageHero } from '../../components/layout/PageHero';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { ChipToggle } from '../../components/ui/ChipToggle';
import { DatePicker } from '../../components/ui/DatePicker';
import { Button } from '../../components/ui/Button';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service');
  const initialStyle = searchParams.get('style') || '';
  const initialTown = searchParams.get('town') || '';
  const initialSymptom = searchParams.get('symptom') || '';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [town, setTown] = useState(initialTown);
  const [selectedServices, setSelectedServices] = useState<string[]>(() =>
    initialService ? [initialService] : []
  );
  const [contactMethod, setContactMethod] = useState<'phone' | 'text' | 'email'>('phone');
  const [preferredDate, setPreferredDate] = useState('');
  const [pickedStyle, setPickedStyle] = useState(initialStyle);
  const [message, setMessage] = useState(() =>
    initialSymptom ? `Door symptom: ${initialSymptom}` : ''
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useSeo({
    title: 'Request a Free Estimate | Crossroads Garage & Fence Co.',
    description:
      'Request a free on-site measurement and itemized quote for garage door repair, new garage doors, or custom fencing across Lafayette, Avon, and Central Indiana.',
    path: '/contact',
  });

  const townGroups = useMemo(
    () => [
      ...AREA_REGIONS.map((r) => ({ label: r.name, options: r.towns })),
      { label: 'Other Nearby Indiana Town', options: ['Other Central / NW Indiana Town'] },
    ],
    []
  );

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      phone,
      email,
      town,
      services: selectedServices,
      contactMethod,
      preferredDate,
      pickedStyle,
      message,
    };
    const nextErrors = validateQuoteRequest(payload);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await submitQuoteRequest(payload);
      setSubmittedRef(res.referenceId);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        imageKey="heroHome"
        kicker="Free On-Site Measurements · Lafayette & Avon"
        title="Get a free"
        italicAccent="estimate."
        subtitle="Tell us what needs repair or measuring. We provide clear, itemized on-site quotes across Greater Indianapolis and Central & Northwest Indiana."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Free Estimate' }]}
        ctaLabel="Jump to Request Form"
        ctaTo="/contact#estimate-form"
      />

      <section id="estimate-form" className="surface-cream section-pad">
        <div className="container-arch grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Form */}
          <div className="lg:col-span-7">
            {submittedRef ? (
              <div className="reg-frame p-8 bg-[var(--color-charcoal)] text-[var(--color-cream)] border border-[rgba(243,237,226,0.2)] rounded-[var(--radius-xs)] space-y-5">
                <div className="flex items-center gap-3 text-[var(--color-rust-light)]">
                  <CheckCircle2 size={28} />
                  <span className="font-mono-spec text-[0.78rem] uppercase tracking-[0.1em]">
                    Request Logged · Ref {submittedRef}
                  </span>
                </div>
                <h2 className="h-section text-[var(--color-cream)]">
                  Thanks, {name}. Your estimate request is ready.
                </h2>
                <p className="lead-copy text-[var(--color-paper)]">
                  We noted your request for{' '}
                  <strong className="text-[var(--color-cream)]">{town}</strong> via preferred
                  contact (<span className="uppercase font-mono-spec">{contactMethod}</span>).
                  {pickedStyle && ` Selected style: ${pickedStyle}.`}
                </p>
                <div className="p-4 bg-[rgba(243,237,226,0.06)] border border-[rgba(243,237,226,0.14)] rounded-[var(--radius-xs)] text-[0.9rem] text-[var(--color-paper)] space-y-1">
                  <p>
                    <strong className="text-[var(--color-cream)]">What happens next:</strong> An
                    estimator from our nearest Lafayette or Avon hub reviews your details to
                    schedule your free on-site measurement or repair diagnostic.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    variant="light"
                    onClick={() => {
                      setSubmittedRef(null);
                      setMessage('');
                    }}
                  >
                    Submit Another Request
                  </Button>
                  <Button to="/" variant="outline-on-dark">
                    Return Home
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="reg-frame p-6 sm:p-8 bg-[var(--color-paper)] border border-[rgba(28,27,26,0.22)] rounded-[var(--radius-xs)] space-y-6"
              >
                <div className="pb-4 border-b border-[rgba(28,27,26,0.14)]">
                  <span className="font-mono-spec text-[0.74rem] uppercase tracking-[0.09em] text-[var(--color-rust)] block">
                    Estimate Intake Sheet
                  </span>
                  <h2 className="h-sub text-[var(--color-charcoal)] mt-1">
                    Request your free on-site measurement or repair visit
                  </h2>
                </div>

                {(pickedStyle || initialSymptom) && (
                  <div className="p-3.5 bg-[var(--color-charcoal)] text-[var(--color-cream)] rounded-[var(--radius-xs)] flex flex-wrap items-center justify-between gap-2 text-[0.875rem]">
                    <span>
                      <strong className="text-[var(--color-rust-light)] font-mono-spec text-[0.72rem] uppercase mr-2">
                        Prefilled Spec:
                      </strong>
                      {pickedStyle || initialSymptom}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPickedStyle('')}
                      className="font-mono-spec text-[0.7rem] text-[var(--color-steel-light)] hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                    autoComplete="name"
                  />
                  <Select
                    label="City / Town"
                    required
                    value={town}
                    onChange={setTown}
                    groups={townGroups}
                    placeholder="Choose your Indiana town"
                    error={errors.town}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={errors.phone || errors.contact}
                    autoComplete="tel"
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    autoComplete="email"
                  />
                </div>

                {/* Service Multi-Select Chips */}
                <div>
                  <span className="font-mono-spec text-[0.72rem] uppercase tracking-[0.08em] text-[var(--color-charcoal)] block mb-2.5">
                    Services Needed *
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {SERVICES.map((s) => (
                      <ChipToggle
                        key={s.id}
                        code={s.index}
                        label={s.title}
                        selected={selectedServices.includes(s.id)}
                        onClick={() => toggleService(s.id)}
                      />
                    ))}
                  </div>
                  {errors.services && (
                    <p className="mt-1.5 text-[0.8rem] text-[#9B2C1E] font-medium">
                      {errors.services}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                  <div>
                    <span className="font-mono-spec text-[0.72rem] uppercase tracking-[0.08em] text-[var(--color-charcoal)] block mb-2">
                      Preferred Contact Method
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {(['phone', 'text', 'email'] as const).map((method) => (
                        <ChipToggle
                          key={method}
                          label={method === 'phone' ? 'Phone Call' : method === 'text' ? 'Text' : 'Email'}
                          selected={contactMethod === method}
                          onClick={() => setContactMethod(method)}
                        />
                      ))}
                    </div>
                  </div>

                  <DatePicker
                    label="Preferred Visit Date"
                    value={preferredDate}
                    onChange={setPreferredDate}
                  />
                </div>

                <Input
                  label="Door or Fence Style Picked (Optional)"
                  value={pickedStyle}
                  onChange={(e) => setPickedStyle(e.target.value)}
                  hint="Auto-filled if you used the Style Explorer."
                />

                <Textarea
                  label="Project Notes, Door Symptoms, or Approximate Fence Length"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="font-mono-spec text-[0.72rem] text-[var(--color-steel-dark)]">
                    Free on-site measurements · Itemized quotes · No unnecessary upsells
                  </p>
                  <Button type="submit" size="lg" disabled={submitting}>
                    <span>{submitting ? 'Sending Request...' : 'Request Free Estimate'}</span>
                    <ArrowRight size={17} />
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Hubs, Measurement Promise, FAQ Teaser */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-[var(--color-charcoal)] text-[var(--color-cream)] rounded-[var(--radius-xs)] space-y-4">
              <div className="flex items-center gap-2.5 text-[var(--color-rust-light)]">
                <Ruler size={18} />
                <span className="font-mono-spec text-[0.74rem] uppercase tracking-[0.08em]">
                  Free On-Site Measurement Promise
                </span>
              </div>
              <h3 className="font-display font-bold text-[1.25rem]">
                Accurate measurements before any work starts.
              </h3>
              <p className="text-[0.94rem] text-[var(--color-paper)] leading-relaxed">
                We measure jamb framing, headroom, torsion assemblies, or backyard fence runs right
                on your property so your itemized quote holds up from day one.
              </p>
              {BUSINESS.phone && (
                <Button
                  href={formatPhoneTel(BUSINESS.phone)}
                  variant="outline-on-dark"
                  size="md"
                  className="w-full"
                >
                  <Phone size={15} /> Call {BUSINESS.phone}
                </Button>
              )}
            </div>

            <div className="p-6 bg-[var(--color-paper)] border border-[rgba(28,27,26,0.2)] rounded-[var(--radius-xs)] space-y-4">
              <span className="font-mono-spec text-[0.74rem] uppercase tracking-[0.08em] text-[var(--color-rust)] block">
                Dual Indiana Operations
              </span>
              {BUSINESS.hubs.map((hub) => (
                <div
                  key={hub.id}
                  className="pt-3 first:pt-0 border-t first:border-t-0 border-[rgba(28,27,26,0.12)]"
                >
                  <Link
                    to={hub.route}
                    className="font-display font-bold text-[1.08rem] text-[var(--color-charcoal)] hover:text-[var(--color-rust)] flex items-center gap-2"
                  >
                    <MapPin size={15} className="text-[var(--color-rust)]" />
                    <span>
                      {hub.city}, {hub.state} Hub
                    </span>
                  </Link>
                  <p className="text-[0.875rem] text-[var(--color-steel-dark)] mt-1">
                    {hub.summary}
                  </p>
                </div>
              ))}
              <p className="text-[0.85rem] text-[var(--color-charcoal)] pt-2 border-t border-[rgba(28,27,26,0.12)]">
                {BUSINESS.serves}
              </p>
            </div>

            <div className="p-6 border border-[rgba(28,27,26,0.2)] rounded-[var(--radius-xs)] space-y-3">
              <span className="font-mono-spec text-[0.72rem] uppercase text-[var(--color-rust)] block">
                Quick Answers
              </span>
              <p className="font-semibold text-[0.98rem] text-[var(--color-charcoal)]">
                How fast can you fix a broken garage door spring?
              </p>
              <p className="text-[0.88rem] text-[var(--color-steel-dark)] leading-relaxed">
                We stock standard residential torsion and extension springs on our service trucks
                so most spring repairs are completed in a single visit.
              </p>
              <Link
                to="/faq"
                className="inline-flex items-center gap-1.5 font-mono-spec text-[0.74rem] uppercase text-[var(--color-rust)] hover:underline"
              >
                Read All 20 FAQs <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
