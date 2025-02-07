import axios from 'axios';

// Set the base URL for the Strapi API
const API_URL = 'http://localhost:1337/api';

// Fetch all blog posts
export const fetchBlogPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/blog-posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};
