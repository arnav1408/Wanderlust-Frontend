import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
// import decode from 'jwt-decode';

// import memories from '../../images/memories.png';
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import wanderlust from '../../images/wanderlust.png';
import logo from '../../images/logo1.png';
import useStyles from './Styles';
import jwtDecode from 'jwt-decode';

function Navbar() {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        try {
            console.log('Clicked');
            dispatch({
                type: 'LOGOUT'
            });
            setUser(null);
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const token = user?.token;
        console.log('userinUseEffect', user);
        console.log('token', token);

        if (token) {
          const decodedToken = jwtDecode(token);
          console.log('time', decodedToken.exp);
          console.log('timeExp', new Date().getTime());

          if (decodedToken.exp * 1000 < new Date().getTime()) {
            console.log(decodedToken.exp);
            logoutHandler();
          }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    console.log("user", user?.result?.name);
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Link to="/" className={classes.brandContainer}>
            <img component={Link} to="/" src={wanderlust} alt="icon" height="80px" />
            <img className={classes.image} src={logo} alt="icon" height="40px" />
          </Link>
          <Toolbar className={classes.toolbar}>
            {user ? (
              <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user?.result?.name} src={user?.result?.picture}>{user?.result?.name?.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant="h6">{user?.result?.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logoutHandler}>Logout</Button>
              </div>
            ) : (
              <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            )}
          </Toolbar>
        </AppBar>
    );
}

export default Navbar