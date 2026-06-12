// ============================================================
// DIGITAL HOME — Navigation & Footer Component
// Removed: Music, Random, About
// ============================================================

export function renderNav(activePage = '') {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/football', label: 'Football' },
    { href: '/f1', label: 'F1' },
    { href: '/watchlist', label: 'Watchlist' },
    { href: '/travel', label: 'Travel' },
    { href: '/thoughts', label: 'Thoughts' }
  ];

  const linkHtml = links.map(l => {
    const active = activePage === l.href ? ' class="active"' : '';
    return `<a href="${l.href}"${active}>${l.label}</a>`;
  }).join('');

  const mobileHtml = links.map(l => {
    return `<a href="${l.href}">${l.label}</a>`;
  }).join('');

  document.getElementById('site-nav').innerHTML = `
    <div class="container">
      <div class="nav-inner">
        <a href="/" class="nav-logo">Digital<span>.</span></a>
        <nav class="nav-links">${linkHtml}</nav>
        <button class="nav-menu-btn" id="nav-toggle" aria-label="Toggle menu">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  // Mobile nav
  const mobileNav = document.createElement('nav');
  mobileNav.className = 'nav-mobile';
  mobileNav.id = 'nav-mobile';
  mobileNav.innerHTML = mobileHtml;
  document.body.insertBefore(mobileNav, document.body.firstChild.nextSibling);

  const toggleBtn = document.getElementById('nav-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#site-nav') && !e.target.closest('#nav-mobile')) {
      mobileNav.classList.remove('open');
    }
  });
}

export async function renderFooter(supabase) {
  let name = 'Digital Home';
  let year = new Date().getFullYear();

  if (supabase) {
    const { data } = await supabase.from('settings').select('key,value').in('key', ['site_name', 'footer_links']);
    if (data) {
      const map = Object.fromEntries(data.map(r => [r.key, r.value]));
      if (map.site_name) name = map.site_name;
    }
  }

  document.getElementById('site-footer').innerHTML = `
    <div class="container">
      <div class="footer-inner">
        <p class="footer-copy">© ${year} ${name}</p>
        <div class="footer-links">
          <a href="/thoughts">Thoughts</a>
          <a href="/studio">Admin</a>
        </div>
      </div>
    </div>
  `;
}
