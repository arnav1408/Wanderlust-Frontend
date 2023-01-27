import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';

import useStyles from './Styles';
import { createPost, updatePost } from "../../actions/posts";
import { useHistory } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId ? state.posts.posts.find(p => p._id === currentId) : null);
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();
    
    const classes = useStyles();

    useEffect(() => {
        if (post) {
            setPostData(post)
        }
    }, [post])

    

    const handleSubmitHandler = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, {
                ...postData,
                name: user?.result?.name
            }));
        } else {
            dispatch(createPost({
                ...postData,
                name: user?.result?.name
            }, history));
        }
        clearHandler();
    }

    const clearHandler = () => {
        setCurrentId(null);
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
        });
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
                Please Sign In to create your own posts and like other's posts.
            </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form 
            autoComplete="off" 
            noValidate 
            className={`${classes.form} ${classes.root}`} 
            onSubmit={handleSubmitHandler}>
                <Typography variant="h6">{!currentId ? 'Creating' : 'Editing'} a Post</Typography>
                
                <TextField 
                name="title"
                variant="outlined"
                label="Title"
                fullWidth
                required
                value={postData.title}
                onChange={(e) => setPostData({...postData, title: e.target.value})}/>

                <TextField 
                name="message"
                variant="outlined"
                label="Message"
                fullWidth
                required
                value={postData.message}
                onChange={(e) => setPostData({...postData, message: e.target.value})}/>

                <TextField 
                name="tags"
                variant="outlined"
                label="Tags"
                fullWidth
                value={postData.tags}
                onChange={(e) => setPostData({...postData, tags: e.target.value.toLowerCase().split(',')})}/>

                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        name="selectedFile"
                        multiple={false}
                        onDone={({base64}) => setPostData({
                            ...postData,
                            selectedFile: base64
                        })}
                    />
                </div>

                <Button 
                className={classes.buttonSubmit}
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                fullWidth
                >Submit</Button>

                <Button
                className={classes.buttonSubmit}
                variant="contained"
                size="small"
                color="secondary"
                onClick={clearHandler}
                fullWidth
                >clear</Button>
            </form>
        </Paper>
    );
}

export default Form;