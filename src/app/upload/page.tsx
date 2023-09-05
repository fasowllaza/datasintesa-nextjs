'use client'
import React, { useState } from 'react';

import './upload.css'

const baseUrl = 'http://localhost:3001'

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('')

  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('files', selectedFile);
  
      fetch(`${baseUrl}/raw-data`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          setMessage('Upload Success')
        })
        .catch((error) => {
          setMessage('Upload Failed')
        });
    }
  };
  

  return (
    <div className='container'>
      <div>
        <h1>File Upload</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload</button>
        <h1>{message ? message: null}</h1>
      </div>
    </div>
  );
}
