/* =================================================================
   APP — render all 3 variants + wire switcher + tweaks
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

  /* =================================================================
     VARIANT 1 — EDITORIAL (светлый, сериф Fraunces, кремовый)
     ================================================================= */
  function renderV1(root) {
    const m = S.manifestos.v1;

    // HERO
    const hero = h('section', { class: 'v1-hero' },
      h('header', { class: 'v1-top' },
        h('div', { class: 'v1-wordmark' }, 'Svetlana Orlova'),
        h('nav', { class: 'v1-nav' },
          h('a', { href: '#about' }, 'Обо мне'),
          h('a', { href: '#services' }, 'Услуги'),
          h('a', { href: '#publications' }, 'Публикации'),
          h('a', { href: '#contact' }, 'Контакты'),
        ),
        h('div', { class: 'v1-meta' }, 'Том I · №03 · 2026'),
      ),
      h('div', { class: 'v1-hero-grid' },
        h('figure', { class: 'v1-portrait rv' },
          h('img', { src: S.photo, alt: 'Светлана Орлова' }),
          h('figcaption', {},
            h('span', {}, 'фотография'),
            h('span', {}, 'Белград, 2025'),
          ),
        ),
        h('div', { class: 'v1-hero-right' },
          rv(h('div', { class: 'v1-kicker' },
            h('span', { class: 'v1-dot' }),
            m.kicker,
          ), 1),
          rv(h('h1', { class: 'v1-title' },
            ...m.title.split('\n').flatMap((line, i, arr) => [
              document.createTextNode(line),
              i < arr.length - 1 ? h('br') : null,
            ]),
          ), 2),
          rv(h('p', { class: 'v1-lede' }, m.lede), 3),
          rv(h('div', { class: 'v1-cta-row' },
            h('a', { class: 'v1-btn primary', href: 'https://t.me/orlsve' },
              h('span', {}, 'Написать в Telegram'),
              h('span', { class: 'v1-btn-arrow' }, '→'),
            ),
            h('a', { class: 'v1-btn ghost', href: '#services' }, 'Смотреть работы'),
          ), 4),
        ),
      ),
      h('div', { class: 'v1-ticker rv' },
        ...S.stats.flatMap((s, i) => [
          h('div', { class: 'v1-stat' },
            h('span', { class: 'v1-stat-n' }, s.n),
            h('span', { class: 'v1-stat-l' }, s.l),
          ),
          i < S.stats.length - 1 ? h('div', { class: 'v1-stat-sep' }) : null,
        ]),
      ),
    );

    // ABOUT
    const about = h('section', { class: 'v1-about', id: 'about' },
      rv(h('div', { class: 'v1-section-head' },
        h('span', { class: 'v1-kicker-sm' }, S.about.kicker),
        h('h2', { class: 'v1-h2' }, S.about.headline),
      )),
      h('div', { class: 'v1-about-body' },
        h('div', { class: 'v1-about-text' },
          ...S.about.body.map((p, i) => rv(h('p', {}, p), (i % 3) + 1)),
        ),
        h('aside', { class: 'v1-creds rv' },
          h('div', { class: 'v1-creds-label' }, 'Образование и практика'),
          h('ul', {},
            ...S.about.creds.map(c => h('li', {},
              h('span', { class: 'v1-cred-t' }, c.t),
              h('span', { class: 'v1-cred-s' }, c.s),
            )),
          ),
        ),
      ),
    );

    // SERVICES
    const services = h('section', { class: 'v1-services', id: 'services' },
      rv(h('div', { class: 'v1-section-head' },
        h('span', { class: 'v1-kicker-sm' }, S.services.kicker),
        h('h2', { class: 'v1-h2' }, S.services.headline),
      )),
      h('div', { class: 'v1-svc-grid' },
        ...S.services.items.map((it, i) => rv(h('article', { class: 'v1-svc' },
          h('div', { class: 'v1-svc-num' }, it.num),
          h('div', { class: 'v1-svc-tag' }, it.tag),
          h('h3', { class: 'v1-svc-title' }, it.title),
          h('p', { class: 'v1-svc-body' }, it.body),
          h('ul', { class: 'v1-svc-formats' },
            ...it.formats.map(f => h('li', {}, f)),
          ),
        ), (i % 3) + 1)),
      ),
    );

    // PUBLICATIONS
    const publications = h('section', { class: 'v1-publications', id: 'publications' },
      rv(h('div', { class: 'v1-section-head' },
        h('span', { class: 'v1-kicker-sm' }, S.publications.kicker),
        h('h2', { class: 'v1-h2' }, S.publications.headline),
      )),
      h('ul', { class: 'v1-pub-list' },
        ...S.publications.items.map((p, i) => rv(h('li', {},
          h('a', { class: 'v1-pub', href: p.href, target: '_blank', rel: 'noopener' },
            h('span', { class: 'v1-pub-year' }, p.year),
            h('span', { class: 'v1-pub-type' }, p.type),
            h('span', { class: 'v1-pub-title' }, p.title),
            h('span', { class: 'v1-pub-outlet' }, p.outlet),
            h('span', { class: 'v1-pub-arrow' }, '↗'),
          ),
        ), (i % 3) + 1)),
      ),
    );

    // SAMPLES
    const samples = h('section', { class: 'v1-samples' },
      rv(h('div', { class: 'v1-section-head' },
        h('span', { class: 'v1-kicker-sm' }, S.samples.kicker),
        h('h2', { class: 'v1-h2' }, S.samples.headline),
      )),
      h('div', { class: 'v1-sample-grid' },
        ...S.samples.items.map((it, i) => rv(h('a', { class: 'v1-sample', href: it.href, target: '_blank', rel: 'noopener' },
          h('span', { class: 'v1-sample-type' }, it.type),
          h('span', { class: 'v1-sample-title' }, it.title),
          h('span', { class: 'v1-sample-read' }, 'Читать →'),
        ), (i % 4) + 1)),
      ),
    );

    // EXPERIENCE
    const exp = h('section', { class: 'v1-experience' },
      rv(h('div', { class: 'v1-section-head' },
        h('span', { class: 'v1-kicker-sm' }, S.experience.kicker),
        h('h2', { class: 'v1-h2' }, S.experience.headline),
      )),
      h('ol', { class: 'v1-timeline' },
        ...S.experience.items.map((e, i) => rv(h('li', { class: 'v1-tl-item' },
          h('div', { class: 'v1-tl-years' }, e.years),
          h('div', { class: 'v1-tl-body' },
            h('h3', { class: 'v1-tl-company' }, e.company),
            h('div', { class: 'v1-tl-role' }, e.role, h('span', { class: 'v1-tl-city' }, ' · ' + e.city)),
            h('p', { class: 'v1-tl-desc' }, e.body),
          ),
        ), (i % 3) + 1)),
      ),
    );

    // CONTACT
    const contact = h('section', { class: 'v1-contact', id: 'contact' },
      rv(h('div', { class: 'v1-section-head' },
        h('span', { class: 'v1-kicker-sm' }, S.contact.kicker),
        h('h2', { class: 'v1-h2 big' }, S.contact.headline),
      )),
      rv(h('p', { class: 'v1-contact-body' }, S.contact.body), 1),
      h('div', { class: 'v1-contact-links' },
        ...S.contact.links.map((l, i) => rv(h('a', { class: 'v1-clink' + (l.primary ? ' primary' : ''), href: l.href, target: '_blank', rel: 'noopener' },
          h('span', { class: 'v1-clink-label' }, l.t),
          h('span', { class: 'v1-clink-value' }, l.v),
          h('span', { class: 'v1-clink-arrow' }, '→'),
        ), (i % 4) + 1)),
      ),
      h('footer', { class: 'v1-footer' },
        h('span', {}, '© Светлана Орлова · 2026'),
        h('span', {}, 'Белград · Santa Monica 11000'),
      ),
    );

    root.appendChild(frag(hero, about, services, publications, samples, exp, contact));
  }

  /* =================================================================
     VARIANT 2 — CURATOR (тёмный, display serif + mono, охра)
     ================================================================= */
  function renderV2(root) {
    const m = S.manifestos.v2;

    // HERO
    const hero = h('section', { class: 'v2-hero' },
      h('header', { class: 'v2-top' },
        h('div', { class: 'v2-mark' },
          h('span', { class: 'v2-mark-initials' }, 'SO'),
          h('span', { class: 'v2-mark-name' }, 'Svetlana Orlova'),
        ),
        h('nav', { class: 'v2-nav' },
          h('a', { href: '#about' }, '(01) Обо мне'),
          h('a', { href: '#services' }, '(02) Услуги'),
          h('a', { href: '#publications' }, '(03) Публикации'),
          h('a', { href: '#contact' }, '(04) Контакты'),
        ),
        h('a', { class: 'v2-top-cta', href: 'https://t.me/orlsve' }, 'Telegram', h('span', {}, '→')),
      ),
      h('div', { class: 'v2-hero-main' },
        rv(h('div', { class: 'v2-kicker' }, m.kicker), 1),
        rv(h('h1', { class: 'v2-display' },
          ...m.title.split('\n').flatMap((line, i, arr) => [
            document.createTextNode(line),
            i < arr.length - 1 ? h('br') : null,
          ]),
        ), 2),
        h('div', { class: 'v2-hero-split' },
          rv(h('figure', { class: 'v2-portrait' },
            h('img', { src: S.photo, alt: 'Светлана Орлова' }),
            h('figcaption', {}, 'Белград · 2025'),
          ), 3),
          h('div', { class: 'v2-hero-r' },
            rv(h('p', { class: 'v2-lede' }, m.lede), 3),
            rv(h('div', { class: 'v2-meta' },
              h('div', {}, h('span', {}, 'Based in'),    h('strong', {}, 'Белград')),
              h('div', {}, h('span', {}, 'Languages'),   h('strong', {}, 'RU · EN')),
              h('div', {}, h('span', {}, 'Since'),       h('strong', {}, '2021')),
              h('div', {}, h('span', {}, 'Для кого'),    h('strong', {}, 'Медиа · HoReCa · бренды')),
            ), 4),
            rv(h('div', { class: 'v2-cta-row' },
              h('a', { class: 'v2-btn primary', href: 'https://t.me/orlsve' }, 'Написать в Telegram', h('span', { class: 'v2-arrow' }, '→')),
              h('a', { class: 'v2-btn ghost', href: '#services' }, 'Портфолио'),
            ), 4),
          ),
        ),
      ),
      h('div', { class: 'v2-marquee rv' },
        h('div', { class: 'v2-marquee-track' },
          ...Array.from({ length: 2 }).flatMap(() => [
            ...S.stats.flatMap(s => [
              h('span', { class: 'v2-m-n' }, s.n),
              h('span', { class: 'v2-m-l' }, s.l),
              h('span', { class: 'v2-m-sep' }, '✦'),
            ]),
          ]),
        ),
      ),
    );

    // ABOUT
    const about = h('section', { class: 'v2-about', id: 'about' },
      rv(h('span', { class: 'v2-section-kicker' }, S.about.kicker)),
      h('div', { class: 'v2-about-grid' },
        rv(h('h2', { class: 'v2-h2' }, S.about.headline), 1),
        h('div', { class: 'v2-about-body' },
          ...S.about.body.map((p, i) => rv(h('p', {}, p), (i % 3) + 1)),
        ),
      ),
      h('div', { class: 'v2-creds-row' },
        ...S.about.creds.map((c, i) => rv(h('div', { class: 'v2-cred' },
          h('span', { class: 'v2-cred-idx' }, '0' + (i + 1)),
          h('span', { class: 'v2-cred-t' }, c.t),
          h('span', { class: 'v2-cred-s' }, c.s),
        ), (i % 4) + 1)),
      ),
    );

    // SERVICES
    const services = h('section', { class: 'v2-services', id: 'services' },
      rv(h('span', { class: 'v2-section-kicker' }, S.services.kicker)),
      rv(h('h2', { class: 'v2-h2' }, S.services.headline), 1),
      h('div', { class: 'v2-svc-list' },
        ...S.services.items.map((it, i) => rv(h('article', { class: 'v2-svc' },
          h('div', { class: 'v2-svc-l' },
            h('span', { class: 'v2-svc-num' }, it.num),
            h('span', { class: 'v2-svc-tag' }, it.tag),
          ),
          h('div', { class: 'v2-svc-c' },
            h('h3', { class: 'v2-svc-title' }, it.title),
            h('p', { class: 'v2-svc-body' }, it.body),
          ),
          h('ul', { class: 'v2-svc-formats' },
            ...it.formats.map(f => h('li', {}, f)),
          ),
        ), (i % 3) + 1)),
      ),
    );

    // PUBLICATIONS + SAMPLES combined
    const pubs = h('section', { class: 'v2-pubs', id: 'publications' },
      rv(h('span', { class: 'v2-section-kicker' }, S.publications.kicker)),
      rv(h('h2', { class: 'v2-h2' }, S.publications.headline), 1),
      h('div', { class: 'v2-pub-grid' },
        ...S.publications.items.map((p, i) => rv(h('a', { class: 'v2-pub-card', href: p.href, target: '_blank', rel: 'noopener' },
          h('div', { class: 'v2-pub-head' },
            h('span', { class: 'v2-pub-year' }, p.year),
            h('span', { class: 'v2-pub-type' }, p.type),
          ),
          h('h3', { class: 'v2-pub-title' }, p.title),
          h('div', { class: 'v2-pub-foot' },
            h('span', {}, p.outlet),
            h('span', { class: 'v2-pub-go' }, 'Читать →'),
          ),
        ), (i % 3) + 1)),
      ),
      h('div', { class: 'v2-samples' },
        rv(h('div', { class: 'v2-samples-head' },
          h('span', { class: 'v2-section-kicker' }, S.samples.kicker),
          h('h3', { class: 'v2-h3' }, S.samples.headline),
        )),
        h('ul', { class: 'v2-sample-list' },
          ...S.samples.items.map((it, i) => rv(h('li', {},
            h('a', { href: it.href, target: '_blank', rel: 'noopener' },
              h('span', { class: 'v2-sample-type' }, it.type),
              h('span', { class: 'v2-sample-title' }, it.title),
              h('span', { class: 'v2-sample-arrow' }, '→'),
            ),
          ), (i % 3) + 1)),
        ),
      ),
    );

    // EXPERIENCE
    const exp = h('section', { class: 'v2-experience' },
      rv(h('span', { class: 'v2-section-kicker' }, S.experience.kicker)),
      rv(h('h2', { class: 'v2-h2' }, S.experience.headline), 1),
      h('ol', { class: 'v2-timeline' },
        ...S.experience.items.map((e, i) => rv(h('li', {},
          h('span', { class: 'v2-tl-years' }, e.years),
          h('div', { class: 'v2-tl-body' },
            h('h3', {}, e.company, h('span', { class: 'v2-tl-city' }, '  ' + e.city)),
            h('div', { class: 'v2-tl-role' }, e.role),
            h('p', {}, e.body),
          ),
        ), (i % 3) + 1)),
      ),
    );

    // CONTACT
    const contact = h('section', { class: 'v2-contact', id: 'contact' },
      rv(h('span', { class: 'v2-section-kicker' }, S.contact.kicker)),
      rv(h('h2', { class: 'v2-h2 huge' }, S.contact.headline), 1),
      rv(h('p', { class: 'v2-contact-body' }, S.contact.body), 2),
      h('div', { class: 'v2-contact-grid' },
        ...S.contact.links.map((l, i) => rv(h('a', { class: 'v2-clink' + (l.primary ? ' primary' : ''), href: l.href, target: '_blank', rel: 'noopener' },
          h('span', { class: 'v2-clink-label' }, l.t),
          h('span', { class: 'v2-clink-value' }, l.v),
          h('span', { class: 'v2-clink-arrow' }, '↗'),
        ), (i % 4) + 1)),
      ),
      h('footer', { class: 'v2-footer' },
        h('span', {}, '© Svetlana Orlova · 2026'),
        h('span', {}, 'Белград'),
      ),
    );

    root.appendChild(frag(hero, about, services, pubs, exp, contact));
  }

  /* =================================================================
     VARIANT 3 — TECH-SOMM (Space Grotesk, минимал, структурный)
     ================================================================= */
  function renderV3(root) {
    const m = S.manifestos.v3;

    // HERO
    const hero = h('section', { class: 'v3-hero' },
      h('header', { class: 'v3-top' },
        h('span', { class: 'v3-idx' }, '[ 001 ]'),
        h('span', { class: 'v3-brand' }, 'Svetlana Orlova'),
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
            h('a', { class: 'v3-btn primary', href: 'https://t.me/orlsve' },
              h('span', {}, 'Обсудить проект'),
              h('span', { class: 'v3-btn-ar' }, '→'),
            ),
            h('a', { class: 'v3-btn ghost', href: '#services' }, 'Услуги'),
          ), 4),
        ),
        h('div', { class: 'v3-hero-r rv' },
          h('figure', { class: 'v3-portrait' },
            h('img', { src: S.photo, alt: 'Светлана Орлова' }),
            h('div', { class: 'v3-portrait-tag' },
              h('span', {}, '/ portrait'),
              h('span', {}, 'Belgrade'),
            ),
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
        rv(h('li', { class: 'v3-pub-head' },
          h('span', {}, 'Год'),
          h('span', {}, 'Формат'),
          h('span', {}, 'Название'),
          h('span', {}, 'Площадка'),
          h('span', {}, ''),
        )),
        ...S.publications.items.map((p, i) => rv(h('li', {},
          h('a', { href: p.href, target: '_blank', rel: 'noopener', class: 'v3-pub' },
            h('span', { class: 'v3-pub-year' }, p.year),
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
  renderV1(document.getElementById('v1'));
  renderV2(document.getElementById('v2'));
  renderV3(document.getElementById('v3'));

  /* -------------------- variant switching -------------------- */
  const variants = ['v1', 'v2', 'v3'];
  function showVariant(v) {
    variants.forEach(id => {
      document.getElementById(id).classList.toggle('active', id === v);
    });
    document.querySelectorAll('.variant-bar button').forEach(b => {
      b.classList.toggle('active', b.dataset.variant === v);
    });
    document.body.dataset.variant = v;
    try { localStorage.setItem('so-variant', v); } catch {}
    window.scrollTo({ top: 0 });
    // restart reveal observer for newly active variant
    setTimeout(initReveal, 50);
  }
  document.querySelectorAll('.variant-bar button[data-variant]').forEach(b => {
    b.addEventListener('click', () => showVariant(b.dataset.variant));
  });
  const saved = (() => { try { return localStorage.getItem('so-variant'); } catch { return null; } })();
  if (saved && variants.includes(saved)) showVariant(saved);
  else document.body.dataset.variant = 'v1';

  /* -------------------- reveal on scroll -------------------- */
  let io;
  function initReveal() {
    if (io) io.disconnect();
    io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    const active = document.querySelector('.variant.active');
    if (!active) return;
    active.querySelectorAll('.rv:not(.in)').forEach(el => io.observe(el));
  }
  initReveal();

  /* -------------------- tweaks (theme toggle) -------------------- */
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "theme": "light"
  }/*EDITMODE-END*/;
  let theme = TWEAK_DEFAULTS.theme;

  function applyTheme(t) {
    theme = t;
    document.body.dataset.theme = t;
    document.querySelectorAll('[data-theme-toggle] button').forEach(b => {
      b.classList.toggle('on', b.dataset.theme === t);
    });
  }
  applyTheme(theme);

  document.querySelectorAll('[data-theme-toggle] button').forEach(b => {
    b.addEventListener('click', () => {
      applyTheme(b.dataset.theme);
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { theme } }, '*');
    });
  });

  // Edit-mode (Tweaks) protocol
  window.addEventListener('message', (e) => {
    const d = e.data;
    if (!d || typeof d !== 'object') return;
    if (d.type === '__activate_edit_mode') document.getElementById('tweaks').classList.add('on');
    if (d.type === '__deactivate_edit_mode') document.getElementById('tweaks').classList.remove('on');
  });
  window.parent.postMessage({ type: '__edit_mode_available' }, '*');
})();
