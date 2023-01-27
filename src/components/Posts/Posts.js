import React from "react";
import { useSelector } from 'react-redux'
import { CircularProgress, Grid } from "@material-ui/core";

import Post from './Post/Post';
import useStyles from './Styles';

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    // console.log('New', posts);
    const classes = useStyles();

    // console.log('Posts.js', posts);

    if (!isLoading && !posts.length) return '<h1>No Posts</h1>';

    return (
        isLoading ? <CircularProgress /> : (
            <Grid
            className={classes.mainContainer}
            container
            alignItems="stretch"
            spacing={3}>
                {
                    posts.map((post) => (
                        <Grid item key={post._id} xs={12} sm={12} md={6} lg={4}>
                            <Post post={post} setCurrentId={setCurrentId}/>
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
}

export default Posts;