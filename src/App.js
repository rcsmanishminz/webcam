import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { Button, Grid, Typography } from '@mui/material';

const App = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setSelectedFile(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result;
        setCapturedImage(null);
        setSelectedFile(base64Url); // Set the base64 URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h1" gutterBottom>
        Webcam and Image Upload
      </Typography>
      <Webcam
        audio={false}
        height={300}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
        style={{ borderRadius: '8px' }}
      />
      <Grid container justifyContent="center" spacing={2} style={{ marginTop: '8px' }}>
        <Grid item>
          <Button onClick={captureImage} variant="contained" color="primary">
            Capture Image
          </Button>
        </Grid>
        <Grid item>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            id="fileInput"
          />
          <label htmlFor="fileInput">
            <Button variant="contained" color="primary" component="span">
              Choose File
            </Button>
          </label>
        </Grid>
      </Grid>
      <Typography variant="h2" gutterBottom style={{ marginTop: '16px' }}>
        Captured Image:
      </Typography>
      <div style={{ textAlign: 'center' }}>
        {capturedImage && (
          <img src={capturedImage} alt="Captured" style={{ width: '50%', borderRadius: '8px' }} />
        )}
      </div>
      <Typography variant="h2" gutterBottom style={{ marginTop: '16px' }}>
        Uploaded Image:
      </Typography>
      <div style={{ textAlign: 'center' }}>
        {selectedFile && (
          <img src={selectedFile} alt="Uploaded" style={{ width: '50%', borderRadius: '8px' }} />
        )}
      </div>
    </div>
  );
};

export default App;
