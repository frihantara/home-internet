// ============================================================
// FRIHANTARA DIGITAL HOME — Navigation & Footer Component
// Modernized with Tailwind CSS, Elegant Typography & Fluid Animations
// Fully Self-Contained (Injects Tailwind & Fonts automatically)
// DB Connection & Supabase Logic preserved 100% Intact
// ============================================================

// Fungsi pembantu untuk memuat resource eksternal secara dinamis
function injectStylesAndFonts() {
  // 1. Inject Google Fonts (Playfair Display & Plus Jakarta Sans)
  if (!document.getElementById('frihantara-fonts')) {
    const fontLink = document.createElement('link');
    fontLink.id = 'frihantara-fonts';
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap';
    document.head.appendChild(fontLink);
  }

  // 2. Inject Tailwind CSS CDN agar class-class utilitas langsung aktif
  if (!document.getElementById('frihantara-tailwind-cdn')) {
    // Set konfigurasi font Tailwind sebelum script dimuat
    window.tailwind = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            serif: ['"Playfair Display"', 'serif'],
          }
        }
      }
    };

    const tailwindScript = document.createElement('script');
    tailwindScript.id = 'frihantara-tailwind-cdn';
    tailwindScript.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(tailwindScript);
  }

  // 3. Tambahkan sedikit custom style transisi manual agar animasi mobile nav extra smooth
  if (!document.getElementById('frihantara-custom-styles')) {
    const styleBlock = document.createElement('style');
    styleBlock.id = 'frihantara-custom-styles';
    styleBlock.innerHTML = `
      body {
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      /* Mengatasi flash unstyled content sebelum Tailwind ter-load */
      #site-nav, #site-footer {
        opacity: 0;
        animation: fadeInNav 0.5s forwards;
      }
      @keyframes fadeInNav {
        to { opacity: 1; }
      }
    `;
    document.head.appendChild(styleBlock);
  }
}

export function renderNav(activePage = '') {
  // Jalankan penyuntikan gaya
  injectStylesAndFonts();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/football', label: 'Football' },
    { href: '/f1', label: 'F1' },
    { href: '/watchlist', label: 'Watchlist' },
    { href: '/thoughts', label: 'Thoughts' }
  ];

  // Desktop links dengan hover underline slide effect
  const linkHtml = links.map(l => {
    const active = activePage === l.href 
      ? 'text-amber-400 font-semibold after:scale-x-100' 
      : 'text-zinc-400 hover:text-zinc-100 after:scale-x-0';
    return `
      <a href="${l.href}" class="relative py-2 text-sm tracking-wide transition-all duration-300 ${active} after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-400 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100">
        ${l.label}
      </a>
    `;
  }).join('');

  // Mobile links
  const mobileHtml = links.map(l => {
    const active = activePage === l.href ? 'text-amber-400 bg-zinc-900/40' : 'text-zinc-400';
    return `
      <a href="${l.href}" class="block px-5 py-3.5 text-base font-medium rounded-xl transition-all duration-300 ${active} hover:text-zinc-100 hover:bg-zinc-900/20">
        ${l.label}
      </a>
    `;
  }).join('');

  // Update container navbar dengan sentuhan premium (Glassmorphism & Border tipis)
  const siteNav = document.getElementById('site-nav');
  if (siteNav) {
    siteNav.className = "fixed top-0 left-0 w-full z-50 border-b border-zinc-800/40 bg-zinc-950/85 backdrop-blur-md transition-all duration-300";
    siteNav.innerHTML = `
      <div class="max-w-7xl mx-auto px-6 sm:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Brand Logo Aesthetic -->
          <a href="/" class="group flex items-center gap-1">
            <span class="font-serif text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-amber-100">
              Frihantara<span class="text-amber-500 inline-block animate-pulse">.</span>
            </span>
          </a>

          <!-- Desktop Links Navigation -->
          <nav class="hidden md:flex items-center gap-8">
            ${linkHtml}
          </nav>

          <!-- Toggle Button Mobile dengan Efek Klik -->
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

  // Bersihkan mobile nav lama agar tidak menumpuk saat render ulang
  const oldMobileNav = document.getElementById('nav-mobile');
  if (oldMobileNav) oldMobileNav.remove();

  // Create panel menu mobile yang melayang estetik (Smooth slide & fade)
  const mobileNav = document.createElement('nav');
  mobileNav.id = 'nav-mobile';
  // Styling transisi: opacity, translate, scale yang smooth dengan cubic-bezier
  mobileNav.className = 'fixed left-4 right-4 z-40 p-2 rounded-2xl border border-zinc-800/80 bg-zinc-950/95 backdrop-blur-xl shadow-2xl opacity-0 -translate-y-4 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]';
  mobileNav.style.top = '86px'; 
  mobileNav.innerHTML = `
    <div class="flex flex-col gap-0.5">
      ${mobileHtml}
    </div>
  `;
  document.body.insertBefore(mobileNav, document.body.firstChild.nextSibling);

  const toggleBtn = document.getElementById('nav-toggle');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileNav.classList.contains('opacity-100');
      
      if (isOpen) {
        // Efek transisi menutup
        mobileNav.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        mobileNav.classList.add('opacity-0', '-translate-y-4', 'pointer-events-none');
        
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        toggleBtn.classList.remove('rotate-90');
      } else {
        // Efek transisi membuka
        mobileNav.classList.remove('opacity-0', '-translate-y-4', 'pointer-events-none');
        mobileNav.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        toggleBtn.classList.add('rotate-90');
      }
    });
  }

  // Tutup mobile menu saat klik di luar area menu
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
  // Gunakan 'Frihantara' sebagai default name yang baru
  let name = 'Frihantara';
  let year = new Date().getFullYear();

  // Logika database Supabase asli dipertahankan sepenuhnya tanpa diubah
  if (supabase) {
    const { data } = await supabase.from('settings').select('key,value').in('key', ['site_name', 'footer_links']);
    if (data) {
      const map = Object.fromEntries(data.map(r => [r.key, r.value]));
      if (map.site_name) name = map.site_name;
    }
  }

  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = "border-t border-zinc-900 bg-zinc-950 text-zinc-500 py-12 mt-20";
    footer.innerHTML = `
      <div class="max-w-7xl mx-auto px-6 sm:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <!-- Sisi Kiri: Branding & Copyright -->
          <div class="flex items-center gap-3 order-2 md:order-1">
            <span class="text-sm font-light tracking-wider">
              © ${year} <span class="font-serif font-medium text-zinc-300">${name}</span>
            </span>
            <span class="h-4 w-[1px] bg-zinc-800 hidden sm:inline-block"></span>
            <span class="text-xs text-zinc-600 hidden sm:inline-block">Seni & Presisi Digital</span>
          </div>

          <!-- Sisi Kanan: Tautan navigasi estetik & tombol Admin aktif -->
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
