import React, { useEffect, useState } from "react";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bgColor, setBgColor] = useState("#A52A2A"); // Brown Background

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/blogs?populate=*");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data);
        setPosts(data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div style={{ color: "#FFFFFF", textAlign: "center" }}>Loading...</div>;
  if (error) return <div style={{ color: "#FFFFFF", textAlign: "center" }}>Error: {error}</div>;

  const handleBgColorChange = (e) => setBgColor(e.target.value);

  return (
    <div
      style={{
        backgroundColor: bgColor,
        padding: "20px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        color: "#FFFFFF", // Set text color to white
        overflowX: "hidden", // Prevent horizontal scrolling
      }}
    >
      <h1 style={{ color: "#FFFFFF" }}>Blog Posts</h1>

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
        <p style={{ color: "#FFFFFF" }}>No blog posts available. Please check back later!</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            style={{
              width: "90vw",
              maxWidth: "1200px",
              border: "1px solid #FFFFFF",
              padding: "20px",
              margin: "20px 0",
              borderRadius: "8px",
              backgroundColor: "#333333", // Dark background for contrast
              boxShadow: "5px 5px 15px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ color: "#FFD700", textAlign: "center" }}>{post.title}</h2> {/* Centered Title */}
            <p style={{ color: "#FFFFFF", textAlign: "justify", lineHeight: "1.6" }}>
              {post.content}
            </p> {/* Justified text */}

            {post.image && post.image.url && (
              <img
                src={`http://localhost:1337${post.image.url}`}
                alt={post.image.name || "Blog Image"}
                style={{
                  width: "100%", // Ensures full width
                  maxWidth: "100%",
                  height: "auto",
                  marginTop: "10px",
                  borderRadius: "8px",
                  display: "block", // Prevents unwanted inline spacing
                }}
              />
            )}

            <p style={{ textAlign: "right", color: "#FFFFFF" }}>
              <small>
                Published on: {new Date(post.published).toLocaleDateString()}
              </small>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;
