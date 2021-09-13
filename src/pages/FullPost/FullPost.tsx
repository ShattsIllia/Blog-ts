import React, { ChangeEvent, useEffect, useState }from "react";
import { withLayout } from '../../components/layout/Layout';
import { useHistory, useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { deletePostById, fetchFullPost, updatePost } from "../../redux/posts/postActions";
import { Button, Card, CardActions, TextField, Typography } from "@material-ui/core";
import axios from "../../API/axios";
import styles from './FullPost.module.scss';

interface IPostId {
    postId: string;
}
interface IFullPost{
    dateCreated: string;
    description: string;
    fullText: string;
    likes: any[];
    postedBy: string | null;
    title: string;
    __v: number;
    _id: string;
}

const FullPost = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {postId}: IPostId = useParams();
    const fullPost:IFullPost = useSelector(({post}: any) => post.fullPost);
    const userId = localStorage.getItem('userId');
    const [isInputActive, setIsInputActive] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [description, setDescription] = useState<string>('');

     useEffect(() => {
        dispatch(fetchFullPost(postId));
    },  [dispatch, postId]);

    const setLike = async (postId: string) => {
        const request = async () => {
            await axios.put(`/posts/like/${postId}`); 
        }
        await request();
        dispatch(fetchFullPost(postId))
    };

    const deletePost = () => {
        dispatch(deletePostById(postId, {history}));
    }

    const titleHandleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setTitle(e.currentTarget.value);
    }
    const textHandleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setText(e.currentTarget.value);
    }
    const descriptionHandleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setDescription(e.currentTarget.value);
    }
    const handleFormSubmit = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault(); 
        dispatch(updatePost(title, text, description, postId))
        window.location.href = '/';
    }  

    return (
        <div className={styles.fullPost__wrappper}>
            <Card variant="outlined" className={styles.FullPost}>
                {isInputActive ?
                    <div className={styles.updateWrapper}>
                        <div className={styles.updateTitle}>Update Post</div>
                        <TextField label={fullPost.title}  id="title" onChange={e => titleHandleChange(e)}/>
                        <TextField label={fullPost.fullText}  id="text" onChange={e => textHandleChange(e)}/>
                        <TextField label={fullPost.description}  id="description" onChange={e => descriptionHandleChange(e)}/>
                        <Button variant="contained" color="primary" onClick={handleFormSubmit}>Submit</Button>
                    </div>
                :
                <div>
                    <Typography variant="h5" component="h2">
                        {fullPost.title}
                    </Typography>
                    <Typography  color="textSecondary">
                        {fullPost.description}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {fullPost.fullText}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {fullPost.dateCreated && fullPost.dateCreated.slice(0, 10)}
                    </Typography>
                    <Typography variant="body2" component="p" className={styles.likes} onClick={() => setLike(fullPost._id)}>
                        <span>&#10084;</span> {fullPost.likes?.length}
                    </Typography>
                    <CardActions className={styles.fullPost__btn}>
                        <Button color="secondary" variant="contained" 
                            onClick={() => history.push('/')}
                        >Close</Button>
                    </CardActions>
                    <div>
                        {userId === fullPost.postedBy  ? 
                            <div className={styles.btnWrapper}>
                                <Button color="primary" variant="contained" onClick={() => setIsInputActive(true)}>Update Post</Button>
                                <Button color="secondary" variant="contained" onClick={deletePost}>Delete Post </Button>
                            </div>
                            : null}
                        </div>
                </div>}
            </Card> 
        </div>
    );  
}

export default withLayout(FullPost); 

