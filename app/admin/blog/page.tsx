"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Post } from "@/types";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const supabase = createClient();
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin hapus?")) return;
    const supabase = createClient();
    await supabase.from("posts").delete().eq("id", id);
    setPosts(posts.filter((p) => p.id !== id));
  }

  if (loading) return <div>Memuat...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif font-bold">Kelola Blog</h1>
        <Link href="/admin/blog/baru">
          <Button>Tulis Baru</Button>
        </Link>
      </div>
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b">
            <tr>
              <th className="text-left p-4">Judul</th>
              <th className="text-left p-4">Kategori</th>
              <th className="text-right p-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b hover:bg-stone-50">
                <td className="p-4 font-medium">{post.judul}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-stone-100 rounded-full text-xs">
                    {post.kategori}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <Link href={`/admin/blog/edit/${post.id}`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(post.id)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
