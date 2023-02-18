import FileUpload from "@/components/file-upload";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Container, Divider, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Skeleton, TextField, Typography } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { ChangeEvent, useEffect, useState } from "react";
import rehypeSanitize from "rehype-sanitize";

const Upload = () => {
  const [ name, setName ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ usageNotes, setUsageNotes ] = useState('');
  const [ description, setDescription ] = useState('');
  /* const [ value, setValue ] = useState(''); */

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  }

  const handleUsageNotesChange = (value: string | undefined) => {
    if (value) setUsageNotes(value);
  }
  
  return (
    <Container>
      <Box sx={{ marginTop: '8px' }}>
        <Card>
          <CardHeader title="Create Your Model">
            {/* <Typography variant="h5" gutterBottom>Create Your Model</Typography> */}
          </CardHeader>
          <CardContent>
            <Divider textAlign="left" role="presentation">
              <Typography variant="h6" gutterBottom>General Information</Typography>
            </Divider>
            <table style={ { width: "100%"}}>
              <tbody>
                <tr>
                  <td colSpan={2} rowSpan={1} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Skeleton variant="circular" animation={false}>
                      <Avatar sx={{ width: 90, height: 90 }}/>
                    </Skeleton>
                  </td>
                  <td colSpan={8} rowSpan={2}>
                    <TextField label="Name" variant="outlined" value={name} onChange={handleNameChange} style={{ width: '100%' }}/>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={category}
                        label="Category"
                        onChange={handleCategoryChange}
                      >
                        <MenuItem value={'text'}>Text</MenuItem>
                        <MenuItem value={'audio'}>Audio</MenuItem>
                        <MenuItem value={'video'}>Video</MenuItem>
                      </Select>
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} rowSpan={1} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button>Upload</Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={10}>
                    <TextField
                      label="Description"
                      variant="outlined"
                      multiline
                      value={description}
                      onChange={handleDescriptionChange}
                      style={{ width: '100%' }}
                      margin="normal"
                      minRows={2}
                      maxRows={3}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <Divider textAlign="left" role="presentation">
              <Typography variant="h6" gutterBottom>Usage Notes</Typography>
            </Divider>
            
            <MDEditor
              style={{ marginBottom: '8px' }}
              value={usageNotes}
              onChange={handleUsageNotesChange}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
              /* renderTextarea={(props, { dispatch, onChange }) => {
                return (
                  <TextField {...props} variant="outlined" onChange={(e) => {
                    dispatch && dispatch({ markdown: e.target.value });
                    onChange && onChange(e.target.value);
                  }}/>
                )
              }} */
            />
            <Divider textAlign="left" role="presentation">
              <Typography variant="h6" gutterBottom>Files</Typography>
            </Divider>
            <FileUpload name={name} description={description}></FileUpload>
          </CardContent>
        <CardActions>
          <Button>Submit</Button>
        </CardActions>
        </Card>
      </Box>
      
    </Container>
  )
};

export default Upload;