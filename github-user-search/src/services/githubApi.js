import axios from 'axios';

// GitHub API service functions
export const githubService = {
  // Function to fetch user data from GitHub API
  fetchUserData: async (username) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  },
};

export default githubService;