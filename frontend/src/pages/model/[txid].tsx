import useArweave from "@/context/arweave";
import { Avatar, Card, CardContent, Container, Divider, FormControl, InputLabel, MenuItem, Select, Skeleton, SvgIcon, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState, MouseEvent } from "react";
import BasicTable from "@/components/basic-table";;
import Stamp from '@/components/stamp';

const SkeletonDetail = () => {
  return (
    <Box display='flex'>
      <Box>
        <Skeleton variant="circular"  width={90} height={90}/>
      </Box>
      <Box>
        <Typography component="div" variant='h1'>
          <Skeleton />
        </Typography>
      </Box>
    </Box>
  )
}

const Model = () => { 
  const { getData, getDataPromise } = useArweave(); 
  const router = useRouter();
  const { txid } = router.query;


  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (txid) {
      /* setLoading(true)

      getDataPromise(txid as string).then((result) => {
        console.log(result);
        setData(result as any);
        setLoading(false);
      }) */
    }
    
  }, [ txid, getDataPromise ]);

  useEffect(() => {
    if (router.isReady) {
      // Code using query
      console.log(router.query);
    }
  }, [ router ]);

  /* if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p> */

  const openDialog = (event: MouseEvent<HTMLButtonElement>) => {

  }

  return (
    <Container>
      <Box sx={{ margin: '8px' }}>
        <Card>
          <CardContent>
            <Box display={'flex'} justifyContent={'space-evenly'}>
              <Box display={'flex'} flexDirection={'column'}>
                <Avatar sx={ { width: '200px', height: '200px' }}/>
                {/* <Box marginTop={'8px'} display={'flex'} justifyContent={'flex-start'}>
                  <Button startIcon={<DownloadIcon />}>
                    <a href={`http://localhost:1984/${txid}`} download>download</a>
                  </Button>
                  <Button endIcon={<OpenInNewIcon />} onClick={openDialog}>Usage Notes</Button>
                </Box> */}
                <Box>
                  <SvgIcon>
                    <Stamp />
                  </SvgIcon>
                  {/* <IconButton aria-label="upvote">
                    <ThumbUpIcon />
                  </IconButton>
                  38
                  <IconButton aria-label="downvote">
                    <ThumbDownIcon />
                  </IconButton> */}
                </Box>
                
              </Box>
              <Box>
                <TextField label="Name" variant="outlined" value={''} fullWidth inputProps={{ readOnly: true }}/>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={'text'}
                    label="Category"
                    inputProps={{ readOnly: true }}
                  >
                    <MenuItem value={'text'}>Text</MenuItem>
                    <MenuItem value={'audio'}>Audio</MenuItem>
                    <MenuItem value={'video'}>Video</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Description"
                  variant="outlined"
                  multiline
                  value={''}
                  inputProps={{ readOnly: true }}
                  style={{ width: '100%' }}
                  margin="normal"
                  minRows={2}
                  maxRows={3}
                />
              </Box>
            </Box>
            <Divider textAlign='left'>
              <Typography variant="h6">Operators</Typography>
            </Divider>
            <BasicTable />
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default Model;