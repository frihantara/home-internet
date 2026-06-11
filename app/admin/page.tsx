"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ posts: 0, gallery: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase.from("posts").select("*", { count: "exact", head: true }),
      supabase.from("gallery").select("*", { count: "exact", head: true }),
    ]).then(([p, g]) => {
      setStats({ posts: p.count || 0, gallery: g.count || 0 });
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Memuat...</div>;

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-2">Dashboard</h1>
      <p className="text-stone-600 mb-8">Ringkasan konten</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/blog"
          className="bg-amber-50 border border-amber-200 rounded-lg p-6 hover:shadow-md"
        >
          <div className="text-2xl">✍️</div>
          <div className="text-3xl font-bold mt-2">{stats.posts}</div>
          <div className="font-medium">Artikel Blog</div>
        </Link>
        <Link
          href="/admin/galeri"
          className="bg-rose-50 border border-rose-200 rounded-lg p-6 hover:shadow-md"
        >
          <div className="text-2xl">🖼️</div>
          <div className="text-3xl font-bold mt-2">{stats.gallery}</div>
          <div className="font-medium">Foto Galeri</div>
        </Link>
        <div className="bg-stone-50 border rounded-lg p-6">
          <div className="text-2xl">💭</div>
          <div className="text-3xl font-bold mt-2">-</div>
          <div className="font-medium">Pikiran</div>
        </div>
      </div>
    </div>
  );
}
