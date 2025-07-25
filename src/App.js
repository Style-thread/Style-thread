
import React, { useMemo, useState, useEffect } from "react";

/**
 * Helper to build absolute public paths (works with CRA/Vite).
 */
const pub = (p) => `${process.env.PUBLIC_URL || ""}${p}`;

/**
 * Seed wallpapers that live in /public/wallpapers
 * (Replace file names with what you actually have)
 */
const SEED_WALLPAPERS = [
  {
    id: "seed-1",
    src: pub("/wallpapers/nature1.jpg"),
    title: "Nature – Mountain Sunset",
    description: "Golden hour over the mountains.",
    tags: ["nature", "sunset", "mountain", "hd"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7, // 7 days ago
  },
  {
    id: "seed-2",
    src: pub("/wallpapers/abstract1.jpg"),
    title: "Abstract Blue Gradient",
    description: "Soft blue gradient background wallpaper.",
    tags: ["abstract", "blue", "gradient"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
  {
    id: "seed-3",
    src: pub("/wallpapers/city1.jpg"),
    title: "City Lights at Night",
    description: "Skyscrapers and neon lights.",
    tags: ["city", "night", "neon"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
];

const LS_KEY = "style-thread-uploads-v1";

export default function App() {
  const [query, setQuery] = useState("");
  const [wallpapers, setWallpapers] = useState(SEED_WALLPAPERS);
  const [uploading, setUploading] = useState(false);

  // Load uploads from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      try {
        const uploads = JSON.parse(saved);
        setWallpapers((prev) =>
          // ensure seed + uploads are merged (uploads last == newest first after sort)
          [...prev, ...uploads]
        );
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  // Derived filtered list
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = [...wallpapers].sort((a, b) => b.createdAt - a.createdAt);
    if (!q) return list;
    return list.filter((w) => {
      const haystack = (
        w.title +
        " " +
        w.description +
        " " +
        (w.tags || []).join(" ")
      ).toLowerCase();
      return haystack.includes(q);
    });
  }, [query, wallpapers]);

  const handleUpload = async ({ file, title, description, tags }) => {
    // Convert file to base64 so it survives reload via localStorage
    const dataUrl = await fileToDataUrl(file);

    const newItem = {
      id: `u-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      src: dataUrl,
      title: title || file.name,
      description: description || "",
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      createdAt: Date.now(),
    };

    // Update state
    setWallpapers((prev) => [...prev, newItem]);

    // Persist only user uploads (not the seeds)
    const currentUploads = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    localStorage.setItem(LS_KEY, JSON.stringify([...currentUploads, newItem]));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl font-bold">Style Thread – HD Wallpapers</h1>

          {/* Search */}
          <div className="w-full sm:w-80">
          <label htmlFor="search" className="sr-only">Search wallpapers</label>
            <input
              id="search"
              type="search"
              placeholder="Search wallpapers, e.g. “nature”, “city”, “4k”…"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <button
            onClick={() => setUploading((v) => !v)}
            className="rounded-md bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 transition"
          >
            {uploading ? "Close Upload" : "Upload Wallpaper"}
          </button>
        </div>
      </header>

      {/* Upload Form */}
      {uploading && (
        <section className="max-w-3xl mx-auto mt-6 px-4">
          <UploadForm onSubmit={handleUpload} />
        </section>
      )}

      {/* Results info */}
      <div className="max-w-6xl mx-auto px-4 mt-6 text-sm text-gray-600">
        Showing <strong>{filtered.length}</strong>{" "}
        {filtered.length === 1 ? "wallpaper" : "wallpapers"}
        {query && (
          <>
            {" "}
            for <strong>"{query}"</strong>
          </>
        )}
      </div>

      {/* Grid */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-20">
            No wallpapers match your search.
          </p>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {filtered.map((w) => (
              <WallpaperCard key={w.id} w={w} />
            ))}
          </div>
        )}
      </main>

      {/* Tiny hidden SEO text (optional) */}
      <div style={{ display: "none" }}>
        Style Thread lets you search, upload, and download HD and 4K wallpapers.
        Find nature, abstract, city, neon, gradient and aesthetic backgrounds
        for desktop and mobile. Free downloads.
      </div>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Style Thread — Free HD Wallpapers
        </div>
      </footer>
    </div>
  );
}

/* ---------------- Components ---------------- */

function WallpaperCard({ w }) {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
      <img
        src={w.src}
        alt={w.title || "Wallpaper"}
        loading="lazy"
        className="w-full h-56 object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
          {w.title}
        </h3>
        {w.description && (
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
            {w.description}
          </p>
        )}

        {w.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {w.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] uppercase tracking-wide bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <a
          href={w.src}
          download
          className="inline-block mt-3 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded"
        >
          Download
        </a>
      </div>
    </article>
  );
}

function UploadForm({ onSubmit }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const disabled = !file;

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    await onSubmit({ file, title, description, tags });

    // reset
    setFile(null);
    setPreview("");
    setTitle("");
    setDescription("");
    setTags("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-4"
    >
      <h2 className="text-lg font-semibold">Upload your wallpaper</h2>

      <div>
        <label className="block text-sm font-medium mb-1">
          Image file <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-3 w-full max-h-64 object-contain rounded"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          placeholder="e.g. Purple Nebula 4K"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          placeholder="Describe the wallpaper..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Tags (comma separated)
        </label>
        <input
          type="text"
          placeholder="nature, 4k, sunset"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      

      <button
        type="submit"
        disabled={disabled}
        className={`rounded-md px-4 py-2 text-white font-medium ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Upload
      </button>
    </form>
  );
}

/* ---------------- utils ---------------- */

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}
