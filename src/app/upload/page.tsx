'use client'

import React, { useState } from 'react';

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const baseUrl = 'http://localhost:3001'

  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('files', selectedFile);
  
      fetch(`http://localhost:3001/raw-data`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => console.log(response))
        .then((data) => {
          console.log('file uploaded')
        })
        .catch((error) => {
          console.error('File upload error:', error);
        });
    }
  };
  

  return (
    <div>
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
}
