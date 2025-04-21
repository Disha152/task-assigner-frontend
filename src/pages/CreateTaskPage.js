


// import React, { useState } from "react";
// import axios from "axios";
// import { Form, Button, Container, Alert } from "react-bootstrap";

// const CreateTaskPage = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [budget, setBudget] = useState("");
//   const [deadline, setDeadline] = useState("");
//   const [skills, setSkills] = useState("");
//   const [category, setCategory] = useState("");  // State for category
//   const [subcategory, setSubcategory] = useState("");  // State for subcategory
//   const [files, setFiles] = useState([]);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleFileChange = (e) => {
//     setFiles(e.target.files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     const taskData = {
//       title,
//       description,
//       budget: parseInt(budget),
//       deadline,
//       skills: skills.split(",").map((s) => s.trim()),
//       category,  // Add category to task data
//       subcategory,  // Add subcategory to task data
//     };

//     const creatorToken = localStorage.getItem("token");

//     // Prepare form data for file upload
//     const formData = new FormData();
//     Array.from(files).forEach((file) => {
//       formData.append("attachments", file);
//     });

//     try {
//       // Step 1: Upload files to Cloudinary (or your chosen service)
//       const fileUploadRes = await axios.post(
//         "https://task-assigner-backend-8184.onrender.com/api/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${creatorToken}`,
//           },
//         }
//       );

//       // Step 2: Add file URLs to task data
//       taskData.attachments = fileUploadRes.data.urls;

//       // Step 3: Create Task with attached files
//       const response = await axios.post(
//         "https://task-assigner-backend-8184.onrender.com/api/tasks",
//         taskData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${creatorToken}`,
//           },
//         }
//       );

//       setMessage("Task created successfully!");
//       console.log("Task:", response.data);
//       // Clear form
//       setTitle("");
//       setDescription("");
//       setBudget("");
//       setDeadline("");
//       setSkills("");
//       setCategory("");
//       setSubcategory("");
//       setFiles([]);
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Error creating task. Please try again."
//       );
//     }
//   };

//   const categories = [
//     "Software Development",
//     "Data Science",
//     "Cybersecurity",
//     "Cloud Computing",
//     "UI/UX Design",
//     "DevOps",
//     "Business",
//     "Marketing",
//     "Sales",
//     "Human Resources",
//     "Design",
//     "Writing",
//     "Graphic Design",
//     "Video Production",
//     "Photography",
//     "Music Production",
//     "Project Management",
//     "Virtual Assistance",
//     "Customer Support",
//     "Research Assistance",
//     "Others"
//   ];

//   return (
//     <Container className="py-5" style={{ maxWidth: "600px" }}>
//       <h2 className="mb-4 text-center fw-bold display-5">Create New Task</h2>

//       {message && <Alert variant="success">{message}</Alert>}
//       {error && <Alert variant="danger">{error}</Alert>}

//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label>Title</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Task title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Description</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             placeholder="Task description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Budget (in INR)</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="Enter budget"
//             value={budget}
//             onChange={(e) => setBudget(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Deadline</Form.Label>
//           <Form.Control
//             type="date"
//             value={deadline}
//             onChange={(e) => setDeadline(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Skills (comma-separated)</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="e.g. HTML, CSS, JS"
//             value={skills}
//             onChange={(e) => setSkills(e.target.value)}
//             required
//           />
//         </Form.Group>

//         {/* Category input */}
//         <Form.Group className="mb-3">
//           <Form.Label>Category</Form.Label>
//           <Form.Control
//             as="select"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//           >
//             <option value="">Select a category</option>
//             {categories.map((category, index) => (
//               <option key={index} value={category}>
//                 {category}
//               </option>
//             ))}
//           </Form.Control>
//         </Form.Group>

//         {/* Subcategory input */}
//         {category && category !== "Others" && (
//           <Form.Group className="mb-3">
//             <Form.Label>Subcategory</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Type Subcategory"
//               value={subcategory}
//               onChange={(e) => setSubcategory(e.target.value)}
//               required
//             />
//           </Form.Group>
//         )}
        
//         {/* Custom Subcategory if 'Others' is selected */}
//         {category === "Others" && (
//           <Form.Group className="mb-3">
//             <Form.Label>Custom Subcategory</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter custom subcategory"
//               value={subcategory}
//               onChange={(e) => setSubcategory(e.target.value)}
//               required
//             />
//           </Form.Group>
//         )}

//         {/* File upload field */}
//         <Form.Group className="mb-3">
//           <Form.Label>Attachments (PDFs, Videos, Images)</Form.Label>
//           <Form.Control
//             type="file"
//             multiple
//             onChange={handleFileChange}
//             accept=".pdf, .jpg, .jpeg, .png, .mp4, .mov, .avi"
//           />
//         </Form.Group>

//         <Button
//           type="submit"
//           className="w-100"
//           style={{ backgroundColor: "#5624d0", borderColor: "#5624d0" }}
//         >
//           Create Task
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default CreateTaskPage;

import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";

const CreateTaskPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [skills, setSkills] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [files, setFiles] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("");
  const [deliverables, setDeliverables] = useState("");
  const [communicationExpectations, setCommunicationExpectations] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const taskData = {
      title,
      description,
      budget: parseInt(budget),
      deadline,
      skills: skills.split(",").map((s) => s.trim()),
      category,
      subcategory,
      experienceLevel,
      timeCommitment,
      deliverables,
      communicationExpectations,
      additionalNotes,
    };

    const creatorToken = localStorage.getItem("token");

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("attachments", file);
    });

    try {
      const fileUploadRes = await axios.post(
        "https://task-assigner-backend-8184.onrender.com/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${creatorToken}`,
          },
        }
      );

      taskData.attachments = fileUploadRes.data.urls;

      const response = await axios.post(
        "https://task-assigner-backend-8184.onrender.com/api/tasks",
        taskData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${creatorToken}`,
          },
        }
      );

      setMessage("Task created successfully!");
      console.log("Task:", response.data);

      setTitle("");
      setDescription("");
      setBudget("");
      setDeadline("");
      setSkills("");
      setCategory("");
      setSubcategory("");
      setFiles([]);
      setExperienceLevel("");
      setTimeCommitment("");
      setDeliverables("");
      setCommunicationExpectations("");
      setAdditionalNotes("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Error creating task. Please try again."
      );
    }
  };

  const categories = [
    "Software Development", "Data Science", "Cybersecurity", "Cloud Computing", "UI/UX Design", "DevOps", "Business", "Marketing", "Sales", "Human Resources", "Design", "Writing", "Graphic Design", "Video Production", "Photography", "Music Production", "Project Management", "Virtual Assistance", "Customer Support", "Research Assistance", "Others"
  ];

  return (
    <Container className="py-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center fw-bold display-5">Create New Task</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        {/* Title, Description, Budget, Deadline, Skills, Category, Subcategory */}
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Task description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Budget (in INR)</Form.Label>
          <Form.Control type="number" placeholder="Enter budget" value={budget} onChange={(e) => setBudget(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Deadline</Form.Label>
          <Form.Control type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Skills (comma-separated)</Form.Label>
          <Form.Control type="text" placeholder="e.g. HTML, CSS, JS" value={skills} onChange={(e) => setSkills(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select a category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </Form.Control>
        </Form.Group>

        {category && category !== "Others" && (
          <Form.Group className="mb-3">
            <Form.Label>Subcategory</Form.Label>
            <Form.Control type="text" placeholder="Type Subcategory" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} required />
          </Form.Group>
        )}

        {category === "Others" && (
          <Form.Group className="mb-3">
            <Form.Label>Custom Subcategory</Form.Label>
            <Form.Control type="text" placeholder="Enter custom subcategory" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} required />
          </Form.Group>
        )}

        {/* 🔽 New Fields */}
        <Form.Group className="mb-3">
          <Form.Label>Experience Level</Form.Label>
          <Form.Control as="select" value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} required>
            <option value="">Select experience level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Expected Time Commitment</Form.Label>
          <Form.Control as="select" value={timeCommitment} onChange={(e) => setTimeCommitment(e.target.value)} required>
            <option value="">Select time commitment</option>
            <option value="12 hours/week">12 hours/week</option>
            <option value="4 days/week">4 days/week</option>
            <option value="Full-time">Full-time</option>
            <option value="Milestone-based">Milestone-based</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Deliverables</Form.Label>
          <Form.Control as="textarea" rows={2} placeholder="Specify expected outputs from freelancer" value={deliverables} onChange={(e) => setDeliverables(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Communication Expectations</Form.Label>
          <Form.Control as="textarea" rows={2} placeholder="e.g. Weekly meetings, daily updates, preferred channels" value={communicationExpectations} onChange={(e) => setCommunicationExpectations(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Additional Notes</Form.Label>
          <Form.Control as="textarea" rows={2} placeholder="Special instructions, reference links, group links" value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} />
        </Form.Group>

        {/* File Upload */}
        <Form.Group className="mb-3">
          <Form.Label>Attachments (PDFs, Videos, Images)</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileChange} accept=".pdf, .jpg, .jpeg, .png, .mp4, .mov, .avi" />
        </Form.Group>

        <Button type="submit" className="w-100" style={{ backgroundColor: "#5624d0", borderColor: "#5624d0" }}>
          Create Task
        </Button>
      </Form>
    </Container>
  );
};

export default CreateTaskPage;
