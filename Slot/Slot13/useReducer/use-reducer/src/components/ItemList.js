import React, { useReducer, useState } from "react";
import { Button, Form, Container, Row, Col, ListGroup, ButtonGroup, InputGroup } from "react-bootstrap";

function listReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.item] };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
    case "EDIT_ITEM":
      return {
        ...state,
        items: state.items.map((item) => (item.id === action.id ? { ...item, name: action.name } : item)),
      };
    case "SORT_ITEMS":
      let sortedItems = [...state.items];
      switch (action.sortBy) {
        case "alphabetical":
          sortedItems.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "time":
          sortedItems.sort((a, b) => b.id - a.id);
          break;
        default:
          break;
      }
      return { ...state, items: sortedItems };
    default:
      return state;
  }
}

const initialState = {
  items: [],
};

function ItemList() {
  const [state, dispatch] = useReducer(listReducer, initialState);
  const [newItemName, setNewItemName] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddItem = () => {
    if (newItemName.trim()) {
      const newItem = { id: Date.now(), name: newItemName };
      dispatch({ type: "ADD_ITEM", item: newItem });
      setNewItemName("");
    }
  };

  const handleRemoveItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", id });
  };

  const handleEditClick = (item) => {
    setEditingItem({ ...item });
  };

  const handleEditSave = () => {
    if (editingItem && editingItem.name.trim()) {
      dispatch({
        type: "EDIT_ITEM",
        id: editingItem.id,
        name: editingItem.name,
      });
      setEditingItem(null);
    }
  };

  const handleSort = (sortBy) => {
    dispatch({ type: "SORT_ITEMS", sortBy });
  };

  const filteredItems = state.items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Container className="mt-5 item-list-container">
      <Row>
        <Col md={8} className="mx-auto glass-card p-4">
          <h2 className="text-center mb-4">Item List Manager</h2>

          {/* Add Item Form */}
          <Form className="mb-4">
            <Form.Group className="mb-3" controlId="formItem">
              <Form.Label>Enter Item:</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Enter item name"
                  onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
                />
                <Button variant="primary" onClick={handleAddItem}>
                  Add Item
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>

          {/* Search and Sort Controls */}
          <div className="mb-3">
            <Row className="align-items-center">
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-2 mb-md-0"
                />
              </Col>
              <Col md={6}>
                <ButtonGroup className="w-100">
                  <Button variant="outline-secondary" onClick={() => handleSort("alphabetical")}>
                    Sort A-Z
                  </Button>
                  <Button variant="outline-secondary" onClick={() => handleSort("time")}>
                    Sort by Time
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </div>

          {/* Items List */}
          <ListGroup>
            {filteredItems.map((item) => (
              <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                {editingItem?.id === item.id ? (
                  <InputGroup>
                    <Form.Control
                      type="text"
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      onKeyPress={(e) => e.key === "Enter" && handleEditSave()}
                    />
                    <Button variant="success" onClick={handleEditSave}>
                      Save
                    </Button>
                    <Button variant="secondary" onClick={() => setEditingItem(null)}>
                      Cancel
                    </Button>
                  </InputGroup>
                ) : (
                  <>
                    <span>{item.name}</span>
                    <div className="btn-group">
                      <Button variant="outline-primary" size="sm" onClick={() => handleEditClick(item)}>
                        Edit
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleRemoveItem(item.id)}>
                        Remove
                      </Button>
                    </div>
                  </>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>

          {filteredItems.length === 0 && (
            <p className="text-center text-muted mt-3">
              {searchQuery ? "No matching items found" : "No items added yet"}
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ItemList;
