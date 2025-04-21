import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Form, Alert } from "react-bootstrap";

const AdminCategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (!newCategory) return;
    try {
      const res = await axios.post(
        "https://task-assigner-backend-8184.onrender.com/api/categories",
        { name: newCategory },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories([...categories, res.data]);
      setNewCategory("");
      setMessage("Category added");
    } catch (err) {
      setError("Failed to add category");
    }
  };

  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(
        `https://task-assigner-backend-8184.onrender.com/api/categories/${id}`,
        { name: editingName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingId(null);
      setEditingName("");
      setMessage("Category updated");
      fetchCategories();
    } catch (err) {
      setError("Failed to update category");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://task-assigner-backend-8184.onrender.com/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(categories.filter((cat) => cat._id !== id));
      setMessage("Category deleted");
    } catch (err) {
      setError("Failed to delete category");
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center fw-bold">Category Manager</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form className="d-flex mb-4">
        <Form.Control
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button className="ms-2" onClick={handleAdd}>
          Add Category
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Category Name</th>
            <th style={{ width: "180px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td>
                {editingId === cat._id ? (
                  <Form.Control
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />
                ) : (
                  cat.name
                )}
              </td>
              <td>
                {editingId === cat._id ? (
                  <>
                    <Button size="sm" variant="success" onClick={() => handleUpdate(cat._id)}>
                      Save
                    </Button>{" "}
                    <Button size="sm" variant="secondary" onClick={() => setEditingId(null)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" variant="warning" onClick={() => handleEdit(cat._id, cat.name)}>
                      Edit
                    </Button>{" "}
                    <Button size="sm" variant="danger" onClick={() => handleDelete(cat._id)}>
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminCategoryManager;
