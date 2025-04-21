import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Form, Alert, Modal } from "react-bootstrap";

const SubcategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [newSubcategory, setNewSubcategory] = useState("");
  const [editingSubcategory, setEditingSubcategory] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://task-assigner-backend-8184.onrender.com/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      setError("Failed to fetch categories");
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const res = await axios.get(
        `https://task-assigner-backend-8184.onrender.com/api/categories/${categoryId}/subcategories`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubcategories(res.data);
    } catch (err) {
      setError("Failed to fetch subcategories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddSubcategory = async () => {
    if (!newSubcategory) return;
    try {
      const res = await axios.post(
        `https://task-assigner-backend-8184.onrender.com/api/categories/${categoryId}/subcategories`,
        { name: newSubcategory },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubcategories([...subcategories, res.data]);
      setNewSubcategory("");
      setMessage("Subcategory added");
    } catch (err) {
      setError("Failed to add subcategory");
    }
  };

  const handleEditSubcategory = async () => {
    if (!editingSubcategory) return;
    try {
      await axios.put(
        `https://task-assigner-backend-8184.onrender.com/api/categories/${categoryId}/subcategories/${editingId}`,
        { name: editingSubcategory },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Subcategory updated");
      setShowModal(false);
      fetchSubcategories(categoryId);
    } catch (err) {
      setError("Failed to update subcategory");
    }
  };

  const handleDeleteSubcategory = async (subcategoryId) => {
    try {
      await axios.delete(
        `https://task-assigner-backend-8184.onrender.com/api/categories/${categoryId}/subcategories/${subcategoryId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubcategories(subcategories.filter((sub) => sub._id !== subcategoryId));
      setMessage("Subcategory deleted");
    } catch (err) {
      setError("Failed to delete subcategory");
    }
  };

  const handleCategorySelect = (categoryId) => {
    setCategoryId(categoryId);
    fetchSubcategories(categoryId);
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center fw-bold">Subcategory Manager</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="mb-4">
        <Form.Select onChange={(e) => handleCategorySelect(e.target.value)} aria-label="Select Category">
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </Form.Select>
      </div>

      {categoryId && (
        <>
          <Form className="d-flex mb-4">
            <Form.Control
              type="text"
              placeholder="New subcategory name"
              value={newSubcategory}
              onChange={(e) => setNewSubcategory(e.target.value)}
            />
            <Button className="ms-2" onClick={handleAddSubcategory}>
              Add Subcategory
            </Button>
          </Form>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Subcategory Name</th>
                <th style={{ width: "180px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subcategories.map((sub) => (
                <tr key={sub._id}>
                  <td>{sub.name}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => {
                        setEditingId(sub._id);
                        setEditingSubcategory(sub.name);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteSubcategory(sub._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Subcategory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={editingSubcategory}
            onChange={(e) => setEditingSubcategory(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubcategory}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SubcategoryManager;
