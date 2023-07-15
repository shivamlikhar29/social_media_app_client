import React from 'react'
import { Button,Typography,Container,Avatar,Paper,Grid} from '@mui/material'
import { GoogleLogin } from '@react-oauth/google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import { useState } from 'react';
import Icon from './icon';
import jwt_decode from 'jwt-decode'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import useStyles from './styles'
import { signin,signup } from '../../actions/auth';

const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''}


export default function Auth() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [formData,setFormData] = useState(initialState)
  const [showPassword,setShowPassword] = useState(false)
  const [isSignup,setIsSignup] = useState(false)

  const handleSubmit = (e) => {
      e.preventDefault()

      if(isSignup){
        dispatch(signup(formData,navigate))
      }else{
        dispatch(signin(formData,navigate))
      }

  }

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = ()=> {
    setIsSignup((p)=>!p)
    setShowPassword(false)
  }

  const onGoogleSuccess = (response) =>{
    const decode = jwt_decode(response.credential)
    console.log(decode)
    const result = decode
    const token = response.credential

    try{
      dispatch({type:'AUTH',data:{result,token}})
      navigate('/')
    }catch(error){
      console.log(error)
    }

  }
 

  return (
     <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
              <Input autoFocus name='firstName' label="First Name" handleChange={handleChange} half/>
              <Input half name='lastName' label=" Name" handleChange={handleChange}/>
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
             {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type='password' />}
             </Grid>
             <Button className={classes.googleButton} color='warning' fullWidth > 
             <GoogleLogin  
                     onSuccess={async (response) => { 
                            onGoogleSuccess(response)
                         }}

                    onError={() => { console.log('Login Failed');}}  />
              </Button>      
             <Button type='submit' fullWidth variant='contained' color="primary" className={classes.submit}>
              {isSignup ? "Sign Up" : "Sign In" }
             </Button>
             <Grid container justifyContent="flex-end">
                <Grid item>
                    <Button onClick={switchMode}>
                      {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                    </Button>
                </Grid>
             </Grid>
        </form>
      </Paper>
     </Container>
  )
}

