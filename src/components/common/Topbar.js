
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Form,
  FormControl,
  Spinner,
  ListGroup,
  Dropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBell, FaUserCircle, FaBookmark, FaPlus, FaClipboardList, FaCompass } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const Topbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const { user, handleLogout } = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://task-assigner-backend-8184.onrender.com/api/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTasks([]);
      setShowDropdown(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = tasks.filter((task) =>
      task.title.toLowerCase().includes(query) ||
      task.creator.name.toLowerCase().includes(query) ||
      task.skills.some((skill) => skill.toLowerCase().includes(query))
    );
    setFilteredTasks(results);
    setShowDropdown(true);
  }, [searchQuery, tasks]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoutAndRedirect = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "#5624d0", paddingTop: "0.75rem", paddingBottom: "0.75rem" }}
      variant="dark"
      sticky="top"
      className="shadow-sm"
    >
      <Container fluid className="px-4">
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-4 text-white me-4"
          style={{ whiteSpace: "nowrap" }}
        >
          TaskAssigner
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse
          id="main-navbar"
          className="d-flex justify-content-between align-items-center"
        >
          {/* Search Form */}
          <Form
            className="position-relative mx-lg-auto"
            style={{ maxWidth: "450px", width: "100%" }}
            ref={dropdownRef}
          >
            <FormControl
              type="search"
              placeholder="Search tasks..."
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (filteredTasks.length > 0) setShowDropdown(true);
              }}
            />

            {showDropdown && (
              <ListGroup
                className="position-absolute mt-1 w-100 shadow-sm"
                style={{ zIndex: 1000, maxHeight: "300px", overflowY: "auto" }}
              >
                {loading ? (
                  <ListGroup.Item className="text-center">
                    <Spinner animation="border" size="sm" />
                  </ListGroup.Item>
                ) : filteredTasks.length === 0 ? (
                  <ListGroup.Item className="text-muted text-center">
                    No tasks found
                  </ListGroup.Item>
                ) : (
                  filteredTasks.map((task) => (
                    <ListGroup.Item
                      key={task._id}
                      action
                      onClick={() => {
                        navigate(`/tasks/${task._id}`);
                        setShowDropdown(false);
                        setSearchQuery("");
                      }}
                    >
                      <div>
                        <strong>{task.title}</strong> — by {task.creator.name}
                      </div>
                      <small className="text-muted">
                        Skills: {task.skills.join(", ")}
                      </small>
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
            )}
          </Form>

          {/* Right Side Buttons */}
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="text-white fw-semibold me-3 d-flex align-items-center">
              <FaCompass className="me-1" />
              Explore
            </Nav.Link>

            {user && (
              <>
                {/* <Nav.Link as={Link} to="/saved-tasks" className="text-white fw-semibold me-3 d-flex align-items-center">
                  <FaBookmark className="me-1" />
                  Saved
                </Nav.Link> */}

                <Nav.Link as={Link} to="/my-tasks" className="text-white fw-semibold me-3 d-flex align-items-center">
                  <FaClipboardList className="me-1" />
                  My Tasks
                </Nav.Link>

                <Button
                  as={Link}
                  to="/create-task"
                  variant="light"
                  size="sm"
                  className="fw-bold me-3 d-flex align-items-center"
                  style={{ color: "#5624d0" }}
                >
                  <FaPlus className="me-1" />
                  Create Task
                </Button>
              </>
            )}

            {!user ? (
              <>
                <Nav.Link as={Link} to="/login" className="text-white fw-semibold me-3">
                  Login
                </Nav.Link>
                <Button
                  as={Link}
                  to="/register"
                  variant="outline-light"
                  className="fw-semibold px-3"
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <FaBell
                  size={20}
                  className="text-warning me-3"
                  title="Notifications"
                  style={{ cursor: "pointer" }}
                />
                <Dropdown align="end">
                  <Dropdown.Toggle
                    as="div"
                    className="text-white d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                  >
                    <FaUserCircle size={22} className="me-1" />
                    <span className="fw-semibold">{user.name || user.email || "Profile"}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">Personal Details</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/submissions">My Submissions</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/saved-tasks">Saved Tasks</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/messages">Messages</Dropdown.Item>
                    <Dropdown.Item onClick={logoutAndRedirect}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;
