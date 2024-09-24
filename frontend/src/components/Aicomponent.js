import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios"; 
import { useNavigate } from 'react-router-dom';// Ensure you have Bootstrap installed

const AiComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false); 
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); // State for username

  useEffect(() => {
    // Function to fetch username
    const fetchUsername = async () => {
      const authToken = localStorage.getItem('authToken');
      console.log(authToken) // Retrieve authToken from local storage

      try {
        const response = await axios.post('http://localhost:5000/api/userDetails', {}, {
          headers: {
            Authorization: `Bearer ${authToken}`, // Use the auth token in the request
          },
        });
        console.log(response)

        // Assuming the API response contains the username
        if (response.data && response.data.username) {
          setUsername(response.data.username); 
          console.log("username",username)// Update username state
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUsername();
  }, [username]); // Run once on component mount
// State to manage history visibility

  const handleSubmit = () => {
    const userMessage = inputValue;
    const botReply = `Bot: You said "${userMessage}"`; // Placeholder for AI response

    // Extract the first three words from user input
    const firstThreeWords = userMessage.split(' ').slice(0, 3).join(' ');

    // Update conversation history with first three words of user input
    setHistory([...history, `User: ${firstThreeWords}`]);

    // Set the response (full conversation between user and bot)
    setResponse(`User: ${userMessage}\n${botReply}`);
    setInputValue('');
  };

  // Function to toggle history visibility
  const toggleHistory = () => {
    setIsHistoryVisible(!isHistoryVisible);
  };

  return (
    <div>
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            DrugChat
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a style = {{marginRight:"40px"}} className="nav-link" href="#" onClick={toggleHistory}>
                  History
                </a>
              </li>
              <li className="nav-item">
                <a style = {{marginRight:"40px"}} className="nav-link" href="#">
                  Explore
                </a>
              </li>
              <li className="nav-item">
                <a style = {{marginRight:"40px"}} className="nav-link" href="#">
                 New Chat
                </a>
              </li>
            </ul>
            <button className="btn btn-outline-danger ms-auto" type="button" onClick={() => navigate("/")}>
              Signout 
            </button>
          </div>
        </div>
      </nav>

      <div className="container-fluid mt-3">
        <div className="row">
          {/* Left Sidebar for Conversation History */}
          {isHistoryVisible && ( // Show history only when toggled
            <div className="col-md-3 bg-light border-end" style={{ height: '80vh', overflowY: 'scroll' }}>
              <h6>History</h6>
              <ul className="list-group">
                {history.map((entry, index) => (
                  <li key={index} className="list-group-item">
                    {entry}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Chat Area */}
          <div className={isHistoryVisible ? "col-md-9" : "col-md-12"}> {/* Adjust width based on history visibility */}
            <div className="main-page">
              <div className="header">
                <h1>Welcome, {username}!</h1>
              </div>
              <div className="content">
                {/* Response box that shows the user and bot conversation */}
                <div className="response-box">
                  <p>{response || 'Your conversation will appear here.'}</p>
                </div>
              </div>
              <div className="footer">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message here..."
                  />
                  <button style = {{height:"49px"}} className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiComponent;
