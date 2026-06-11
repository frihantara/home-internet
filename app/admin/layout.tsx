"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const menuAdmin = [
  { judul: "Dashboard", href: "/admin", icon: "📊" },
  { judul: "Blog", href: "/admin/blog", icon: "✍️" },
  { judul: "Galeri", href: "/admin/galeri", icon: "🖼️" },
  { judul: "Musik", href: "/admin/musik", icon: "🎵" },
  { judul: "Sepakbola", href: "/admin/sepakbola", icon: "⚽" },
  { judul: "Tontonan", href: "/admin/tontonan", icon: "🎬" },
  { judul: "Jalan-jalan", href: "/admin/jalan-jalan", icon: "✈️" },
  { judul: "Pikiran", href: "/admin/pikiran", icon: "💭" },
  { judul: "Pengaturan", href: "/admin/pengaturan", icon: "⚙️" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("admin_token="));
    const token = cookies?.split("=")[1];
    if (
      token === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "rumahdigital123")
    ) {
      setAuth(true);
    } else {
      router.push("/admin/login");
    }
    setLoading(false);
  }, [pathname]);

  if (pathname === "/admin/login") return <>{children}</>;
  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        Memeriksa...
      </div>
    );
  if (!auth) return null;

  return (
    <div className="min-h-screen bg-stone-50 flex">
      <aside className="w-64 bg-white border-r border-stone-200 p-6">
        <Link href="/admin" className="text-xl font-serif font-bold block mb-8">
          Panel Admin
        </Link>
        <nav className="space-y-1">
          {menuAdmin.map((item) => (
            <Link
              key={item.judul}
              href={item.href}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-stone-600 hover:bg-stone-100"
            >
              {item.icon} <span>{item.judul}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-8 pt-8 border-t border-stone-200">
          <Link
            href="/"
            className="flex items-center space-x-3 px-3 py-2 text-sm text-stone-500 hover:bg-stone-100"
          >
            🏠 Lihat Website
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
