import React from 'react'
import {Container} from '@mui/material'

import { BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'


import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'

import { GoogleOAuthProvider } from '@react-oauth/google'


const App = () =>{

    const user = JSON.parse(localStorage.getItem('profile'))
    
    return( 
            <GoogleOAuthProvider clientId='31954847729-q5uprm272gkpmd220md8goag882qj1ij.apps.googleusercontent.com'> 
            <Container maxWidth='xl'>
             <Navbar />
                  <Routes>
                    <Route path='/' element={<Navigate replace to="/posts" />} />
                    <Route path='/posts' element={<Home />} />
                    <Route path='/posts/search' element={<Home />} />
                    <Route path='/posts/:id' element={<PostDetails />} />
                    <Route path='/auth' element={ !user ? <Auth/> : <Navigate replace to='/posts' />} />
                 </Routes>
             </Container>
            </GoogleOAuthProvider>
    )
}

export default App