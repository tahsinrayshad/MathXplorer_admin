import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex'; // LaTeX support
import remarkMath from 'remark-math'; // Markdown math support
import 'katex/dist/katex.min.css'; // Required CSS for LaTeX rendering
import { useNavigate } from 'react-router-dom';

export default function AnnouncementsTable() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/notice/all/');
        if (!response.ok) {
          throw new Error('Failed to fetch announcements');
        }
        const data = await response.json();

        // Sort announcements by created_at (latest first)
        const sortedAnnouncements = data.notices.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setAnnouncements(sortedAnnouncements);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Access token is missing');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/notice/delete/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete the announcement');
      }

      setAnnouncements((prevState) =>
        prevState.filter((announcement) => announcement.id !== id)
      );
    } catch (err) {
      console.error('Error deleting the announcement:', err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/announcements/edit/${id}`);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
    };
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 900, textTransform: 'uppercase', mb: 4 }}>
          Announcements
        </Typography>
      </Box>

      {loading && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading &&
        !error &&
        announcements.map((announcement) => {
          const { date, time } = formatDateTime(announcement.created_at);

          return (
            <Box
              key={announcement.id}
              sx={{
                display: 'flex',
                alignItems: 'stretch',
                border: '1px solid #ddd',
                mb: 2,
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              {/* Left Blue Border */}
              <Box
                sx={{
                  width: '3px',
                  backgroundColor: '#1976D2', // Blue color of "New Announcement" button
                  flexShrink: 0,
                }}
              />

              <Accordion
                sx={{
                  flex: 1,
                  boxShadow: 'none',
                  border: 'none',
                  '&:before': { display: 'none' },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ flex: '1 1 auto', fontWeight: 800, fontSize: '18px' }}>
                    {announcement.title}
                  </Typography>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography sx={{ color: 'text.secondary', fontSize: '10px' }}>{date}</Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '9px' }}>{time}</Typography>
                  </Box>
                </AccordionSummary>

                <AccordionDetails>
                  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {announcement.content}
                  </ReactMarkdown>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <IconButton onClick={() => handleEdit(announcement.id)} sx={{ marginRight: 2 }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(announcement.id)} sx={{ color: 'error.main' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          );
        })}
    </Container>
  );
}
