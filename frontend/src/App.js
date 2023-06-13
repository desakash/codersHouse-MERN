
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Navigation } from './Components/Shared/Navigation/Navigation';

import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import { Children, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Loader from './Components/Shared/Loader/Loader';
import Room from './pages/Room/Room';
// const isAuth = false;
// const user = {
//   activated :false,
// };
function App() {
 
  const {loading} = useLoadingWithRefresh();
  return loading ? (
    <Loader message = "Loadig...Please wait"/>
  ) : (
    <BrowserRouter>
      <Navigation />
      <Routes>
        {/* <Route exact path='/' element={<Home />} /> */}

        <Route element={<GuestRoute children={<Home />} />}>
          <Route path='/' />
        </Route>


        {/* <Routes>
        <Route path='/register' exact Component={Register} />
      </Routes>
      <Routes>
        <Route path='/login' exact Component={Login} />
      </Routes> */}
        <Route element={<GuestRoute children={<Authenticate />} />}>
          <Route path='/authenticate' />
        </Route>

        <Route element={<SemiProtectedRoute children={<Activate />} />}>
          <Route path='/activate' />
        </Route>

        <Route element={<ProtectedRoute children={<Rooms />} />}>
          <Route path='/rooms' />
        </Route>

        <Route element={<ProtectedRoute children={<Room/>} />}>
          <Route path='/rooms/:id' />
        </Route>
        {/* <GuestRoute path='/authenticate'>
          <Authenticate />
        </GuestRoute> */}
      </Routes>
    </BrowserRouter>

  );
}
const GuestRoute = ({ children, ...rest }) => {
  const {isAuth} = useSelector((state) =>state.auth)
  if (isAuth) {
    return (<Navigate replace to='/rooms' />)
  } else {
    return children
  }
  // return (
  //   <Routes>
  //   <Route {...rest}
  //     render={({ location }) => {
  // return isAuth &&
  //   <Navigate replace to='/rooms' />
  // <Navigate replace to={{
  //   pathname: '/rooms',
  //   state: { from: location }
  // }}
  // />
  // ) : (
  //   children
  // );
  // }}
  // />
  // </Routes>
  // );
};

const SemiProtectedRoute = ({ children}) => {
  const {user,isAuth} = useSelector((state) =>state.auth)
  if (!isAuth) {
    return (<Navigate replace to='/' />)
  } else if(isAuth && !user.activated) {
    return children
  }else{
    return (<Navigate replace to='/rooms' />)
  }
 
};

const ProtectedRoute = ({ children }) => {
  const {user,isAuth} = useSelector((state) =>state.auth)
  if (!isAuth) {
    return (<Navigate replace to='/' />)
  } else if(isAuth && !user.activated) {
    return (<Navigate replace to='/activate' />)
  }else{
    return children
  }
 
};
export default App;
