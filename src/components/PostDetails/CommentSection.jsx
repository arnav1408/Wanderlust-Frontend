import React, {useRef} from 'react';
import { TextField, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import useStyles from './Styles';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const commentsRef = useRef();

    const commentPostHandler = async () => {
        const finalComment = `${user?.result?.name}: ${comment}`;

        const newComments = await dispatch(commentPost(finalComment, post._id));

        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({
            behaviour: 'smooth'
        });
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'>Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            <strong>{c.split(': ')[0]}</strong>
                            <font color="blue">{c.split(':')[1]}</font>
                        </Typography>
                    ))}
                    <div ref={commentsRef}/>
                </div>
                {user?.result?.name && <div style={{ width: '70%' }}>
                    <Typography 
                    gutterBottom 
                    variant="h6">
                        Write a comment
                    </Typography>

                    <TextField 
                    fullWidth 
                    rows={4} 
                    variant="outlined" 
                    label="Comment" 
                    multiline 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                    />

                    <br />

                    <Button 
                    style={{ marginTop: '10px' }} 
                    fullWidth 
                    disabled={!comment.length} 
                    color="primary" 
                    variant="contained" 
                    onClick={commentPostHandler}>
                        Comment
                    </Button>
                </div>}
            </div>
        </div>
    )
}

export default CommentSection;