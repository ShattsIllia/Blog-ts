import {Button}  from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { withLayout } from '../../components/layout/Layout';
import styles from './SignOut.module.scss';

const SignOut = () => {
    const history = useHistory();
    const logout = () => {
        localStorage.clear();
        history.push("/");
    }

    return(
        <div className={styles.wrapper}>
            <div>
                <div className={styles.title}>Are You Sure?</div>
                <div className={styles.button__wrapper}>
                    <Button variant="contained" color="primary" onClick={logout}>Yes</Button>
                    <Button variant="contained" color="secondary" onClick={() => history.push("/") }>No</Button>
                </div>
            </div>
        </div>
    );
};

export default withLayout(SignOut);
