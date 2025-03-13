import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/posts.json")
      .then((response) => response.json())
      .then((data) => {
        const foundPost = data.find((p) => p.id === id);
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError("Post not found");
        }
      })
      .catch((error) => {
        console.error("Error loading post:", error);
        setError("Failed to load post details");
      });
  }, [id]);

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container>
        <Alert variant="info">Loading...</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <div className="post-detail">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
    </Container>
  );
}

export default PostDetail;
