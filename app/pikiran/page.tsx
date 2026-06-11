"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Thought } from "@/types";

export default function Pikiran() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createClient()
      .from("thoughts")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setThoughts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold">Pikiran</h1>
        <p className="text-stone-600 mt-2">
          Mikro-blog. Tempat nyampah pikiran.
        </p>
      </header>
      <div className="space-y-6">
        {thoughts.map((thought) => (
          <div
            key={thought.id}
            className="bg-white border rounded-xl p-6 hover:shadow-sm"
          >
            <p className="text-stone-700">{thought.konten}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {thought.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs bg-stone-100 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <time className="text-xs text-stone-400 mt-3 block">
              {new Date(thought.created_at).toLocaleString("id-ID")}
            </time>
          </div>
        ))}
      </div>
    </div>
  );
}
