// Quote request validation and submission service.
// Ready to connect to a backend endpoint or form provider when deployed.

export function validateQuoteRequest(values) {
  const errors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }

  const hasPhone = Boolean(values.phone && values.phone.replace(/\D/g, '').length >= 7);
  const hasEmail = Boolean(values.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()));

  if (!hasPhone && !hasEmail) {
    errors.contact = 'Please provide a valid phone number or email address so we can reach you.';
  }
  if (values.email && values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please check your email address format.';
  }
  if (values.phone && values.phone.trim() && values.phone.replace(/\D/g, '').length < 7) {
    errors.phone = 'Please enter a valid 7- or 10-digit phone number.';
  }

  if (!values.town) {
    errors.town = 'Please select your town or nearest service area.';
  }

  if (!values.services || values.services.length === 0) {
    errors.services = 'Select at least one service you need help with.';
  }

  return errors;
}

export async function submitQuoteRequest(payload) {
  // Structured payload for future API endpoint integration:
  // const endpoint = import.meta.env.VITE_QUOTE_ENDPOINT;
  // if (endpoint) { return fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); }

  const referenceId = `XR-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  await new Promise((resolve) => setTimeout(resolve, 450));

  return {
    ok: true,
    referenceId,
    submittedAt: new Date().toISOString(),
    payload,
  };
}
