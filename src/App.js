import React, { useState } from 'react';
import './App.css';
import WallpaperCard from './components/WallpaperCard';

function App() {
  const [wallpapers, setWallpapers] = useState([
    {
      id: 1,
      title: 'Sunset Bliss',
      description: 'Sunset over the ocean',
      src: '/wallpapers/sunset.jpg',
    },
    {
      id: 2,
      title: 'Mountain Dream',
      description: 'Scenic view of mountain under stars',
      src: '/wallpapers/mountain.jpg',
    },
  ]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!title || !description || !file) return;

    const newWallpaper = {
      id: Date.now(),
      title,
      description,
      src: URL.createObjectURL(file),
    };

    setWallpapers([newWallpaper, ...wallpapers]);
    setTitle('');
    setDescription('');
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-700">Style Thread</h1>
        <p className="text-gray-600">Upload and download stunning wallpapers</p>
      </header>

      <section className="bg-white p-6 rounded shadow-md max-w-4xl mx-auto mb-10">
        <h2 className="text-2xl font-semibold mb-4">Add a New Wallpaper</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Wallpaper Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleUpload}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Upload Wallpaper
        </button>
      </section>

      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Available Wallpapers</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wallpapers.map((wallpaper) => (
            <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;