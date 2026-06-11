"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input, Textarea, Select } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function UploadFoto() {
  const router = useRouter();
  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    image_url: "",
    kategori: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    await supabase.from("gallery").insert([form]);
    router.push("/admin/galeri");
    router.refresh();
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-serif font-bold mb-6">Upload Foto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Judul"
          value={form.judul}
          onChange={(e) => setForm({ ...form, judul: e.target.value })}
          required
        />
        <Textarea
          label="Deskripsi"
          value={form.deskripsi}
          onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
        />
        <Input
          label="URL Gambar"
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          required
          placeholder="https://..."
        />
        <Select
          label="Kategori"
          value={form.kategori}
          onChange={(e) => setForm({ ...form, kategori: e.target.value })}
          options={[
            { value: "Jalan-jalan", label: "Jalan-jalan" },
            { value: "Street", label: "Street" },
            { value: "Teman", label: "Teman" },
            { value: "Acara", label: "Acara" },
            { value: "Acak", label: "Acak" },
          ]}
          required
        />
        <div className="flex space-x-4">
          <Button type="submit" disabled={loading}>
            Upload
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
}
