import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [user1Token, setUser1Token] = useState('');
  const [user2Token, setUser2Token] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ poolId: '', user1Id: '', user2Id: '' });

  // Handle input changes for user tokens
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Prepare the request body
    const requestBody = {
      user1Id: user1Token,
      user2Id: user2Token,
    };

    try {
      // Make the Axios POST request
      const response = await axios.post('http://ec2-18-205-185-36.compute-1.amazonaws.com/api/create-pool', requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
        maxRedirects: 5, // Allow a maximum number of redirects
      });

      // Assuming the response contains the pool ID and user IDs
      const responseData = response.data;
      console.log('Response:', JSON.stringify(responseData, null, 2));

      // Set modal data and show modal
      setModalData({
        poolId: responseData.poolId,
        user1Id: responseData.user1Id,
        user2Id: responseData.user2Id,
      });
      setIsModalOpen(true); // Open modal

    } catch (error) {
      console.error('Error:', error);
      // Handle error here
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <div className="App">
      <section>
        <div className="signin">
          <div className="content">
            <h2>Create Pool</h2>
            <div className="form">
              <div className="inputBox">
                <input
                  type="text"
                  required
                  value={user1Token}
                  onChange={(e) => handleInputChange(e, setUser1Token)}
                />
                <i>User 1 token</i>
              </div>
              <div className="inputBox">
                <input
                  type="text"
                  required
                  value={user2Token}
                  onChange={(e) => handleInputChange(e, setUser2Token)}
                />
                <i>User 2 token</i>
              </div>

              <div className="inputBox">
                <input type="submit" value="Create" onClick={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Pool Created</h3>
            <p>Pool ID: {modalData.poolId}</p>
            <p>User 1 ID: {modalData.user1Id}</p>
            <p>User 2 ID: {modalData.user2Id}</p>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
