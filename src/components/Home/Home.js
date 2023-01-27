import React, { useState, useEffect } from 'react';
import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination';
import useStyles from './Styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Home() {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
  
    useEffect(() => {
      dispatch(getPosts());
    }, [currentId, dispatch]);
    
    const keyChangeHandler = (e) => {
        if (e.keyCode === 13) {
            searchPostHandler();
        }
    }

    const addTagHandler = (tag) => {setTags([...tags, tag.toLowerCase()])};

    const deleteTagHandler = (tag) => {setTags(tags.filter((presentTag) => presentTag !== tag))}

    const searchPostHandler = () => {
        if(search.trim() || tags) {
            dispatch(getPostsBySearch({
                search: search,
                tags: tags.join(',')
            }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/');
        }
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}> 
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar 
                            className={classes.appBarSearch}
                            position="static"
                            color='inherit'>
                                <TextField 
                                    name='search'
                                    variant='outlined'
                                    label="Search Posts"
                                    fullWidth
                                    value={search} 
                                    onKeyPress={keyChangeHandler}
                                    onChange={(e) => setSearch(e.target.value)}   
                                /> 

                                <ChipInput 
                                    style={{ margin: '10px 0' }}
                                    value={tags}
                                    onAdd={addTagHandler}
                                    onDelete={deleteTagHandler}
                                    label="Search Tags"
                                    variant='outlined'
                                />

                                <Button
                                onClick={searchPostHandler}
                                className={classes.searchButton}
                                color="primary"
                                variant='contained'>
                                    Search
                                </Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        {(!searchQuery && !tags.length) && <Paper elevation={6}>
                            <Pagination page={page} />
                        </Paper>}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home