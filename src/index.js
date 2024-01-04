import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import ProductDetail from './pages/ProductDetail';
import NewProducts from './pages/NewProducts';
import MyCart from './pages/MyCart';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyOrder from './pages/MyOrder';
import { CookiesProvider } from 'react-cookie';
import MyCount from './pages/MyCount';
import MyInfo from './pages/MyInfo';
import MyCountRedux from './pages/MyCountRedux';

//add redux
import { legacy_createStore as createStore } from 'redux';
import { Provider} from 'react-redux';
import { applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { thunk } from 'redux-thunk'; //비동기처리 지원 라이브러리
import rootReducer from './modules_redux/rootReducer';

/* 스토어 생성 */
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
    // applyMiddleware(logger)
    );
console.log(store.getState());

const router = createBrowserRouter([
  {
      path : '/',
      element : <App />,
      errorElement : <NotFound />,
      children : [
        { index : true, path : '/', element : <Home />   },
        { path : '/products', element : <AllProducts />  },
        { path : '/products/:pid', element : <ProductDetail />  },
        { path : '/products/new', element : <NewProducts />  },
        { path : '/carts', element : <MyCart />  },
        { path : '/login', element : <Login />  },
        { path : '/signup', element : <Signup />  },
        { path : '/order', element : <MyOrder />  },
        { path : '/count', element : <MyCount />  },
        { path : '/info', element : <MyInfo />  },
        { path : '/redux', element : <MyCountRedux />  },
      ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
