// ============================================================
// FRIHANTARA DIGITAL HOME — Navigation & Footer Component
// Modernized with Tailwind CSS, Clean Seamless Transitions & Premium Typography
// DB Connection & Supabase Logic preserved 100% Intact
// ============================================================

// Memuat resource eksternal (Tailwind, Google Fonts) secara aman
function injectStylesAndFonts() {
  if (!document.getElementById('frihantara-fonts')) {
    const fontLink = document.createElement('link');
    fontLink.id = 'frihantara-fonts';
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap';
    document.head.appendChild(fontLink);
  }

  if (!document.getElementById('frihantara-tailwind-cdn')) {
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

  // Animasi custom tambahan agar transisi membuka dan menutup terlihat anggun
  if (!document.getElementById('frihantara-custom-styles')) {
    const styleBlock = document.createElement('style');
    styleBlock.id = 'frihantara-custom-styles';
    styleBlock.innerHTML = `
      body {
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      #site-nav, #site-footer {
        opacity: 0;
        animation: fadeInNav 0.4s ease-out forwards;
      }
      @keyframes fadeInNav {
        to { opacity: 1; }
      }
    `;
    document.head.appendChild(styleBlock);
  }
}

export function renderNav(activePage = '') {
  injectStylesAndFonts();

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

  // Navigasi versi Desktop (Efek garis bawah minimalis)
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

  // Navigasi versi Mobile (Rapi & Sejajar)
  const mobileHtml = links.map(l => {
    const active = activePage === l.href ? 'text-amber-400 font-medium' : 'text-zinc-400';
    return `
      <a href="${l.href}" class="block py-4 text-base transition-all duration-200 border-b border-zinc-900/60 last:border-0 ${active} hover:text-zinc-100">
        ${l.label}
      </a>
    `;
  }).join('');

  const siteNav = document.getElementById('site-nav');
  if (siteNav) {
    // Memberikan tinggi dan padding yang aman agar tidak bertabrakan dengan Notch/Status Bar ponsel
    siteNav.className = "fixed top-0 left-0 w-full z-50 border-b border-zinc-900/60 bg-zinc-950/90 backdrop-blur-md transition-all duration-300";
    siteNav.innerHTML = `
      <div class="max-w-7xl mx-auto px-6 sm:px-8">
        <div class="flex items-center justify-between h-20 sm:h-24">
          
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

          <!-- Toggle Button Mobile yang Terintegrasi Rapi -->
          <button class="md:hidden flex items-center justify-center p-2 rounded-xl text-zinc-300 hover:text-white transition-all duration-200" id="nav-toggle" aria-label="Toggle menu">
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

  // Bersihkan sisa menu lama
  const oldMobileNav = document.getElementById('nav-mobile');
  if (oldMobileNav) oldMobileNav.remove();

  // Create menu mobile sebagai laci penuh yang langsung menyatu dengan dasar header
  const mobileNav = document.createElement('nav');
  mobileNav.id = 'nav-mobile';
  // Desain full-width, langsung turun ke bawah tanpa ada margin luar ("anti-kotak-sendiri")
  mobileNav.className = 'fixed left-0 right-0 w-full z-40 px-6 py-2 border-b border-zinc-900 bg-zinc-950/95 backdrop-blur-xl opacity-0 pointer-events-none -translate-y-2 transition-all duration-300 ease-out';
  // Posisikan tepat pas di bawah garis navbar h-20 (80px) atau h-24 (96px) di layar kecil
  mobileNav.style.top = '80px'; 
  mobileNav.innerHTML = `
    <div class="flex flex-col max-h-[75vh] overflow-y-auto">
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
        // Tutup menu
        mobileNav.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        mobileNav.classList.add('opacity-0', '-translate-y-2', 'pointer-events-none');
        
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        toggleBtn.classList.remove('rotate-90');
      } else {
        // Buka menu
        mobileNav.classList.remove('opacity-0', '-translate-y-2', 'pointer-events-none');
        mobileNav.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        toggleBtn.classList.add('rotate-90');
      }
    });
  }

  // Tutup menu otomatis jika menyentuh area di luar navbar
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#site-nav') && !e.target.closest('#nav-mobile')) {
      mobileNav.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
      mobileNav.classList.add('opacity-0', '-translate-y-2', 'pointer-events-none');
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

  // Logika database Supabase asli tetap terjaga sepenuhnya tanpa diganggu
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
          
          <!-- Sisi Kiri: Copyright dengan Branding Elegan -->
          <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 order-2 md:order-1 text-center sm:text-left">
            <span class="text-sm font-light tracking-wider">
              © ${year} <span class="font-serif font-medium text-zinc-300">${name}</span>
            </span>
            <span class="h-4 w-[1px] bg-zinc-800 hidden sm:inline-block"></span>
            <span class="text-xs text-zinc-600 hidden sm:inline-block">Seni & Presisi Digital</span>
          </div>

          <!-- Sisi Kanan: Tautan Bersih (Hanya Thoughts, Tanpa Admin) -->
          <div class="flex items-center gap-6 text-sm font-medium order-1 md:order-2">
            <a href="/thoughts" class="text-zinc-400 hover:text-amber-400 transition-colors duration-300 tracking-wide">
              Thoughts
            </a>
          </div>

        </div>
      </div>
    `;
  }
}
