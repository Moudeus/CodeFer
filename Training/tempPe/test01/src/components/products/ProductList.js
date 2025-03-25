import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch, FaStar, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import { ProductAPI } from "../../api";
import useCart from "../../hooks/useCart";
import { useAuth } from "../../contexts/AuthContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await ProductAPI.getAllProducts();
      setProducts(data);

      // Extract unique categories
      const uniqueCategories = [...new Set(data.map((product) => product.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error loading products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      await addToCart(product);
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    return reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  };

  const filterProducts = () => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "all" || product.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const sortProducts = (products) => {
    const sortedProducts = [...products];
    switch (sortBy) {
      case "price-low":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "price-high":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "name-asc":
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      case "rating":
        return sortedProducts.sort((a, b) => {
          const ratingA = getAverageRating(a.reviews);
          const ratingB = getAverageRating(b.reviews);
          return ratingB - ratingA;
        });
      default:
        return sortedProducts;
    }
  };

  if (loading) {
    return <div className="text-center">Loading products...</div>;
  }

  const displayProducts = sortProducts(filterProducts());

  return (
    <div>
      <Row className="mb-4">
        <Col md={4}>
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort by...</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="rating">Rating</option>
          </Form.Select>
        </Col>
      </Row>

      {displayProducts.length === 0 ? (
        <div className="text-center">No products found</div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {displayProducts.map((product) => (
            <Col key={product.id}>
              <Card className="h-100">
                <Card.Img variant="top" src={product.imageUrl} style={{ height: "200px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    <div className="mb-2">
                      <strong>Price:</strong> ${product.price.toLocaleString()}
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <FaStar className="text-warning me-1" />
                      <span>{getAverageRating(product.reviews).toFixed(1)}</span>
                      <span className="ms-1 text-muted">({product.reviews?.length || 0} reviews)</span>
                    </div>
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="primary" onClick={() => handleAddToCart(product)}>
                      <FaShoppingCart className="me-1" />
                      Add to Cart
                    </Button>
                    <Button as={Link} to={`/product/${product.id}`} variant="outline-secondary">
                      View Details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ProductList;
