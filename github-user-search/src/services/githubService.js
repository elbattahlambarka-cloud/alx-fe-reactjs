import axios from 'axios';

// Function to fetch user data from GitHub API
const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Advanced search function with multiple criteria
const advancedSearch = async (searchParams) => {
  try {
    const { username, location, minRepos, language, sort = 'best-match', page = 1, per_page = 10 } = searchParams;
    
    // Build query string based on provided parameters
    let query = '';
    
    if (username) query += `${username} in:login`;
    if (location) query += ` location:${location}`;
    if (minRepos) query += ` repos:>=${minRepos}`;
    if (language) query += ` language:${language}`;
    
    // Remove leading space if query starts with it
    query = query.trim();
    
    const apiUrl = `https://api.github.com/search/users?q=${query}`;
    
    const response = await axios.get(apiUrl, {
      params: {
        sort,
        page,
        per_page,
      },
    });

    // Fetch detailed information for each user
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        try {
          const userDetails = await axios.get(`https://api.github.com/users/${user.login}`);
          return userDetails.data;
        } catch (err) {
          return user; // Return basic user info if details fetch fails
        }
      })
    );

    return {
      users: usersWithDetails,
      total_count: response.data.total_count,
      incomplete_results: response.data.incomplete_results,
    };
  } catch (error) {
    throw error;
  }
};

export { fetchUserData, advancedSearch };