import React, { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Button, TextField} from '@material-ui/core'
import { withLayout } from '../../components/layout/Layout';
import {useDispatch} from 'react-redux';
import { createNewPost } from '../../redux/posts/postActions';

const NewPost: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const dispatch = useDispatch()
    const history = useHistory();

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
        dispatch(createNewPost(title, text, description, {history}));
    }  

    return (
        <form style={{display: 'flex', flexDirection: 'column', width: '400px', textAlign: 'center', gap: '20px'}}>
            <h1>Create New Post</h1>
            <TextField label="Write Title"  id="name" onChange={e => titleHandleChange(e)}/>
            <TextField label="Write Full Text"  id="password" onChange={e => textHandleChange(e)}/>
            <TextField label="Write Description"  id="email" onChange={e => descriptionHandleChange(e)}/>
            <Button variant="contained" color="primary" onClick={handleFormSubmit}>Submit</Button>
        </form>
    );
}

export default withLayout(NewPost);