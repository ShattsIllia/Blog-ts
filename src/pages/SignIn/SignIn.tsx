import React, {ChangeEvent, useState} from 'react';
import {Button, TextField} from '@material-ui/core'
import { withLayout } from '../../components/layout/Layout';
import {useDispatch} from 'react-redux';
import { getAuthToken } from '../../redux/auth/authActions';
import {useHistory} from 'react-router-dom';

const SignIn: React.FC = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const emailHandleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setEmail(e.currentTarget.value);
    }
    const passwordHandleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setPassword(e.currentTarget.value);
    }
   
    const handleFormSubmit = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault(); 
        dispatch(getAuthToken(email, password, {history}))
       
    } 
    return (
        <form style={{display: 'flex', flexDirection: 'column', width: '400px', textAlign: 'center', gap: '20px'}}>
        <h1>Sign In</h1>
        <TextField label="Write Your email"  id="email" onChange={e => emailHandleChange(e)}/>
        <TextField label="Write Your password"  id="password" onChange={e => passwordHandleChange(e)}/>
        <Button variant="contained" color="primary" onClick={handleFormSubmit}>Submit</Button>
    </form>
    );
}

export default withLayout(SignIn);