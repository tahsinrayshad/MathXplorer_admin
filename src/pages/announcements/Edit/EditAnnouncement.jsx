import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Grid } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditAnnouncement() {
  const { id } = useParams(); // Get announcement ID from URL
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch existing announcement details
  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/notice/single/${id}`);
        const notice = response.data.notice;

        setTitle(notice.title);
        setDescription(notice.content); // Ensure content is mapped correctly
      } catch (err) {
        console.error('Error fetching announcement:', err);
        setError('Failed to load the announcement');
      }
    };

    fetchAnnouncement();
  }, [id]);

  // Handle the announcement update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Access token is missing');
      return;
    }

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/notice/edit/`, // Ensure correct API endpoint
        {
          id,
          title,
          content: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate('/announcements'); // Redirect to announcements page after update
    } catch (err) {
      console.error('Error updating announcement:', err);
      setError('Failed to update the announcement');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Announcement
        </Typography>
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleUpdate}>
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                required
              />
              <Box sx={{ my: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <MDEditor value={description} onChange={setDescription} preview="edit" height={400} />
              </Box>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Update Announcement
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Preview
              </Typography>
              <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeMathjax]}>
                {description || 'Your description here...'}
              </ReactMarkdown>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
