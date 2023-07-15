import React from 'react'
import {Container,Grow, Grid, Paper, AppBar,TextField,Button} from '@mui/material'

import { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux'
import useStyles from './styles'

import { getPosts,getPostsBySearch } from '../../actions/posts'
import { useNavigate, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'
 
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import Paginate from '../Pagination'

function useQuery(){
    return new URLSearchParams(useLocation().search)
}

function Home() {
    const [currentId,setCurrentId] = useState(0)
    const [search,setSearch] = useState('')
    const [tags,setTags] = useState([])

    
    const classes = useStyles();
    const dispatch = useDispatch([])

    const query = useQuery()
    const location = useLocation();
    const navigate = useNavigate()

    const page = query.get('page') || 1
    const searchQuery = query.get('search') 

    // useEffect(()=>{
    //     dispatch(getPosts())
    // },[currentId,dispatch])

    const handleKeyPress = (e) => {
        if (e.keycode === 13) {
            // navigate(`/posts?page=${page}&search=${searchQuery}`)
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

    const searchPost = () => {
        if(search.trim() || tags){
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }else{
            navigate('/')
        }   
    }

  return (
    <Grow in>
    <Container maxWidth='xl'>
        <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} md={8}>
                <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              <ChipInput label="Search Tags" style={{ margin: '10px 0' }} value={tags} onAdd={(chip) => handleAdd(chip)} onDelete={(chip) => handleDelete(chip)} variant='outlined' />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
                <Form currentId={currentId} setCurrentId={setCurrentId} />

                {(!searchQuery && !tags.length) &&  
                    <Paper elevation={6} className={classes.pagination}>
                         <Paginate page={page} />
                    </Paper>
                }
            </Grid>
        </Grid>
    </Container>  
   </Grow>
  )
}

export default Home
