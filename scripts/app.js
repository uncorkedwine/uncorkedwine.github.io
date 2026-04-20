/* Reveal-on-scroll — content is static HTML; this only animates it in. */
(function () {
  // Mark elements currently in viewport as revealed BEFORE hiding the rest.
  // This prevents a flash where static content would render visible, then go
  // to opacity 0 when html.js is added, then fade back in.
  // Batch all reads before any writes to avoid forced reflow per iteration.
  const vh = window.innerHeight;
  const all = document.querySelectorAll('.rv');
  const visible = [];
  for (const el of all) {
    const r = el.getBoundingClientRect();
    if (r.top < vh && r.bottom > 0) visible.push(el);
  }
  for (const el of visible) el.classList.add('in');

  document.documentElement.classList.add('js');

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });

  document.querySelectorAll('.rv:not(.in)').forEach((el) => io.observe(el));
})();
