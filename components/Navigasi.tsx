"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigasi = [
  { nama: "Beranda", href: "/" },
  { nama: "Blog", href: "/blog" },
  { nama: "Galeri", href: "/galeri" },
  { nama: "Musik", href: "/musik" },
  { nama: "Sepakbola", href: "/sepakbola" },
  { nama: "Tontonan", href: "/tontonan" },
  { nama: "Jalan-jalan", href: "/jalan-jalan" },
  { nama: "Pikiran", href: "/pikiran" },
  { nama: "Acak", href: "/acak" },
  { nama: "Tentang", href: "/tentang" },
];

export default function Navigasi() {
  const pathname = usePathname();
  const [terbuka, setTerbuka] = useState(false);
  return (
    <nav className="border-b border-stone-200 py-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-serif font-bold hover:text-stone-600"
        >
          Rumah Digital
        </Link>
        <div className="hidden md:flex space-x-6">
          {navigasi.map((item) => {
            const aktif = pathname === item.href;
            return (
              <Link
                key={item.nama}
                href={item.href}
                className={`text-sm transition-colors hover:text-stone-600 ${aktif ? "text-stone-900 font-medium border-b-2 border-stone-900" : "text-stone-500"}`}
              >
                {item.nama}
              </Link>
            );
          })}
        </div>
        <button
          onClick={() => setTerbuka(!terbuka)}
          className="md:hidden p-2 text-stone-600"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            {terbuka ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>
      {terbuka && (
        <div className="md:hidden mt-4 pb-4 border-b border-stone-200 flex flex-col space-y-3">
          {navigasi.map((item) => (
            <Link
              key={item.nama}
              href={item.href}
              onClick={() => setTerbuka(false)}
              className={`text-sm ${pathname === item.href ? "text-stone-900 font-medium" : "text-stone-500"}`}
            >
              {item.nama}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
