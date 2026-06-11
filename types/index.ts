export interface Post {
  id: string;
  judul: string;
  slug: string;
  konten: string;
  ringkasan: string;
  kategori: "Kehidupan" | "Jalan-jalan" | "Sepakbola" | "Teknologi" | "Acak";
  is_featured: boolean;
  published_at: string;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  judul: string;
  deskripsi: string;
  image_url: string;
  kategori: "Jalan-jalan" | "Street" | "Teman" | "Acara" | "Acak";
  is_featured: boolean;
  taken_at: string;
  created_at: string;
}

export interface Thought {
  id: string;
  konten: string;
  tags: string[];
  created_at: string;
}
