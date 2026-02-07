import { useState } from 'react'
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import axios from 'axios'

function App() {
  const [emailContent, setEmailContent] = useState('')
  const [tone, setTone] = useState('')
  const [generatedReply, setGeneratedReply] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerateReply = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone
      })
      
      // if (!response.ok) {
      //   throw new Error('Failed to generate reply')
      // }
      
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Container maxWidth="sm" sx={{pt:4}}>
        <Typography 
        variant="h4"
        component="h1" 
        gutterBottom 
        align="center"
        sx={{mb:2}}
        >
          Email Reply Generator
        </Typography>
        <Box component="section" sx={{mx:3}}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            label="Email Content"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{mb:2}}
            margin="normal"
          />
          
          {/* For simplicity, we can use a dropdown for tone selection */}


            <FormControl fullWidth margin="normal">
              <InputLabel id="tone-label">Tone (Optional)</InputLabel>
              <Select
                id="tone"
                labelId="tone-label"
                value={tone}
                label="Tone (Optional)"
                onChange={(e) => setTone(e.target.value)}
                
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Formal">Formal</MenuItem>
                <MenuItem value="Casual">Casual</MenuItem>
                <MenuItem value="Friendly">Friendly</MenuItem>
                <MenuItem value="Professional">Professional</MenuItem>
              </Select>
            </FormControl>


          <Button 
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleGenerateReply}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? 'Generating...' : 'Generate Reply'}
          </Button>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          {generatedReply && (
          <>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            label="generated Reply"
            value={generatedReply}
            onChange={(e) => setGeneratedReply(e.target.value)}
            sx={{mb:2}}
            margin="normal"
          />
              <Button variant="outlined" onClick={() => navigator.clipboard.writeText(generatedReply)}>Copy</Button>
              </>
          )}

        </Box>
      </Container>  
    </>
  )
}

export default App
