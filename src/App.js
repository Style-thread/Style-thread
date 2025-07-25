

import React from "react";
import "./App.css";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* SEO-friendly header */}
      <header className="bg-white shadow-md p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Style Thread - HD Wallpapers</h1>
        <p className="text-gray-600 mt-2">
          Download beautiful HD and 4K wallpapers for free. Explore nature, abstract, and more.
        </p>
      </header>

      {/* Wallpaper Grid */}
      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Latest Wallpapers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src="/wallpaper1.jpg"
              alt="Sunset mountain HD wallpaper"
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <p className="p-2 text-gray-700">Sunset Mountain HD Wallpaper</p>
          </div>

          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src="/wallpaper2.jpg"
              alt="Abstract blue gradient wallpaper"
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <p className="p-2 text-gray-700">Abstract Blue Gradient Wallpaper</p>
          </div>

          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src="/wallpaper3.jpg"
              alt="Nature forest waterfall wallpaper"
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <p className="p-2 text-gray-700">Nature Forest Waterfall Wallpaper</p>
          </div>
        </div>
      </main>

      {/* Static SEO content for Google */}
      <div style={{ display: "none" }}>
        Style Thread offers free HD wallpapers for desktops, laptops, and phones. 
        Browse nature wallpapers, abstract wallpapers, and 4K backgrounds updated daily.
      </div>

      <footer className="text-center p-4 bg-white shadow-md mt-6">
        <p className="text-gray-600">© 2025 Style Thread. All rights reserved.</p>
      </footer>
    </div>
  );
}


export default App;