import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export default function BlogCard({title, description, image, username, time, id, isUser}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`)
  }

  const handleDelete = async () => {
    try {
      const {data} = await axios.delete(`/api/v1/blog/delete-blog/${id}`)
      if(data?.success){
        alert('Blog Deleted')
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card sx={{ width: '40%',margin:'auto',mt:2, padding:2, boxShadow:'5px 5px 10px #ccc',':hover:':{
        boxShadow: '10px 10px 20px #ccc'
    } }}>
      {isUser && (
        <Box display={'flex'}>
          <IconButton onClick={handleEdit} sx={{marginLeft:'auto'}}>
            <EditIcon color='info'/>
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color='error'/>
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={username}
        subheader={time}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Blog"
      />
      <CardContent>
        <Typography variant="h6"  color= 'text.secondary' >
          Title : {title}
        </Typography>
        <Typography variant="body2"  color= 'text.secondary' >
          Description : {description}
        </Typography>
      </CardContent>

    </Card>
  );
}
