javascript
// ============================================================
// FRIHANTARA DIGITAL HOME — Navigation & Footer Component
// Modernized with Tailwind CSS, Elegant Typography & Fluid Animations
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

  // Render link untuk versi desktop
  const linkHtml = links.map(l => {
    const isActive = activePage === l.href;
    const activeClasses = isActive 
      ? 'text-amber-400 font-medium after:scale-x-100' 
      : 'text-zinc-400 hover:text-zinc-100 after:scale-x-0';
    
    return `
      <a href="${l.href}" class="relative py-2 text-sm tracking-wide transition-colors duration-300 ${activeClasses} after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-amber-400 after:to-amber-200 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100">
        ${l.label}
      </a>
    `;
  }).join('');

  // Render link untuk versi mobile dengan stagger delay imajiner via transition
  const mobileHtml = links.map((l, index) => {
    const isActive = activePage === l.href;
    const activeClasses = isActive ? 'text-amber-400 bg-zinc-900/50' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/30';
    return `
      <a href="${l.href}" class="block px-6 py-4 text-lg font-medium tracking-wide rounded-xl transition-all duration-300 ${activeClasses}">
        <span class="flex items-center justify-between">
          ${l.label}
          <svg class="w-5 h-5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </a>
    `;
  }).join('');

  // Setup struktur layout navbar (Pastikan id="site-nav" memiliki class minimal: "fixed top-0 left-0 w-full z-50")
  const siteNav = document.getElementById('site-nav');
  if (siteNav) {
    siteNav.className = "fixed top-0 left-0 w-full z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md transition-all duration-300";
    siteNav.innerHTML = `
      <div class="max-w-7xl mx-auto px-6 sm:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Brand Logo Aesthetic -->
          <a href="/" class="group flex items-center gap-1">
            <span class="font-serif text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-amber-100">
              Frihantara<span class="text-amber-500 inline-block animate-pulse">.</span>
            </span>
          </a>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-8">
            ${linkHtml}
          </nav>

          <!-- Toggle Menu Button (Mobile) -->
          <button class="md:hidden flex items-center justify-center p-2.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all duration-300" id="nav-toggle" aria-label="Toggle menu">
            <svg id="hamburger-icon" class="w-6 h-6 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg id="close-icon" class="w-6 h-6 hidden transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

        </div>
      </div>
    `;
  }

  // Bersihkan mobile nav lama agar tidak duplikat
  const oldMobileNav = document.getElementById('nav-mobile');
  if (oldMobileNav) oldMobileNav.remove();

  // Buat kontainer menu mobile baru dengan animasi super smooth (Slide & Fade)
  const mobileNav = document.createElement('nav');
  mobileNav.className = 'fixed left-0 right-0 z-40 mx-4 mt-2 p-3 rounded-2xl border border-zinc-800/80 bg-zinc-950/95 backdrop-blur-xl shadow-2xl opacity-0 -translate-y-4 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]';
  mobileNav.style.top = '84px'; // Posisi tepat di bawah navbar (h-20 + margin)
  mobileNav.id = 'nav-mobile';
  mobileNav.innerHTML = `
    <div class="flex flex-col gap-1 p-2">
      ${mobileHtml}
    </div>
  `;
  document.body.insertBefore(mobileNav, document.body.firstChild.nextSibling);

  const toggleBtn = document.getElementById('nav-toggle');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('opacity-100');
      
      if (isOpen) {
        // Tutup menu
        mobileNav.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        mobileNav.classList.add('opacity-0', '-translate-y-4', 'pointer-events-none');
        
        // Animasi ikon
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        toggleBtn.classList.remove('rotate-90');
      } else {
        // Buka menu
        mobileNav.classList.remove('opacity-0', '-translate-y-4', 'pointer-events-none');
        mobileNav.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        
        // Animasi ikon
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        toggleBtn.classList.add('rotate-90');
      }
    });
  }

  // Tutup menu saat klik area luar
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#site-nav') && !e.target.closest('#nav-mobile')) {
      mobileNav.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
      mobileNav.classList.add('opacity-0', '-translate-y-4', 'pointer-events-none');
      if (hamburgerIcon && closeIcon && toggleBtn) {
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        toggleBtn.classList.remove('rotate-90');
      }
    }
  });
}

export async function renderFooter(supabase) {
  let name = 'Frihantara';
  let year = new Date().getFullYear();

  if (supabase) {
    const { data } = await supabase.from('settings').select('key,value').in('key', ['site_name', 'footer_links']);
    if (data) {
      const map = Object.fromEntries(data.map(r => [r.key, r.value]));
      // Jika di DB diset nama lain tetap bisa pakai fallback Frihantara
      if (map.site_name) name = map.site_name === 'Digital Home' ? 'Frihantara' : map.site_name;
    }
  }

  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = "border-t border-zinc-900 bg-zinc-950 text-zinc-500 py-12 mt-20";
    footer.innerHTML = `
      <div class="max-w-7xl mx-auto px-6 sm:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <!-- Left side: Copyright with aesthetic branding -->
          <div class="flex items-center gap-3 order-2 md:order-1">
            <span class="text-sm font-light tracking-wider">
              © ${year} <span class="font-serif font-medium text-zinc-300">Frihantara</span>
            </span>
            <span class="h-4 w-[1px] bg-zinc-800 hidden sm:inline-block"></span>
            <span class="text-xs text-zinc-600 hidden sm:inline-block">Seni & Presisi Digital</span>
          </div>

          <!-- Right side: Clean minimalistic links -->
          <div class="flex items-center gap-8 text-sm font-medium order-1 md:order-2">
            <a href="/thoughts" class="text-zinc-400 hover:text-amber-400 transition-colors duration-300 tracking-wide">
              Thoughts
            </a>
            <span class="text-zinc-800">•</span>
            <a href="/studio" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all duration-300">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Admin
            </a>
          </div>

        </div>
      </div>
    `;
  }
}
