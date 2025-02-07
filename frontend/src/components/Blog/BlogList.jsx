import React, { useEffect, useState } from "react";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/blogs");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Debug log
        setPosts(data.data); // Set posts directly with the `data` array
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No blog posts available. Please check back later!</p>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2> {/* Access title directly */}
            <p>{post.content}</p> {/* Access content directly */}
            <p><small>Published on: {new Date(post.published).toLocaleDateString()}</small></p>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;
