import React, { useEffect, useState } from "react";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bgColor, setBgColor] = useState("#ffffff"); // Default background color

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/blogs?populate=*");
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

  const handleBgColorChange = (e) => setBgColor(e.target.value);

  return (
    <div style={{ backgroundColor: bgColor, padding: "20px", minHeight: "100vh" }}>
      <h1>Blog Posts</h1>
      <label>
        Change Background Color: 
        <input
          type="color"
          value={bgColor}
          onChange={handleBgColorChange}
          style={{ marginLeft: "10px" }}
        />
      </label>
      {posts.length === 0 ? (
        <p>No blog posts available. Please check back later!</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0", borderRadius: "8px" }}>
            <h2>{post.attributes.title}</h2> {/* Access title via attributes */}
            <p>{post.attributes.content}</p> {/* Access content via attributes */}
            {post.attributes.image?.data && ( // Check if an image is available
              <img
                src={post.attributes.image.data.attributes.url}
                alt={post.attributes.title}
                style={{ maxWidth: "100%", height: "auto", marginTop: "10px", borderRadius: "8px" }}
              />
            )}
            <p>
              <small>Published on: {new Date(post.attributes.published).toLocaleDateString()}</small>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;
