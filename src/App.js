import React, { useState, useEffect, useMemo } from 'react';
import { Star, Search, Filter, Heart, Play, Calendar, Clock, Users } from 'lucide-react';

const MovieRecommendationSystem = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedRating, setSelectedRating] = useState('all');
  const [userRatings, setUserRatings] = useState({});
  const [favorites, setFavorites] = useState(new Set());
  const [recommendationMode, setRecommendationMode] = useState('popular');
  const [loading, setLoading] = useState(true);

  // Sample movie data with comprehensive information
  const sampleMovies = [
    {
      id: 1,
      title: "The Shawshank Redemption",
      genre: ["Drama", "Crime"],
      rating: 9.3,
      year: 1994,
      duration: 142,
      director: "Frank Darabont",
      cast: ["Tim Robbins", "Morgan Freeman"],
      plot: "Two imprisoned men bond over years, finding solace and redemption through acts of common decency.",
      poster: "https://images.unsplash.com/photo-1489599558673-0493b9b95bbd?w=300&h=450&fit=crop",
      userScore: 0,
      views: 2500000,
      tags: ["inspiring", "friendship", "hope"]
    },
    {
      id: 2,
      title: "The Dark Knight",
      genre: ["Action", "Crime", "Drama"],
      rating: 9.0,
      year: 2008,
      duration: 152,
      director: "Christopher Nolan",
      cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      plot: "Batman must accept one of the greatest psychological and physical tests to fight injustice.",
      poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=450&fit=crop",
      userScore: 0,
      views: 3200000,
      tags: ["superhero", "dark", "psychological"]
    },
    {
      id: 3,
      title: "Pulp Fiction",
      genre: ["Crime", "Drama"],
      rating: 8.9,
      year: 1994,
      duration: 154,
      director: "Quentin Tarantino",
      cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
      plot: "The lives of two mob hitmen, a boxer, and others intertwine in four tales of violence and redemption.",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
      userScore: 0,
      views: 1800000,
      tags: ["nonlinear", "cult classic", "violence"]
    },
    {
      id: 4,
      title: "The Godfather",
      genre: ["Crime", "Drama"],
      rating: 9.2,
      year: 1972,
      duration: 175,
      director: "Francis Ford Coppola",
      cast: ["Marlon Brando", "Al Pacino", "James Caan"],
      plot: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
      poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop",
      userScore: 0,
      views: 2100000,
      tags: ["classic", "family", "power"]
    },
    {
      id: 5,
      title: "Inception",
      genre: ["Action", "Sci-Fi", "Thriller"],
      rating: 8.8,
      year: 2010,
      duration: 148,
      director: "Christopher Nolan",
      cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
      plot: "A thief who steals corporate secrets through dream-sharing technology.",
      poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
      userScore: 0,
      views: 2800000,
      tags: ["mind-bending", "complex", "dreams"]
    },
    {
      id: 6,
      title: "The Matrix",
      genre: ["Action", "Sci-Fi"],
      rating: 8.7,
      year: 1999,
      duration: 136,
      director: "The Wachowskis",
      cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
      plot: "A computer hacker learns about the true nature of reality and his role in the war against controllers.",
      poster: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=300&h=450&fit=crop",
      userScore: 0,
      views: 3500000,
      tags: ["philosophical", "action", "cyberpunk"]
    },
    {
      id: 7,
      title: "Parasite",
      genre: ["Comedy", "Drama", "Thriller"],
      rating: 8.6,
      year: 2019,
      duration: 132,
      director: "Bong Joon Ho",
      cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
      plot: "A poor family schemes to become employed by a wealthy family by infiltrating their household.",
      poster: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=300&h=450&fit=crop",
      userScore: 0,
      views: 1200000,
      tags: ["social commentary", "dark comedy", "award-winning"]
    },
    {
      id: 8,
      title: "Interstellar",
      genre: ["Drama", "Sci-Fi"],
      rating: 8.6,
      year: 2014,
      duration: 169,
      director: "Christopher Nolan",
      cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
      plot: "A team explores space to find a new home for humanity as Earth faces environmental collapse.",
      poster: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=450&fit=crop",
      userScore: 0,
      views: 2300000,
      tags: ["space", "emotional", "science"]
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setMovies(sampleMovies);
      setLoading(false);
    }, 1000);
  }, []);

  const genres = ['Action', 'Comedy', 'Crime', 'Drama', 'Sci-Fi', 'Thriller'];

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           movie.cast.some(actor => actor.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesGenre = selectedGenres.length === 0 || 
                          selectedGenres.some(genre => movie.genre.includes(genre));
      
      const matchesRating = selectedRating === 'all' || 
                           (selectedRating === '9+' && movie.rating >= 9) ||
                           (selectedRating === '8+' && movie.rating >= 8) ||
                           (selectedRating === '7+' && movie.rating >= 7);

      return matchesSearch && matchesGenre && matchesRating;
    });
  }, [movies, searchTerm, selectedGenres, selectedRating]);

  const recommendedMovies = useMemo(() => {
    if (recommendationMode === 'popular') {
      return [...filteredMovies].sort((a, b) => b.views - a.views);
    } else if (recommendationMode === 'rating') {
      return [...filteredMovies].sort((a, b) => b.rating - a.rating);
    } else if (recommendationMode === 'personal') {
      // Simple collaborative filtering based on user ratings
      const ratedMovies = Object.keys(userRatings);
      if (ratedMovies.length === 0) return filteredMovies;
      
      return [...filteredMovies].sort((a, b) => {
        const aScore = userRatings[a.id] || 0;
        const bScore = userRatings[b.id] || 0;
        return bScore - aScore;
      });
    }
    return filteredMovies;
  }, [filteredMovies, recommendationMode, userRatings]);

  const handleGenreToggle = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleRating = (movieId, rating) => {
    setUserRatings(prev => ({ ...prev, [movieId]: rating }));
  };

  const toggleFavorite = (movieId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(movieId)) {
        newFavorites.delete(movieId);
      } else {
        newFavorites.add(movieId);
      }
      return newFavorites;
    });
  };

  const StarRating = ({ rating, onRate, movieId }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRate && onRate(movieId, star)}
            className={`${
              star <= rating 
                ? 'text-yellow-400' 
                : 'text-gray-300'
            } hover:text-yellow-400 transition-colors`}
          >
            <Star className="w-4 h-4 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading amazing movies...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            CineRecommend
          </h1>
          <p className="text-gray-300">Your intelligent movie recommendation system</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search movies, directors, or actors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium">Genres:</span>
            </div>
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => handleGenreToggle(genre)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  selectedGenres.includes(genre)
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {genre}
              </button>
            ))}
            
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="all">All Ratings</option>
              <option value="9+">9.0+ Rating</option>
              <option value="8+">8.0+ Rating</option>
              <option value="7+">7.0+ Rating</option>
            </select>
          </div>

          {/* Recommendation Mode */}
          <div className="flex space-x-4">
            <span className="text-sm font-medium">Sort by:</span>
            {[
              { key: 'popular', label: 'Most Popular' },
              { key: 'rating', label: 'Highest Rated' },
              { key: 'personal', label: 'Personal Recommendations' }
            ].map(mode => (
              <button
                key={mode.key}
                onClick={() => setRecommendationMode(mode.key)}
                className={`px-3 py-1 rounded-lg text-sm transition-all ${
                  recommendationMode === mode.key
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendedMovies.map(movie => (
            <div key={movie.id} className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105">
              <div className="relative">
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => toggleFavorite(movie.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                    favorites.has(movie.id) 
                      ? 'bg-red-500 text-white' 
                      : 'bg-black/50 text-gray-300 hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${favorites.has(movie.id) ? 'fill-current' : ''}`} />
                </button>
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{movie.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{movie.title}</h3>
                
                <div className="flex items-center space-x-4 text-sm text-gray-300 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{movie.year}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{movie.duration}m</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{(movie.views / 1000000).toFixed(1)}M</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {movie.genre.map(genre => (
                    <span key={genre} className="px-2 py-1 bg-purple-600/30 text-purple-200 text-xs rounded-full">
                      {genre}
                    </span>
                  ))}
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{movie.plot}</p>

                <div className="flex items-center justify-between">
                  <StarRating 
                    rating={userRatings[movie.id] || 0}
                    onRate={handleRating}
                    movieId={movie.id}
                  />
                  <button className="flex items-center space-x-1 bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg text-sm transition-colors">
                    <Play className="w-4 h-4" />
                    <span>Watch</span>
                  </button>
                </div>

                <div className="mt-3 text-xs text-gray-400">
                  <div>Director: {movie.director}</div>
                  <div>Cast: {movie.cast.slice(0, 2).join(', ')}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {recommendedMovies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-xl mb-4">No movies found</div>
            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400">{movies.length}</div>
            <div className="text-gray-300">Total Movies</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400">{Object.keys(userRatings).length}</div>
            <div className="text-gray-300">Movies Rated</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400">{favorites.size}</div>
            <div className="text-gray-300">Favorites</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400">
              {Object.keys(userRatings).length > 0 
                ? (Object.values(userRatings).reduce((a, b) => a + b, 0) / Object.keys(userRatings).length).toFixed(1)
                : '0.0'
              }
            </div>
            <div className="text-gray-300">Avg. Your Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRecommendationSystem;