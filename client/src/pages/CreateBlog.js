import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CreateBlog = () => {
    const id = localStorage.getItem('userId')
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        title:'',
        description:'',
        image:''
    })

    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post('/api/v1/blog/create-blog',{
                title: inputs.title,
                description: inputs.description,
                image : inputs.image,
                user : id
            })
            if(data?.success){
                alert('Blog Created')
                navigate('/my-blogs')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box width={'50%'} border={3} borderRadius={10} padding={3} margin={'auto'} boxShadow={'10px 10px 20px #ccc'} display={'flex'} flexDirection={'column'} marginTop={'30px'}>
            <Typography variant='h2' textAlign={'center'} fontWeight={'bold'} padding={3} color='gray'>Create a Blog</Typography>
            <InputLabel sx={{mb:1, mt:2, fontSize:'24px', fontWeight:'bold'}}>Title</InputLabel>
            <TextField name='title' value={inputs.title} onChange={handleChange} margin='normal' variant='outlined' required></TextField>
            <InputLabel sx={{mb:1, mt:2, fontSize:'24px', fontWeight:'bold'}}>Description</InputLabel>
            <TextField name='description' value={inputs.description} onChange={handleChange} margin='normal' variant='outlined' required></TextField>
            <InputLabel sx={{mb:1, mt:2, fontSize:'24px', fontWeight:'bold'}}>Image URL</InputLabel>
            <TextField name='image' value={inputs.image} onChange={handleChange} margin='normal' variant='outlined' required></TextField>
            <Button type='submit' color='primary' variant='contained'>Submit</Button>
        </Box>
      </form>
    </>
  )
}

export default CreateBlog
