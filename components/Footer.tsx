import Link from "next/link";
export default function Footer() {
  return (
    <footer className="border-t border-stone-200 py-8 mt-16 text-center md:flex md:justify-between">
      <p className="text-sm text-stone-500">
        © {new Date().getFullYear()} Rumah Digital.
      </p>
      <div className="flex justify-center space-x-6 mt-4 md:mt-0">
        <Link
          href="/tentang"
          className="text-sm text-stone-500 hover:text-stone-700"
        >
          Tentang
        </Link>
        <Link
          href="/acak"
          className="text-sm text-stone-500 hover:text-stone-700"
        >
          Acak
        </Link>
      </div>
    </footer>
  );
}
