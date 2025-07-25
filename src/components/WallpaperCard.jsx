import React from 'react';

const WallpaperCard = ({ wallpaper }) => {
  return (
    <div className="rounded shadow-md overflow-hidden bg-white">
      <img
  src="/wallpaper1.jpg"
  alt="Beautiful mountain sunset HD wallpaper"
  className="rounded-lg shadow-md"
/>

      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-1">{wallpaper.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{wallpaper.description}</p>
        <a
          href={wallpaper.src}
          download
          className="text-indigo-600 hover:underline text-sm"
        >
          Download Wallpaper
        </a>
      </div>
    </div>
  );
};

export default WallpaperCard;