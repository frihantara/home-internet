import Link from "next/link";

const ruangan = [
  {
    judul: "Blog",
    deskripsi: "Cerita dan tulisan",
    href: "/blog",
    warna: "bg-amber-50 hover:bg-amber-100",
  },
  {
    judul: "Galeri",
    deskripsi: "Foto & kenangan",
    href: "/galeri",
    warna: "bg-rose-50 hover:bg-rose-100",
  },
  {
    judul: "Musik",
    deskripsi: "Album & playlist",
    href: "/musik",
    warna: "bg-sky-50 hover:bg-sky-100",
  },
  {
    judul: "Sepakbola",
    deskripsi: "The beautiful game",
    href: "/sepakbola",
    warna: "bg-emerald-50 hover:bg-emerald-100",
  },
  {
    judul: "Tontonan",
    deskripsi: "Film & serial",
    href: "/tontonan",
    warna: "bg-violet-50 hover:bg-violet-100",
  },
  {
    judul: "Jalan-jalan",
    deskripsi: "Destinasi",
    href: "/jalan-jalan",
    warna: "bg-orange-50 hover:bg-orange-100",
  },
  {
    judul: "Pikiran",
    deskripsi: "Curhatan singkat",
    href: "/pikiran",
    warna: "bg-teal-50 hover:bg-teal-100",
  },
  {
    judul: "Acak",
    deskripsi: "Link & quote",
    href: "/acak",
    warna: "bg-fuchsia-50 hover:bg-fuchsia-100",
  },
];

export default function Beranda() {
  return (
    <div className="space-y-20">
      <section className="py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
          Ruang kecil di internet
          <br />
          <span className="text-stone-500">tempat gue berbagi cerita</span>
        </h1>
        <p className="mt-6 text-lg text-stone-600 max-w-xl">
          Kumpulan tulisan, foto, musik, sepakbola, dan hal-hal random yang gue
          suka. Bukan portofolio atau resume — ini rumah digital gue.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-serif font-bold mb-8">
          ✨ Jelajahi Ruangan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ruangan.map((ruang) => (
            <Link
              key={ruang.judul}
              href={ruang.href}
              className={`${ruang.warna} p-6 rounded-xl transition-all hover:shadow-md`}
            >
              <h3 className="text-lg font-serif font-bold mb-2">
                {ruang.judul}
              </h3>
              <p className="text-sm text-stone-600">{ruang.deskripsi}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
