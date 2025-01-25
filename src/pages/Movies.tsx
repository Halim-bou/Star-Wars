import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import CommentSection from '../components/CommentSection';

interface Movie {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  url: string;
}

interface MovieWithPoster extends Movie {
  posterUrl: string;
}

const moviePosters: Record<string, string> = {
  'A New Hope': 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&q=80'
  // 'The Empire Strikes Back': 'https://images.unsplash.com/photo-1608889773923-7514b2b89636?auto=format&fit=crop&q=80',
  // 'Return of the Jedi': 'https://images.unsplash.com/photo-1608889825271-9d8012d88032?auto=format&fit=crop&q=80',
  // 'The Phantom Menace': 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&q=80',
  // 'Attack of the Clones': 'https://images.unsplash.com/photo-1608889773923-7514b2b89636?auto=format&fit=crop&q=80',
  // 'Revenge of the Sith': 'https://images.unsplash.com/photo-1608889825271-9d8012d88032?auto=format&fit=crop&q=80'
};

function Movies() {
  const [movies, setMovies] = useState<MovieWithPoster[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<MovieWithPoster | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/films/');
        const data = await response.json();
        const moviesWithPosters = data.results.map((movie: Movie) => ({
          ...movie,
          posterUrl: moviePosters[movie.title] || 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&q=80'
        }));
        setMovies(moviesWithPosters.sort((a: Movie, b: Movie) => a.episode_id - b.episode_id));
        setLoading(false);
      } catch (err) {
        setError('Failed to load movies. Please try again later.');
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-yellow-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
        Star Wars Movies
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.url}
            onClick={() => setSelectedMovie(movie)}
            className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105"
          >
            <div
              className="h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${movie.posterUrl})` }}
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-yellow-400 mb-2">
                Episode {movie.episode_id}: {movie.title}
              </h2>
              <p className="text-gray-400">Released: {new Date(movie.release_date).getFullYear()}</p>
              <p className="text-gray-400">Director: {movie.director}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-gray-900 rounded-lg p-8 max-w-4xl w-full my-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div
                className="w-full md:w-1/3 h-96 bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url(${selectedMovie.posterUrl})` }}
              />
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  Episode {selectedMovie.episode_id}: {selectedMovie.title}
                </h2>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Opening Crawl</h3>
                    <p className="italic">{selectedMovie.opening_crawl}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold">Director</p>
                      <p>{selectedMovie.director}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Producer</p>
                      <p>{selectedMovie.producer}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Release Date</p>
                      <p>{new Date(selectedMovie.release_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <CommentSection
              contentType="movie"
              contentId={selectedMovie.url.split('/').filter(Boolean).pop() || ''}
            />

            <button
              onClick={() => setSelectedMovie(null)}
              className="mt-6 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Movies;
