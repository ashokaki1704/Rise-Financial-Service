const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus({ state: 'submitting', message: '' });

  try {
    const res = await fetch('/api/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(form),
    });

    // Read response as text first
    const responseText = await res.text();

    let data = {};

    // Try to parse JSON only when possible
    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      console.error('Server returned non-JSON response:', responseText);

      throw new Error(
        'The application server is not configured correctly.'
      );
    }

    if (!res.ok) {
      throw new Error(data.message || 'Submission failed');
    }

    setStatus({
      state: 'success',
      message:
        'Thank you. Your requirement has been saved to our records and our team will contact you shortly.',
    });

    setTimeout(() => {
      setForm(initialForm);
      setStatus({ state: 'idle', message: '' });
    }, 3000);

  } catch (err) {
    console.error('Application submission error:', err);

    setStatus({
      state: 'error',
      message: `Sorry, something went wrong (${err.message}). Please try again or call us directly.`,
    });
  }
};
