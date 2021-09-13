import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { rootReducer } from './redux/rootReducer';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import './index.css';

const store = createStore(rootReducer, applyMiddleware(thunk));


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch