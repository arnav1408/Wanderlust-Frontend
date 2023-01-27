import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Container } from '@material-ui/core';
import { GoogleOAuthProvider } from '@react-oauth/google';

import useStyles from './Styles';
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from './components/Auth/Auth';
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    // console.log(process.env);
    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH}>
            <BrowserRouter>
                <Container maxWidth="xl">
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={() => <Redirect to="/posts" />}/>
                        <Route path="/posts" exact component={Home}/>
                        <Route path="/posts/search" exact component={Home}/>
                        <Route path="/posts/:id" component={PostDetails}/>
                        <Route path="/auth" exact component={() => !user ? <Auth /> : <Redirect to="/posts" />}/>
                    </Switch>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;