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
  Image,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaBell,
  FaUserCircle,
  FaBookmark,
  FaPlus,
  FaClipboardList,
  FaCompass,
  FaSearch,
} from "react-icons/fa";
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
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      setFilteredTasks([]);
      setShowDropdown(false);
      return;
    }

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

  const defaultProfileImg = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

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
        >
          TaskAssigner
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar" className="justify-content-between align-items-center">



          {/* Search Bar */}
          <Form className="position-relative mx-lg-auto w-100" style={{ maxWidth: "450px" }} ref={dropdownRef}>
  <InputGroup>
    <FormControl
      placeholder="Search for tasks..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onFocus={() => {
        if (filteredTasks.length > 0) setShowDropdown(true);
      }}
    />
    <InputGroup.Text style={{ backgroundColor: "white", borderLeft: "none" }}>
      <FaSearch style={{ color: "#5624d0" }} />
    </InputGroup.Text>
  </InputGroup>

  {showDropdown && filteredTasks.length > 0 && (
  <ListGroup
    className="position-absolute w-100 shadow"
    style={{
      zIndex: 1000,
      maxHeight: "300px",
      overflowY: "auto",
      top: "100%", // to appear below input
    }}
  >
    {filteredTasks.map((task) => (
      <ListGroup.Item
        key={task._id}
        as={Link}
        to={`/task/${task._id}`}
        className="text-decoration-none text-dark"
        onClick={() => {
          setShowDropdown(false);
          setSearchQuery("");
        }}
      >
        <div className="fw-semibold">{task.title}</div>
        <div style={{ fontSize: "0.8rem", color: "gray" }}>
          {task.skills?.join(", ")}
        </div>
      </ListGroup.Item>
    ))}
  </ListGroup>
)}


  {/* Dropdown stays the same */}
</Form>


          {/* Right Side */}
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/browse-tasks" className="text-white fw-semibold me-3 d-flex align-items-center">
              <FaCompass className="me-1" />
              Explore
            </Nav.Link>

           

{user?.role === "admin" ? (
  <>
<Nav.Link as={Link} to="/all-tasks" className="text-white fw-semibold me-3 d-flex align-items-center">
  Tasks
</Nav.Link>

<Nav.Link as={Link} to="/all-submissions" className="text-white fw-semibold me-3 d-flex align-items-center">
  Submissions
</Nav.Link>

  </>
) : user && (
  <Nav.Link as={Link} to="/my-tasks" className="text-white fw-semibold me-3 d-flex align-items-center">
    <FaClipboardList className="me-1" />
    My Tasks
  </Nav.Link>
)}


            {user?.role === "admin" && (
              <Button
                as={Link}
                to="/admin"
                variant="outline-light"
                size="sm"
                className="fw-semibold me-3 d-flex align-items-center"
              >
                <FaBookmark className="me-1" />
                Admin Dashboard
              </Button>
            )}

            {(user?.role === "creator" || user?.role === "admin") && (
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
            )}

            {user?.role === "creator" && (
              <Button
                as={Link}
                to="/creator-submissions"
                variant="outline-light"
                size="sm"
                className="fw-semibold me-3 d-flex align-items-center"
              >
                <FaClipboardList className="me-1" />
                View Submissions
              </Button>
            )}

            {/* Notification Icon with Red Dot */}
            {user && (
  <div className="position-relative me-3">
    <FaBell
      size={20}
      style={{ color: "#FFD700", cursor: "pointer" }}
      title="Notifications"
    />
    <span
      className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
      style={{ width: "10px", height: "10px" }}
    ></span>
  </div>
)}


            {/* Profile Picture & Name */}
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login" className="text-white fw-semibold me-3">
                  Login
                </Nav.Link>
                <Button as={Link} to="/register" variant="outline-light" className="fw-semibold px-3">
                  Sign Up
                </Button>
              </>
            ) : (
              <Dropdown align="end">
               <Dropdown.Toggle as="div" className="d-flex align-items-center" style={{ cursor: "pointer" }}>
  <div
    className="d-flex justify-content-center align-items-center rounded-circle me-2"
    style={{
      width: "32px",
      height: "32px",
      backgroundColor: "#D9D9D9",
      color: "#5624d0",
      fontWeight: "bold",
      fontSize: "14px",
    }}
  >
    {user.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "U"}
  </div>
  <span style={{ fontFamily: "monospace", fontWeight: "bold", color: "white" }}>
    {user.name || user.email || "Profile"}
  </span>
</Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">Personal Details</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/submissions">My Submissions</Dropdown.Item>
                  
                  <Dropdown.Item as={Link} to="/saved-tasks">Saved Tasks</Dropdown.Item>
                  {/* <Dropdown.Item as={Link} to="/messages">Messages</Dropdown.Item> */}
                  <Dropdown.Item onClick={logoutAndRedirect}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;
