import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {AppBar, Toolbar, CssBaseline, Drawer, List, Divider, IconButton, Typography } from '@material-ui/core';
import { Menu, ChevronLeft, ChevronRight} from '@material-ui/icons/';
import {Button} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import styles from './SideBar.module.scss';
import { isAuthorized } from '../../../helpers/index';

export const SideBar = () => {
    const drawerWidth = 240;
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
             width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            nsition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
             marginLeft: 0,
        },
    }));

    const history = useHistory()
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={`${clsx(open && classes.hide )} ${styles.menuBtn}`}
                        disabled={false}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h5" onClick={() => history.push('/')} style={{cursor: "pointer"}}>
                        Blog
                    </Typography>
                    <Toolbar className={styles.signButtons}>
                        {!isAuthorized() ? 
                        <div className={styles.signButtons}>
                            <Button variant="contained" color='secondary' onClick={() => history.push('/sign-in')}>Sign In</Button>
                            <Button variant="contained"  color='primary' onClick={() => history.push('/sign-up')}>Sign Up</Button>
                        </div>
                        :
                        <div className={styles.signButtons}>
                            <Button variant="contained" color='secondary' onClick={() => history.push('/sign-out')}>Log out</Button>
                            <Button variant="contained" color='primary' onClick={() => history.push('/new-post')}>New Post</Button>
                            <Button variant="contained" color='secondary' onClick={() => history.push('/settings')}>User Settings</Button>
                        </div>}
                    </Toolbar>
                </Toolbar>
            </AppBar>
            
            <Drawer 
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                paper: classes.drawerPaper,
               
                }}
            >
                <div className={classes.drawerHeader} >
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                {!isAuthorized() ? 
                    <div className={styles.sideBarButtonWrapper}>
                        <Button variant="contained" color='secondary' onClick={() => history.push('/sign-in')}>Sign In</Button>
                        <Button variant="contained"  color='primary' onClick={() => history.push('/sign-up')}>Sign Up</Button>
                    </div>
                :   <div className={styles.sideBarButtonWrapper}>
                            <Button variant="contained" color='secondary' onClick={() => history.push('/sign-out')}>Log out</Button>
                            <Button variant="contained" color='primary' onClick={() => history.push('/new-post')}>New Post</Button>
                            <Button variant="contained" color='secondary' onClick={() => history.push('/settings')}>User Settings</Button>
                    </div>}
                </List>
                <Divider />
            </Drawer>
        </div>
    );
};

