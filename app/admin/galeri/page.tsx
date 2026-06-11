"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { GalleryItem } from "@/types";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function AdminGaleri() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createClient()
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setItems(data);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Hapus?")) return;
    await createClient().from("gallery").delete().eq("id", id);
    setItems(items.filter((i) => i.id !== id));
  }

  if (loading) return <div>Memuat...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif font-bold">Kelola Galeri</h1>
        <Link href="/admin/galeri/upload">
          <Button>Upload Foto</Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative group bg-stone-100 rounded-lg overflow-hidden"
          >
            <img
              src={item.image_url}
              className="w-full aspect-square object-cover"
              alt=""
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-end p-3">
              <div className="text-white text-sm">
                <p className="font-medium">{item.judul}</p>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-300 text-xs mt-1"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
