"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Post } from "@/types";
import Link from "next/link";

export default function BlogDetail({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createClient()
      .from("posts")
      .select("*")
      .eq("slug", params.slug)
      .single()
      .then(({ data }) => {
        setPost(data);
        setLoading(false);
      });
  }, [params.slug]);

  if (loading)
    return (
      <div className="max-w-3xl mx-auto animate-pulse space-y-4">
        <div className="h-8 bg-stone-200 rounded w-3/4"></div>
        <div className="h-4 bg-stone-200 rounded w-1/2"></div>
        <div className="h-32 bg-stone-200 rounded"></div>
      </div>
    );
  if (!post)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-serif font-bold">Tidak ditemukan</h2>
        <Link href="/blog" className="text-stone-600">
          ← Kembali
        </Link>
      </div>
    );

  return (
    <article className="max-w-3xl mx-auto">
      <Link
        href="/blog"
        className="text-sm text-stone-500 hover:text-stone-900 mb-8 inline-flex items-center"
      >
        ← Kembali ke blog
      </Link>
      <header className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <span className="px-3 py-1 bg-stone-100 rounded-full text-xs">
            {post.kategori}
          </span>
          <time className="text-sm text-stone-500">
            {new Date(post.published_at).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold">
          {post.judul}
        </h1>
        {post.ringkasan && (
          <p className="text-lg text-stone-600 mt-4">{post.ringkasan}</p>
        )}
      </header>
      <div className="prose prose-stone max-w-none">
        {post.konten.split("\n").map((p, i) => (
          <p key={i} className="mb-4">
            {p}
          </p>
        ))}
      </div>
    </article>
  );
}
