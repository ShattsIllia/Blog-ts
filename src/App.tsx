import React from 'react';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import SignOut from './pages/SignOut/SignOut';
import NewPost from './pages/NewPost/NewPost';
import FullPost from './pages/FullPost/FullPost';
import UserSettings  from './pages/UserSettings/UserSettings';

const App: React.FC = () => {
  return (
    <div className="wrapper" style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%"}}>
      <Router>
        <Switch> 
          <Route path="/" exact>
            <Home/> 
          </Route>
          <Route path="/sign-up">
            <SignUp/>
          </Route>
          <Route path="/sign-in">
            <SignIn/>
          </Route>
          <Route path="/sign-out">
            <SignOut/>
          </Route>
          <Route path="/new-post">
            <NewPost/>
          </Route>
          <Route path="/settings">
            <UserSettings/>
          </Route>
          <Route path="/:postId">
            <FullPost/>
          </Route>
        </Switch> 
      </Router>
    </div>
  );
}

export default App;
