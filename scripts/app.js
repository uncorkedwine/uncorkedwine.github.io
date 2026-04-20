/* =================================================================
   APP — render page content and animate reveal on scroll
   ================================================================= */
(function () {
  const S = window.SITE;

  /* -------------------- utilities -------------------- */
  const h = (tag, attrs = {}, ...children) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (v === true) el.setAttribute(k, '');
      else if (v !== false && v != null) el.setAttribute(k, v);
    }
    for (const c of children.flat()) {
      if (c == null || c === false) continue;
      el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return el;
  };
  const frag = (...nodes) => {
    const f = document.createDocumentFragment();
    nodes.flat().forEach(n => { if (n != null && n !== false) f.appendChild(typeof n === 'string' ? document.createTextNode(n) : n); });
    return f;
  };
  const rv = (n, d = 0) => { n.classList.add('rv'); if (d) n.classList.add('d' + d); return n; };

  /* -------------------- render -------------------- */
  function render(root) {
    const m = S.manifestos.v3;

    // HERO
    const hero = h('section', { class: 'v3-hero' },
      h('header', { class: 'v3-top' },
        h('span', { class: 'v3-idx' }, '[ 001 ]'),
        h('span', { class: 'v3-brand' }, ' Светлана Орлова'),
        h('nav', { class: 'v3-nav' },
          h('a', { href: '#about' }, 'about'),
          h('a', { href: '#services' }, 'services'),
          h('a', { href: '#publications' }, 'work'),
          h('a', { href: '#contact' }, 'contact'),
        ),
        h('span', { class: 'v3-status' },
          h('span', { class: 'v3-dot' }),
          'Открыта к проектам',
        ),
      ),
      h('div', { class: 'v3-hero-grid' },
        h('div', { class: 'v3-hero-l' },
          rv(h('div', { class: 'v3-kicker' }, m.kicker), 1),
          rv(h('h1', { class: 'v3-display' },
            ...m.title.split('\n').flatMap((line, i, arr) => [
              document.createTextNode(line),
              i < arr.length - 1 ? h('br') : null,
            ]),
          ), 2),
          rv(h('p', { class: 'v3-lede' }, m.lede), 3),
          rv(h('div', { class: 'v3-cta-row' },
            h('a', { class: 'v3-btn primary', href: 'https://t.me/orlsve', target: '_blank', rel: 'noopener' },
              h('span', {}, 'Обсудить проект'),
              h('span', { class: 'v3-btn-ar' }, '→'),
            ),
            h('a', { class: 'v3-btn ghost', href: '#services' }, 'Услуги'),
          ), 4),
        ),
        h('div', { class: 'v3-hero-r rv' },
          h('figure', { class: 'v3-portrait' },
            h('img', { src: S.photo, alt: 'Светлана Орлова' }),
          ),
        ),
      ),
      h('div', { class: 'v3-stats rv' },
        ...S.stats.map(s => h('div', { class: 'v3-stat' },
          h('span', { class: 'v3-stat-n' }, s.n),
          h('span', { class: 'v3-stat-l' }, s.l),
        )),
      ),
    );

    // ABOUT
    const about = h('section', { class: 'v3-section v3-about', id: 'about' },
      rv(h('div', { class: 'v3-sec-head' },
        h('span', { class: 'v3-sec-idx' }, S.about.kicker),
        h('h2', { class: 'v3-h2' }, S.about.headline),
      )),
      h('div', { class: 'v3-about-grid' },
        h('div', { class: 'v3-about-body' },
          ...S.about.body.map((p, i) => rv(h('p', {}, p), (i % 3) + 1)),
        ),
        rv(h('aside', { class: 'v3-creds' },
          h('div', { class: 'v3-creds-head' }, '// Credentials'),
          ...S.about.creds.map((c, i) => h('div', { class: 'v3-cred' },
            h('span', { class: 'v3-cred-n' }, String(i + 1).padStart(2, '0')),
            h('span', { class: 'v3-cred-t' }, c.t),
            h('span', { class: 'v3-cred-s' }, c.s),
          )),
        ), 2),
      ),
    );

    // SERVICES
    const services = h('section', { class: 'v3-section v3-services', id: 'services' },
      rv(h('div', { class: 'v3-sec-head' },
        h('span', { class: 'v3-sec-idx' }, S.services.kicker),
        h('h2', { class: 'v3-h2' }, S.services.headline),
      )),
      h('div', { class: 'v3-svc-grid' },
        ...S.services.items.map((it, i) => rv(h('article', { class: 'v3-svc' },
          h('div', { class: 'v3-svc-head' },
            h('span', { class: 'v3-svc-num' }, '/ ' + it.num),
            h('span', { class: 'v3-svc-tag' }, it.tag),
          ),
          h('h3', { class: 'v3-svc-title' }, it.title),
          h('p', { class: 'v3-svc-body' }, it.body),
          h('div', { class: 'v3-svc-formats' },
            ...it.formats.map(f => h('span', {}, f)),
          ),
        ), (i % 3) + 1)),
      ),
    );

    // PUBLICATIONS
    const pubs = h('section', { class: 'v3-section v3-pubs', id: 'publications' },
      rv(h('div', { class: 'v3-sec-head' },
        h('span', { class: 'v3-sec-idx' }, S.publications.kicker),
        h('h2', { class: 'v3-h2' }, S.publications.headline),
      )),
      h('ul', { class: 'v3-pub-list' },
        ...S.publications.items.map((p, i) => rv(h('li', {},
          h('a', { href: p.href, target: '_blank', rel: 'noopener', class: 'v3-pub' },
            h('span', { class: 'v3-pub-type' }, p.type),
            h('span', { class: 'v3-pub-title' }, p.title),
            h('span', { class: 'v3-pub-outlet' }, p.outlet),
            h('span', { class: 'v3-pub-ar' }, '↗'),
          ),
        ), (i % 3) + 1)),
      ),
    );

    // SAMPLES
    const samples = h('section', { class: 'v3-section v3-samples' },
      rv(h('div', { class: 'v3-sec-head' },
        h('span', { class: 'v3-sec-idx' }, S.samples.kicker),
        h('h2', { class: 'v3-h2' }, S.samples.headline),
      )),
      h('div', { class: 'v3-sample-grid' },
        ...S.samples.items.map((it, i) => rv(h('a', { class: 'v3-sample', href: it.href, target: '_blank', rel: 'noopener' },
          h('div', { class: 'v3-sample-top' },
            h('span', {}, it.type),
            h('span', {}, '→'),
          ),
          h('div', { class: 'v3-sample-title' }, it.title),
        ), (i % 4) + 1)),
      ),
    );

    // EXPERIENCE
    const exp = h('section', { class: 'v3-section v3-exp' },
      rv(h('div', { class: 'v3-sec-head' },
        h('span', { class: 'v3-sec-idx' }, S.experience.kicker),
        h('h2', { class: 'v3-h2' }, S.experience.headline),
      )),
      h('ol', { class: 'v3-tl' },
        ...S.experience.items.map((e, i) => rv(h('li', { class: 'v3-tl-item' },
          h('span', { class: 'v3-tl-years' }, e.years),
          h('div', { class: 'v3-tl-c' },
            h('h3', {}, e.company, h('span', { class: 'v3-tl-city' }, ' — ' + e.city)),
            h('div', { class: 'v3-tl-role' }, e.role),
            h('p', {}, e.body),
          ),
        ), (i % 3) + 1)),
      ),
    );

    // CONTACT
    const contact = h('section', { class: 'v3-section v3-contact', id: 'contact' },
      rv(h('span', { class: 'v3-sec-idx' }, S.contact.kicker)),
      rv(h('h2', { class: 'v3-h2 big' }, S.contact.headline), 1),
      rv(h('p', { class: 'v3-contact-body' }, S.contact.body), 2),
      h('div', { class: 'v3-contact-grid' },
        ...S.contact.links.map((l, i) => rv(h('a', { class: 'v3-clink' + (l.primary ? ' primary' : ''), href: l.href, target: '_blank', rel: 'noopener' },
          h('span', { class: 'v3-clink-label' }, '// ' + l.t),
          h('span', { class: 'v3-clink-value' }, l.v),
          h('span', { class: 'v3-clink-ar' }, '→'),
        ), (i % 4) + 1)),
      ),
      h('footer', { class: 'v3-footer' },
        h('span', {}, '© 2026 · Svetlana Orlova'),
        h('span', {}, 'Belgrade · RU / EN'),
        h('span', {}, 'v.03'),
      ),
    );

    root.appendChild(frag(hero, about, services, pubs, samples, exp, contact));
  }

  /* -------------------- init -------------------- */
  render(document.getElementById('main'));
  document.body.dataset.theme = 'light';

  /* -------------------- reveal on scroll -------------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
  document.querySelectorAll('.rv:not(.in)').forEach(el => io.observe(el));
})();
