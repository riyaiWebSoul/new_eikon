import React, { useState } from 'react';
import axios from 'axios';

function Backend() {
  const [responseData, setResponseData] = useState(null);

  const handlePost = async () => {
    try {
      const response = await axios.post('http://localhost:8080/about', { data: 'Your POST data here' });
      setResponseData(response.data);
    } catch (error) {
      console.error('Error making POST request:', error);
      // You can handle errors here, e.g., set an error state or display a message.
    }
  };

  const handleGet = async () => {
    try {
      const response = await axios.get('http://localhost:8080/about');
      setResponseData(response.data);
    } catch (error) {
      console.error('Error making GET request:', error);
      // Handle errors here.
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:8080/about');
      setResponseData(response.data);
    } catch (error) {
      console.error('Error making DELETE request:', error);
      // Handle errors here.
    }
  };

  const handlePut = async () => {
    try {
      const response = await axios.put('http://localhost:8080/about', { data: 'Your PUT data here' });
      setResponseData(response.data);
    } catch (error) {
      console.error('Error making PUT request:', error);
      // Handle errors here.
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.patch('http://localhost:8080/about', { data: 'Your PATCH data here' });
      setResponseData(response.data);
    } catch (error) {
      console.error('Error making PATCH request:', error);
      // Handle errors here.
    }
  };

  return (
    <div>
      <h2>Backend</h2>
      <button onClick={handlePost}>POST</button>
      <button onClick={handleGet}>GET</button>
      <button onClick={handleDelete}>DELETE</button>
      <button onClick={handlePut}>PUT</button>
      <button onClick={handleUpdate}>UPDATE</button>
      {responseData && (
        <div>
          <h3>Response Data:</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Backend;
