// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Card, Container, Row, Col } from "react-bootstrap";

// const CategoryTasksPage = () => {
//   const { categoryName } = useParams();
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get(
//           `https://task-assigner-backend-8184.onrender.com/api/tasks/category/${categoryName}`
//         );
//         setTasks(response.data);
//       } catch (error) {
//         console.error("Error fetching category tasks:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, [categoryName]);

//   return (
//     <Container className="py-4">
//       <h2 className="mb-4">Tasks in: {decodeURIComponent(categoryName)}</h2>
//       {loading ? (
//         <p>Loading tasks...</p>
//       ) : tasks.length === 0 ? (
//         <p>No tasks found for this category.</p>
//       ) : (
//         <Row>
//           {tasks.map((task) => (
//             <Col key={task._id} sm={12} md={6} lg={4} className="mb-4">
//               <Card className="shadow-sm h-100">
//                 <Card.Body>
//                   <Card.Title>{task.title}</Card.Title>
//                   <Card.Text>{task.description}</Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default CategoryTasksPage;
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Card, Container, Row, Col } from "react-bootstrap";

const CategoryTasksPage = () => {
  const { categoryName } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `https://task-assigner-backend-8184.onrender.com/api/tasks/category/${categoryName}`
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching category tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [categoryName]);

  return (
    <Container className="py-4">
      <h2 className="mb-4">Tasks in: {decodeURIComponent(categoryName)}</h2>
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found for this category.</p>
      ) : (
        <Row>
          {tasks.map((task) => (
            <Col key={task._id} sm={12} md={6} lg={4} className="mb-4">
              {/* Wrap the task card with Link to navigate to the task detail page */}
              <Link to={`/task/${task._id}`} style={{ textDecoration: "none" }}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>{task.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CategoryTasksPage;
