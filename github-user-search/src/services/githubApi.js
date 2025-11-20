import axios from 'axios';

// GitHub API base URL
const GITHUB_API_BASE = 'https://api.github.com';

// Create axios instance with common configuration
const githubApi = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

// GitHub API service functions
export const githubService = {
  // Search for GitHub users
  searchUsers: async (query) => {
    try {
      const response = await githubApi.get(`/search/users?q=${query}&per_page=10`);
      return response.data;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  },

  // Get detailed user information
  getUser: async (username) => {
    try {
      const response = await githubApi.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Get user repositories
  getUserRepos: async (username) => {
    try {
      const response = await githubApi.get(`/users/${username}/repos?sort=updated&per_page=5`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user repos:', error);
      throw error;
    }
  },
};

export default githubService;