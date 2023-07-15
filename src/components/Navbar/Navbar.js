import React, { useEffect } from 'react'
import {AppBar,Avatar,Button,Toolbar,Typography} from '@mui/material'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import { googleLogout } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode'


import memoriesLogo from '../../images/memories-Logo.png'
import memoriesText from '../../images/memories-Text.png'
import useStyles from './styles' 
import './style.css'


function Navbar() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    let location = useLocation();

    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    useEffect(()=>{
        const token = user?.token;

        if(token){
            const decodedToken = jwtDecode(token)
            if(decodedToken.exp*1000 < new Date().getTime()) logout()
        }
        
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])


    const logout = () =>{
        googleLogout()
        dispatch({type:'LOGOUT'})
        navigate('/')
        setUser(false)
    }

  return (
    <> 
    <AppBar style={{flexDirection:'row'}} className={classes.appBar} position='static' color='inherit'>
        <Link to="/" className={classes.brandContainer}>
            <img className='memories' component={Link} to="/" src={memoriesText} alt="icon" height="30px" />
            <img className="photo" style={{marginLeft: '10px',marginTop: '5px',}} src={memoriesLogo} alt="icon" height="40px" />
        </Link>
    <Toolbar className={classes.toolbar}>
        {user ?  (
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user?.result.name} src={user?.result?.picture}>{user?.result.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant='h6'>{String(user.result?.name)}</Typography>
                <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
            </div>
        ) : (
            <Button className='button' component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
        )}
    </Toolbar>
    </AppBar>
    </>
  )
}

export default Navbar
