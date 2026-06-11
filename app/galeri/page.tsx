"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { GalleryItem } from "@/types";

export default function Galeri() {
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createClient()
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setPhotos(data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-stone-100 aspect-square rounded-xl"
            ></div>
          ))}
      </div>
    );

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-4xl font-serif font-bold">Galeri</h1>
        <p className="text-stone-600 mt-2">Momen yang berhasil diabadikan.</p>
      </header>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <button
            key={photo.id}
            onClick={() => setSelected(photo)}
            className="group relative aspect-square rounded-xl overflow-hidden bg-stone-100"
          >
            <img
              src={photo.image_url}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              alt={photo.judul}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-end p-4 opacity-0 group-hover:opacity-100">
              <p className="text-white text-sm font-medium">{photo.judul}</p>
            </div>
          </button>
        ))}
      </div>
      {selected && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={selected.image_url}
              className="max-h-[80vh] rounded-lg"
              alt={selected.judul}
            />
            <div className="text-white mt-4">
              <h3 className="text-xl font-serif font-bold">{selected.judul}</h3>
              <p className="text-stone-300">{selected.deskripsi}</p>
            </div>
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
