import axios from 'axios';

const API_URL = "http://127.0.0.1:8000"; // Adjust if hosted elsewhere

// Fetch list of movies
export const fetchMovies = async () => {
  const response = await axios.get(`${API_URL}/movies/`);
  return response.data.movies;
};

// Get recommendations based on movie name
export const fetchRecommendations = async (movieName:string) => {
  const response = await axios.post(`${API_URL}/recommend/`, { movie_name: movieName });
  return response.data;
};
