import React from "react";
import { useEffect,useState,useRef } from "react";
import { useDispatch } from "react-redux";

import useStyles from './styles'
import { Button, TextField, Typography } from "@mui/material";
import { commentPost } from "../../actions/posts";

const CommentSection = ({post}) =>{
    const user = JSON.parse(localStorage.getItem('profile'))
    const [comment,setComment] = useState('')
    const dispatch = useDispatch()
    const [comments,setComments] = useState(post?.comments)
    const classes = useStyles()
    const commentsRef = useRef()
    
    async function handleClick(){
        const finalComment = `${user.result.name}: ${comment}`
        const newComment = await dispatch(commentPost(finalComment,post._id))
        setComments(newComment)
        setComment('')

        commentsRef.current.scrollIntoView({behaviour:'smooth'})
    }   



    return(
        <div>
            <div className={classes.commentsOuterContainer}>
              <div className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments?.map((c,i)=>(
                        <Typography key={i} gutterBottom variant="subtitle1">
                             <strong>{c.split(': ')[0]}</strong>
                               {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
             </div>
             {user?.result?.name && (

                    <div style={{width:"70%"}}>
                        <Typography gutterBottom variant="h6">Write a Comment</Typography>
                        <TextField fullWidth rows={4} variant="outlined" label="comment" multiline
                                    value={comment}
                                    onChange={((e)=>setComment(e.target.value))} />
                        <Button style={{marginTop:'10px'}} fullWidth disabled={!comment} variant="contained" onClick={(()=>handleClick())}>
                            Comment
                        </Button>
                    </div>
             )}
            </div>
        </div>
    )
}

export default CommentSection