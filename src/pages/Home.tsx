import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Film } from 'lucide-react';

function Home() {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1579566346927-c68383817a25?auto=format&fit=crop&q=80")',
          filter: 'brightness(0.3)'
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-6">
            Welcome to Star Wars Explorer
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Embark on an epic journey through the Star Wars universe. Discover detailed information
            about your favorite characters and explore the legendary films that have captured
            imaginations across generations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link
            to="/characters"
            className="bg-gray-900 bg-opacity-80 p-8 rounded-lg hover:bg-opacity-100 transition-all transform hover:scale-105"
          >
            <Users className="h-12 w-12 text-yellow-400 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">Characters</h2>
            <p className="text-gray-300">
              Explore detailed profiles of Star Wars characters, from legendary Jedi to infamous Sith lords.
            </p>
          </Link>

          <Link
            to="/movies"
            className="bg-gray-900 bg-opacity-80 p-8 rounded-lg hover:bg-opacity-100 transition-all transform hover:scale-105"
          >
            <Film className="h-12 w-12 text-yellow-400 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">Movies</h2>
            <p className="text-gray-300">
              Dive into the epic saga with information about all Star Wars films in the series.
            </p>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            "A long time ago in a galaxy far, far away...." Begin your exploration of the Star Wars
            universe through our comprehensive database of characters and films.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
