"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Post } from "@/types";
import Link from "next/link";

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [kategori, setKategori] = useState("Semua");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createClient()
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setPosts(data);
        setLoading(false);
      });
  }, []);

  const filtered =
    kategori === "Semua" ? posts : posts.filter((p) => p.kategori === kategori);
  const kategories = [
    "Semua",
    "Kehidupan",
    "Jalan-jalan",
    "Sepakbola",
    "Teknologi",
    "Acak",
  ];

  return (
    <div>
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold">Blog</h1>
        <p className="text-lg text-stone-600 mt-4 max-w-2xl">
          Tulisan panjang tentang apa aja yang menarik buat gue.
        </p>
      </header>
      <div className="flex flex-wrap gap-2 mb-8">
        {kategories.map((k) => (
          <button
            key={k}
            onClick={() => setKategori(k)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${kategori === k ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}
          >
            {k}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-stone-100 rounded-xl h-48"
              ></div>
            ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white border rounded-xl p-6 hover:shadow-lg transition"
            >
              <span className="text-xs bg-stone-100 px-2 py-1 rounded-full">
                {post.kategori}
              </span>
              <h3 className="text-lg font-serif font-bold mt-3 group-hover:text-stone-700">
                {post.judul}
              </h3>
              <p className="text-sm text-stone-600 mt-2 line-clamp-3">
                {post.ringkasan}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
