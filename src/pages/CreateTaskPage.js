

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Container,
//   Form,
//   Button,
//   Row,
//   Col,
//   Spinner,
//   Alert,
// } from 'react-bootstrap';

// const CreateTaskPage = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [deadline, setDeadline] = useState('');
//   const [category, setCategory] = useState('');
//   const [subcategory, setSubcategory] = useState('');
//   const [budget, setBudget] = useState('');
//   const [files, setFiles] = useState([]);
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [subcategoriesList, setSubcategoriesList] = useState([]);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const [experienceLevel, setExperienceLevel] = useState('');
//   const [timeCommitment, setTimeCommitment] = useState('');
//   const [deliverables, setDeliverables] = useState('');
//   const [communicationExpectations, setCommunicationExpectations] = useState('');
//   const [additionalNotes, setAdditionalNotes] = useState('');

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const creatorToken = localStorage.getItem("token");
//       try {
//         const res = await axios.get(
//           "https://task-assigner-backend-8184.onrender.com/api/categories",
//           {
//             headers: {
//               Authorization: `Bearer ${creatorToken}`,
//             },
//           }
//         );
//         setCategories(res.data);
//       } catch (err) {
//         console.error("Failed to fetch categories", err);
//       }
//     };

//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const fetchSubcategories = async () => {
//       if (category) {
//         try {
//           const res = await axios.get(
//             `https://task-assigner-backend-8184.onrender.com/api/categories/${category}/subcategories`
//           );
//           setSubcategoriesList(res.data);
//         } catch (err) {
//           console.error("Failed to fetch subcategories", err);
//         }
//       }
//     };

//     fetchSubcategories();
//   }, [category]);

//   const handleFileChange = (e) => {
//     setFiles([...e.target.files]);
//   };

//   const uploadFiles = async () => {
//     if (!files.length) return [];
//     const uploaded = [];
    
//     // Get the user token from localStorage
//     const token = localStorage.getItem('token');
    
//     for (const file of files) {
//       const formData = new FormData();
//       formData.append('file', file);
      
//       try {
//         setUploading(true);
        
//         const res = await axios.post(
//           'https://task-assigner-backend-8184.onrender.com/api/upload', 
//           formData, 
//           {
//             headers: { 
//               'Content-Type': 'multipart/form-data', 
//               Authorization: `Bearer ${token}` // Adding the Authorization header with the token
//             }
//           }
//         );
        
//         uploaded.push(res.data.url);
//       } catch (err) {
//         console.error('Error uploading file:', err);
//         setError('Failed to upload file');
//         setUploading(false);
//         return [];
//       }
//     }
  
//     setUploading(false);
//     setUploadedFiles(uploaded);
//     return uploaded;
//   };
  

//   const handleCreateTask = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       const uploaded = await uploadFiles();
//       if (files.length && !uploaded.length) return;

//       const res = await axios.post('https://task-assigner-backend-8184.onrender.com/api/tasks', {
//         title,
//         description,
//         deadline,
//         category,
//         subcategory,
//         budget,
//         attachments: uploaded,
//         experienceLevel,
//         timeCommitment,
//         deliverables,
//         communicationExpectations,
//         additionalNotes
//       });

//       setSuccess('Task created successfully!');
//       setTitle('');
//       setDescription('');
//       setDeadline('');
//       setCategory('');
//       setSubcategory('');
//       setBudget('');
//       setFiles([]);
//       setUploadedFiles([]);
//       setExperienceLevel('');
//       setTimeCommitment('');
//       setDeliverables('');
//       setCommunicationExpectations('');
//       setAdditionalNotes('');
//     } catch (err) {
//       console.error('Error creating task:', err);
//       setError('Failed to create task');
//     }
//   };

//   return (
//     <Container className="py-5">
//       <h1><strong>Create Task</strong></h1>

//       {error && <Alert variant="danger">{error}</Alert>}
//       {success && <Alert variant="success">{success}</Alert>}

//       <Form onSubmit={handleCreateTask}>
//         <Form.Group className="mb-3" controlId="title">
//           <Form.Label>Task Title</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter task title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="description">
//           <Form.Label>Description</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={4}
//             placeholder="Enter task description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Row>
//           <Col md={6}>
//             <Form.Group className="mb-3" controlId="deadline">
//               <Form.Label>Deadline</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={deadline}
//                 onChange={(e) => setDeadline(e.target.value)}
//                 required
//               />
//             </Form.Group>
//           </Col>

//           <Col md={6}>
//             <Form.Group className="mb-3" controlId="budget">
//               <Form.Label>Budget (₹)</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter budget"
//                 value={budget}
//                 onChange={(e) => setBudget(e.target.value)}
//                 required
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         <Row>
//           <Col md={6}>
//             <Form.Group className="mb-3" controlId="category">
//               <Form.Label>Category</Form.Label>
//               <Form.Select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 required
//               >
//                 <option value="">Select category</option>
//                 {categories.map((cat) => (
//                   <option key={cat._id} value={cat._id}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>

//           <Col md={6}>
//             <Form.Group className="mb-3" controlId="subcategory">
//               <Form.Label>Subcategory</Form.Label>
//               <Form.Select
//                 value={subcategory}
//                 onChange={(e) => setSubcategory(e.target.value)}
//                 required
//                 disabled={!category} // Disable subcategory dropdown if no category is selected
//               >
//                 <option value="">Select subcategory</option>
//                 {subcategoriesList.map((sub, idx) => (
//                   <option key={idx} value={sub._id}>
//                     {sub.name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//         </Row>

//         <Form.Group className="mb-3" controlId="experienceLevel">
//           <Form.Label>Experience Level</Form.Label>
//           <Form.Select
//             value={experienceLevel}
//             onChange={(e) => setExperienceLevel(e.target.value)}
//           >
//             <option value="">Select experience level</option>
//             <option value="Beginner">Beginner</option>
//             <option value="Intermediate">Intermediate</option>
//             <option value="Expert">Expert</option>
//           </Form.Select>
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="timeCommitment">
//           <Form.Label>Time Commitment</Form.Label>
//           <Form.Select
//             value={timeCommitment}
//             onChange={(e) => setTimeCommitment(e.target.value)}
//           >
//             <option value="">Select time commitment</option>
//             <option value="12 hours">12 hours</option>
//             <option value="4 days/week">4 days/week</option>
//             <option value="Full-time">Full-time</option>
//             <option value="Milestone-based">Milestone-based</option>
//           </Form.Select>
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="deliverables">
//           <Form.Label>Deliverables</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Describe deliverables"
//             value={deliverables}
//             onChange={(e) => setDeliverables(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="communicationExpectations">
//           <Form.Label>Communication Expectations</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="e.g. Weekly syncs, daily updates"
//             value={communicationExpectations}
//             onChange={(e) => setCommunicationExpectations(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="additionalNotes">
//           <Form.Label>Additional Notes</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={2}
//             placeholder="Any extra notes"
//             value={additionalNotes}
//             onChange={(e) => setAdditionalNotes(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="formFile" className="mb-3">
//           <Form.Label>Upload Files</Form.Label>
//           <Form.Control type="file" multiple onChange={handleFileChange} />
//         </Form.Group>

//         <Button variant="primary" type="submit" disabled={uploading}>
//           {uploading ? (
//             <>
//               <Spinner
//                 as="span"
//                 animation="border"
//                 size="sm"
//                 role="status"
//                 aria-hidden="true"
//               />{' '}
//               Uploading...
//             </>
//           ) : (
//             'Create Task'
//           )}
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default CreateTaskPage;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Spinner,
  Alert,
} from 'react-bootstrap';

const CreateTaskPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [budget, setBudget] = useState('');
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategoriesList, setSubcategoriesList] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [experienceLevel, setExperienceLevel] = useState('');
  const [timeCommitment, setTimeCommitment] = useState('');
  const [deliverables, setDeliverables] = useState('');
  const [communicationExpectations, setCommunicationExpectations] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const creatorToken = localStorage.getItem("token");
      try {
        const res = await axios.get(
          "https://task-assigner-backend-8184.onrender.com/api/categories",
          {
            headers: {
              Authorization: `Bearer ${creatorToken}`,
            },
          }
        );
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (category) {
        try {
          const res = await axios.get(
            `https://task-assigner-backend-8184.onrender.com/api/categories/${category}/subcategories`
          );
          setSubcategoriesList(res.data);
        } catch (err) {
          console.error("Failed to fetch subcategories", err);
        }
      }
    };

    fetchSubcategories();
  }, [category]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const uploadFiles = async () => {
    if (!files.length) return [];
    const uploaded = [];
    const token = localStorage.getItem('token');

    for (const file of files) {
      const formData = new FormData();
      formData.append('attachments', file);

      try {
        setUploading(true);

        const res = await axios.post(
          'https://task-assigner-backend-8184.onrender.com/api/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        uploaded.push(res.data.url); // assuming backend returns `{ url: "..." }`
      } catch (err) {
        console.error('Error uploading file:', err);
        setError('Failed to upload file');
        setUploading(false);
        return [];
      }
    }

    setUploading(false);
    setUploadedFiles(uploaded);
    return uploaded;
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');

    try {
      const uploaded = await uploadFiles();
      if (files.length && !uploaded.length) return;

      const res = await axios.post(
        'https://task-assigner-backend-8184.onrender.com/api/tasks',
        {
          title,
          description,
          deadline,
          category,
          subcategory,
          budget,
          attachments: uploaded,
          experienceLevel,
          timeCommitment,
          deliverables,
          communicationExpectations,
          additionalNotes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess('Task created successfully!');
      setTitle('');
      setDescription('');
      setDeadline('');
      setCategory('');
      setSubcategory('');
      setBudget('');
      setFiles([]);
      setUploadedFiles([]);
      setExperienceLevel('');
      setTimeCommitment('');
      setDeliverables('');
      setCommunicationExpectations('');
      setAdditionalNotes('');
    } catch (err) {
      console.error('Error creating task:', err.response || err.message);
      setError('Failed to create task');
    }
  };

  return (


        <Container className="py-5">
      <h1><strong>Create Task</strong></h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleCreateTask}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="deadline">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="budget">
              <Form.Label>Budget (₹)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="subcategory">
              <Form.Label>Subcategory</Form.Label>
              <Form.Select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                required
                disabled={!category} // Disable subcategory dropdown if no category is selected
              >
                <option value="">Select subcategory</option>
                {subcategoriesList.map((sub, idx) => (
                  <option key={idx} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="experienceLevel">
          <Form.Label>Experience Level</Form.Label>
          <Form.Select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
          >
            <option value="">Select experience level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="timeCommitment">
          <Form.Label>Time Commitment</Form.Label>
          <Form.Select
            value={timeCommitment}
            onChange={(e) => setTimeCommitment(e.target.value)}
          >
            <option value="">Select time commitment</option>
            <option value="12 hours">12 hours</option>
            <option value="4 days/week">4 days/week</option>
            <option value="Full-time">Full-time</option>
            <option value="Milestone-based">Milestone-based</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="deliverables">
          <Form.Label>Deliverables</Form.Label>
          <Form.Control
            type="text"
            placeholder="Describe deliverables"
            value={deliverables}
            onChange={(e) => setDeliverables(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="communicationExpectations">
          <Form.Label>Communication Expectations</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. Weekly syncs, daily updates"
            value={communicationExpectations}
            onChange={(e) => setCommunicationExpectations(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="additionalNotes">
          <Form.Label>Additional Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Any extra notes"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
          />
        </Form.Group>

    
   

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Files</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileChange} />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={uploading}>
          {uploading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{' '}
              Uploading...
            </>
          ) : (
            'Create Task'
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateTaskPage;
