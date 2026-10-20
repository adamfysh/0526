/* Email gate for the PRI explorer. Loaded only when COMMERCIAL is true. */
(function initGate() {
    const GATE_KEY = 'narrows_pri_access';
    const LOOPS_FORM_ID = 'cmpfr589400le0jwr5mkw40v6'; // ← replace with your Loops form ID
    const EXPIRY_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

    const gate = document.getElementById('pri-gate');
    const form = document.getElementById('pri-gate-form');
    const btn  = document.getElementById('pri-gate-btn');
    const err  = document.getElementById('pri-gate-error');

    console.log('[PRI Gate] init – gate:', !!gate, 'form:', !!form, 'btn:', !!btn);
    if (!gate || !form || !btn) { console.error('[PRI Gate] missing elements'); return; }

    // Check if already unlocked
    let stored = null;
    try { stored = localStorage.getItem(GATE_KEY); } catch(e) { console.warn('[PRI Gate] localStorage read error:', e); }
    if (stored && (Date.now() - parseInt(stored, 10)) < EXPIRY_MS) {
      console.log('[PRI Gate] already unlocked');
      gate.classList.add('hidden');
      return;
    }

    console.log('[PRI Gate] showing gate');
    gate.classList.remove('hidden');

    function grantAccess() {
      console.log('[PRI Gate] grantAccess called');
      try { localStorage.setItem(GATE_KEY, Date.now().toString()); } catch(e) {}
      gate.classList.add('dismissing');
      setTimeout(() => gate.classList.add('hidden'), 420);
    }

    form.addEventListener('submit', function(e) {
      console.log('[PRI Gate] submit fired');
      e.preventDefault();

      const emailEl   = document.getElementById('pri-gate-email');
      const companyEl = document.getElementById('pri-gate-company');
      const email     = emailEl.value.trim();

      // Basic format check
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailEl.style.borderColor = '#c0392b';
        emailEl.focus();
        return;
      }
      emailEl.style.borderColor = '';

      // Grant access immediately – never block on API response
      grantAccess();

      // Send to Loops in background (fire and forget)
      if (LOOPS_FORM_ID && LOOPS_FORM_ID !== 'YOUR_LOOPS_FORM_ID') {
        const payload = new URLSearchParams({ email });
        if (companyEl && companyEl.value.trim()) {
          payload.set('company', companyEl.value.trim());
        }
        fetch(`https://app.loops.so/api/newsletter-form/${LOOPS_FORM_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: payload.toString(),
        }).catch(function() {});
      }
    });
  })();
