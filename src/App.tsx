import React, { useState } from 'react';
import './App.css';
import WallpaperCard from '../components/WallpaperCard';

function App() {
  const [wallpapers, setWallpapers] = useState([
    {
      id: 1,
      title: 'Sunset Overdrive',
      description: 'A breathtaking sunset view over the ocean horizon.',
      src: '/wallpapers/sunset.jpg',
    },
    {
      id: 2,
      title: 'Mountain Dreams',
      description: 'A scenic mountain range under a starry night sky.',
      src: '/wallpapers/mountain.jpg',
    },
  ]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

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
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-700">Style Thread</h1>
        <p className="text-gray-600">A professional wallpaper store to upload and download stunning wallpapers</p>
      </header>

      <section className="bg-white p-6 rounded shadow-md mb-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add a New Wallpaper</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Wallpaper Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
              if(e.target.files && e.target.files.length >0){
                setFile(e.target.files[0]);
              }
            }}
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          onClick={handleUpload}
          className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Upload Wallpaper
        </button>
      </section>

      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Available Wallpapers</h2>
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