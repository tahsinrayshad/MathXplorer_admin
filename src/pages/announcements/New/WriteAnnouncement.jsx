import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Grid } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import axios from 'axios'; // Make sure this path is correct for your axios instance
import { useNavigate } from 'react-router-dom';

export default function AnnouncementWriter() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('Access token is missing');
      return; // If there's no token, stop the submission
    }
  
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/notice/create/',
        {
          title, // Ensure 'title' is sent
          content: description, // Map 'description' to 'content' to match backend
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
  
      console.log('Announcement posted:', response.data);
  
      // Clear the form and error state
      setTitle('');
      setDescription('');
      setError(null);
  
      // Redirect to the announcements page
      navigate('/announcements');  // Navigate to '/announcements' after successful submission
    } catch (err) {
      if (err.response && err.response.data) {
        console.error('Error response from server:', err.response.data);
        setError(err.response.data); // Set the error response from the server
      } else {
        console.error('Error submitting announcement:', err);
      }
    }
  };
  
  

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Write a New Announcement
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                required
                error={!!error?.title}
                helperText={error?.title ? error.title[0] : ''}
              />
              <Box sx={{ my: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <MDEditor
                  value={description}
                  onChange={setDescription}
                  preview="edit"
                  height={400}
                />
                {error?.description && (
                  <Typography color="error" variant="body2">
                    {error.description[0]}
                  </Typography>
                )}
              </Box>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                fullWidth
              >
                Publish Announcement
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Preview
              </Typography>
              <Typography variant="h5" gutterBottom>
                {title || 'Your Title Here'}
              </Typography>
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeMathjax]}
              >
                {description || 'Your description here...'}
              </ReactMarkdown>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
