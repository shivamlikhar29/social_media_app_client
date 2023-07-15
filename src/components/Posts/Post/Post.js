import React, { useState } from "react";
import useStyles from './styles'
import { Card,CardActions,CardMedia,CardContent,Button,Typography, ButtonBase } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useNavigate} from 'react-router-dom'
import moment from 'moment'

import { useDispatch } from "react-redux";
import { deletePost,likePost } from "../../../actions/posts";

const Post = ({post,setCurrentId}) =>{
    const classes = useStyles();
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const [likes,setLikes] = useState(post?.likeCount)

    const hasLikedPost = post.likeCount.find((like) => like === user?.result?.googleId || user?.result?._id)
    const userId = user?.result?.googleId || user?.result?._id

    const handleLike = () => {
        dispatch(likePost(post._id))
        if (hasLikedPost) {
            setLikes(post.likeCount.filter((id) => id !== userId));
          } else {
            setLikes([...post.likeCount, userId]);
          }
    }

    const openPost = () => navigate(`/posts/${post._id}`)

    const Likes = () => {
        if (likes.length >= 0) {
          return likes.find((like) => like === user?.result?.googleId || user?.result?._id)
            ? (
              <><ThumbUpIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length  - 1} others` : `${post.likeCount.length} like${post.likeCount.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;{likes.length } {likes.length  === 1 ? 'Like' : 'Likes'}</>
            );
        }}
    return(
        <Card className={classes.card} raised elevation={6}>
            <div className={classes.cardAction} onClick={openPost}> 
            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography> 
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
            {(user?.result?.sub == post?.creator|| user?.result?._id == post?.creator)&& (

                <div className={classes.overlay2} name="edit">
              <Button  onClick={(e) => {  e.stopPropagation();
                   setCurrentId(post._id); }}
                       style={{ color: 'white' }}
                      size="small">
      <MoreHorizIcon fontSize="large" />
    </Button>
  </div>
            ) }
            </div>
            <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom component='h2'>{post.title}</Typography>
            <CardContent>
               <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
            </CardContent>
            </div>   
            <CardActions className={classes.cardActions}> 
                <Button size={"small"} color="primary" disabled={!user?.result} onClick={handleLike}>
                   <Likes />
                </Button>
                {(user?.result?.sub == post?.creator|| user?.result?._id == post?.creator)&& (

                <Button size={"small"} color="primary" onClick={()=>dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post