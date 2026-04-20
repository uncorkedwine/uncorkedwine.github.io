/* Reveal-on-scroll — content is static HTML; this only animates it in. */
(function () {
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
