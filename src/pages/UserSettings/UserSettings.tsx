import React, { ChangeEvent, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withLayout } from '../../components/layout/Layout';
import { changeUserAvatar, changeUserName, deleteUserById, getUserById } from '../../redux/user/userActions';
import userPhoto from '../../assets/фото.jpg';
import { Button, Input, TextField } from '@material-ui/core';
import styles from './UserSettings.module.scss';
import {useHistory} from 'react-router-dom';

const UserSettings = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [login, setLogin] = useState<string>('');
    const userId: string | null = localStorage.getItem('userId');
    const userData = useSelector(({user}: any) => user.user);

    useMemo(() => {
      dispatch(getUserById(userId))
    }, [dispatch, userId ])

    const loginHandleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setLogin(e.currentTarget.value);
    }

    const handleFormSubmit = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault(); 
      dispatch(changeUserName(login, userId));
      history.push('/settings');
    } 

    const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(changeUserAvatar(e.target.files!, userId))
    };

    const deleteUser = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      dispatch(deleteUserById(userId));
    }
  
    return (
      <>
        {userData ? 
          <div className={styles.updateWrapper}>{userData.avatar ? <img src={`http://51.158.179.21${userData.avatar}`} alt="userPhoro"/> : <img src={userPhoto} alt="userPhoro"/>}
              <div className={styles.title}>Change Avatar</div> 
              <Input type="file"  onChange={handleCapture}/>
              <div className={styles.updateName__wrapper}>
              <div className={styles.title}>Change Name</div>
                <TextField label={userData.name} id="name" onChange={e => loginHandleChange(e)}/>
                <Button variant="contained" color="primary" onClick={handleFormSubmit}>Change Name</Button>
              </div>
              <Button variant="contained" color="secondary" onClick={deleteUser}>Delete User</Button>
          </div> : null}
      </>    
    );
}

export default withLayout(UserSettings);