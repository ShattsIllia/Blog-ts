
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Card, CardContent, TextField, Typography } from "@material-ui/core";
import styles from './Home.module.scss';
import { withLayout } from '../../components/layout/Layout';
import {useHistory} from 'react-router-dom';
import { fetchPosts, getPostByTitle } from '../../redux/posts/postActions';
import {useDispatch} from 'react-redux';
import { useAppSelector } from '../../hooks';
import { Pagination } from '@material-ui/lab';

interface IPost {
    likes: string[];
    _id: string;
    title: string;
    description: string;
    dateCreated: string;
    postedBy: string;
    __v: number;
};

const Home: React.FC = () => {
  let [page, setPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const dispatch = useDispatch();
  const postsData =  useAppSelector(({post}: any) => post.posts);
  const posts = postsData && postsData.data;
  const history = useHistory();

  useMemo(() => {
    dispatch(fetchPosts(skip));
  },[dispatch, skip]);

  const openFullPost = useCallback(
    (postId: string) => {
      history.push(`${postId}`);
    },[history]
  );

  const handleChangePagination = (page: number) => {
      setPage(page);
      
      if ([page === 1]) {
          setSkip(0);
      };
      
      dispatch(fetchPosts((page - 1) * 9));
  };

  let pagesAmount = postsData && postsData.pagination ? Math.ceil(postsData.pagination.total / 9) : undefined;

  const titleHandleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setTitle(e.currentTarget.value);
  };

  const handleSearchClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault(); 
    dispatch(getPostByTitle(title));
  };  
  
  const handleFormSumbmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    dispatch(getPostByTitle(title));
  };

  const renderedPost = posts && posts.map((post: IPost) => {
  return (
      <Card variant="outlined" className={styles.post} key={uuidv4()} >
        <CardContent className="post__content">
          <Typography color="textPrimary">
            {post.title.toUpperCase()}
          </Typography>
          <Typography  color="textSecondary" className={styles.post}>
            {post.description}
          </Typography>
          <Typography  color="textSecondary" className={styles.post}>
            {post.dateCreated.slice(0, 10)}
          </Typography>
          <Button variant="contained" color="primary" className={styles.btn} onClick={() => openFullPost(post._id)}>Learn More</Button>
        </CardContent>
      </Card>
    );  
  });

  return (
  <div className={styles.wrapper}>
      <form className={styles.searchForm} onSubmit={handleFormSumbmit}>
            <TextField label="Seach Post By Title"  id="title" onChange={e => titleHandleChange(e)}/>
            <Button variant="contained" color="primary" onClick={handleSearchClick}>Search</Button>
      </form>
      <div className={styles.postsWrapper}>{renderedPost}</div>
      <Pagination 
        count={pagesAmount} 
        page={page} 
        onChange={(_, newPage) => handleChangePagination(newPage)} 
        variant="outlined"
        color="primary"
      />
  </div>
  )
};

export default withLayout(Home);