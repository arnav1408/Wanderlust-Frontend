import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

import useStyles from './Styles';
import Input from './Input';
import { useDispatch } from 'react-redux';
import { signin, signup } from '../../actions/auth';
// import Icon from './Icon';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

function Auth() {
    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const submitFormHandler = (e) => {
        e.preventDefault();
        // console.log(formData);

        if (isSignup) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const switchModeHandler = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const googleSuccessHandler = async (res) => {
        console.log(res);
        const decoded = jwt_decode(res?.credential);
        const finalDecodedData = {
            result: {
                ...decoded,
                googleId: decoded.sub,
                userId: decoded.sub
            },
            token: res.credential
        }
        console.log('decoded', decoded);
        console.log('final', finalDecodedData);

        try {
            dispatch({
                type: 'AUTH',
                data: finalDecodedData
            })

            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleErrorHandler = () => {
        console.log('Not able to log in');
    }

    return (
        <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">{ isSignup ? 'Sign Up' : 'Sign In' }</Typography>
            <form className={classes.form} onSubmit={submitFormHandler}>
            <Grid container spacing={2}>
                { isSignup && (
                <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
                )}
                <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                { isSignup ? 'Sign Up' : 'Sign In' }
            </Button>
            <GoogleLogin
                onSuccess={googleSuccessHandler}
                onFailure={googleErrorHandler}
                theme="filled_blue"
                width='364'
                text={isSignup ? "signup_with" : "signin_with"}
                logo_alignment="left"
            />
            <Grid container justifyContent="flex-end">
                <Grid item>
                <Button onClick={switchModeHandler}>
                    { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                </Button>
                </Grid>
            </Grid>
            </form>
        </Paper>
        </Container>
    )
}

export default Auth