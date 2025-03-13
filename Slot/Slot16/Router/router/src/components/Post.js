import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";

function Post() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/posts.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => {
        console.error("Error loading posts:", error);
        setError("Failed to load posts. Please try again later.");
      });
  }, []);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container>
      <h2>Post List</h2>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default Post;
