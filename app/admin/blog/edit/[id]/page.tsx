"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input, Textarea, Select } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function EditArtikel() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    judul: "",
    slug: "",
    konten: "",
    ringkasan: "",
    kategori: "",
    is_featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (data) setForm(data);
        setInitialLoading(false);
      });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    await supabase.from("posts").update(form).eq("id", id);
    router.push("/admin/blog");
    router.refresh();
  }

  if (initialLoading) return <div>Memuat...</div>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-serif font-bold mb-6">Edit Artikel</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Judul"
          value={form.judul}
          onChange={(e) => setForm({ ...form, judul: e.target.value })}
          required
        />
        <Input
          label="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        <Textarea
          label="Ringkasan"
          value={form.ringkasan}
          onChange={(e) => setForm({ ...form, ringkasan: e.target.value })}
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium">Konten</label>
          <textarea
            rows={12}
            className="w-full px-3 py-2 border rounded-lg text-sm"
            value={form.konten}
            onChange={(e) => setForm({ ...form, konten: e.target.value })}
            required
          />
        </div>
        <Select
          label="Kategori"
          value={form.kategori}
          onChange={(e) => setForm({ ...form, kategori: e.target.value })}
          options={[
            { value: "Kehidupan", label: "Kehidupan" },
            { value: "Jalan-jalan", label: "Jalan-jalan" },
            { value: "Sepakbola", label: "Sepakbola" },
            { value: "Teknologi", label: "Teknologi" },
            { value: "Acak", label: "Acak" },
          ]}
        />
        <label className="flex items-center space-x-3 text-sm">
          <input
            type="checkbox"
            checked={form.is_featured}
            onChange={(e) =>
              setForm({ ...form, is_featured: e.target.checked })
            }
            className="rounded"
          />
          <span>Unggulan</span>
        </label>
        <div className="flex space-x-4">
          <Button type="submit" disabled={loading}>
            Simpan
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
}
