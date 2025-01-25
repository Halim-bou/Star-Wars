import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import CommentSection from '../components/CommentSection';

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  films: string[];
  url: string;
}

interface CharacterWithFilms extends Character {
  filmTitles: string[];
  imageUrl: string;
}

const characterImages: Record<string, string> = {
  'Luke Skywalker': 'https://images.unsplash.com/photo-1608889476561-6242cfdbf622?auto=format&fit=crop&q=80',
  'Darth Vader': 'https://images.unsplash.com/photo-1608889476518-738c9b1dcb40?auto=format&fit=crop&q=80',
  'Leia Organa': 'https://images.unsplash.com/photo-1608889476550-3cb4d0f0dee8?auto=format&fit=crop&q=80',
  'Obi-Wan Kenobi': 'https://images.unsplash.com/photo-1608889476587-c9dc785e0a34?auto=format&fit=crop&q=80',
  // Add more character images as needed
};

function Characters() {
  const [characters, setCharacters] = useState<CharacterWithFilms[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterWithFilms | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchCharacters = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      const charactersWithFilms = await Promise.all(
        data.results.map(async (character: Character) => {
          const filmTitles = await Promise.all(
            character.films.map(async (filmUrl) => {
              const filmResponse = await fetch(filmUrl);
              const filmData = await filmResponse.json();
              return filmData.title;
            })
          );
          return {
            ...character,
            filmTitles,
            imageUrl: characterImages[character.name] || 'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?auto=format&fit=crop&q=80'
          };
        })
      );

      return {
        characters: charactersWithFilms,
        next: data.next
      };
    } catch (err) {
      throw new Error('Failed to load characters');
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const { characters: initialCharacters, next } = await fetchCharacters('https://swapi.dev/api/people/');
        setCharacters(initialCharacters);
        setNextPage(next);
        setLoading(false);
      } catch (err) {
        setError('Failed to load characters. Please try again later.');
        setLoading(false);
      }
    };

    init();
  }, []);

  const loadMore = async () => {
    if (!nextPage || loadingMore) return;

    setLoadingMore(true);
    try {
      const { characters: newCharacters, next } = await fetchCharacters(nextPage);
      setCharacters(prev => [...prev, ...newCharacters]);
      setNextPage(next);
    } catch (err) {
      setError('Failed to load more characters.');
    } finally {
      setLoadingMore(false);
    }
  };

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
        Star Wars Characters
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((character) => (
          <div
            key={character.url}
            onClick={() => setSelectedCharacter(character)}
            className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105"
          >
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${character.imageUrl})` }}
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-yellow-400 mb-2">{character.name}</h2>
              <p className="text-gray-400">Birth Year: {character.birth_year}</p>
              <p className="text-gray-400">Gender: {character.gender}</p>
            </div>
          </div>
        ))}
      </div>

      {nextPage && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50"
          >
            {loadingMore ? 'Loading...' : 'Load More Characters'}
          </button>
        </div>
      )}

      {selectedCharacter && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-gray-900 rounded-lg p-8 max-w-2xl w-full my-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div
                className="w-full md:w-1/3 h-48 bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url(${selectedCharacter.imageUrl})` }}
              />
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">{selectedCharacter.name}</h2>
                <div className="space-y-2 text-gray-300">
                  <p><span className="font-semibold">Height:</span> {selectedCharacter.height}cm</p>
                  <p><span className="font-semibold">Mass:</span> {selectedCharacter.mass}kg</p>
                  <p><span className="font-semibold">Hair Color:</span> {selectedCharacter.hair_color}</p>
                  <p><span className="font-semibold">Skin Color:</span> {selectedCharacter.skin_color}</p>
                  <p><span className="font-semibold">Eye Color:</span> {selectedCharacter.eye_color}</p>
                  <p><span className="font-semibold">Birth Year:</span> {selectedCharacter.birth_year}</p>
                  <p><span className="font-semibold">Gender:</span> {selectedCharacter.gender}</p>
                  <div>
                    <p className="font-semibold mb-1">Appears in:</p>
                    <ul className="list-disc list-inside">
                      {selectedCharacter.filmTitles.map((film, index) => (
                        <li key={index}>{film}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <CommentSection
              contentType="character"
              contentId={selectedCharacter.url.split('/').filter(Boolean).pop() || ''}
            />

            <button
              onClick={() => setSelectedCharacter(null)}
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

export default Characters;