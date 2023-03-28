
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Navigation } from './Components/Shared/Navigation/Navigation';
import { Register } from './pages/Register/Register';
import Login from './pages/Login/Login';
function App() {
  return (
    <BrowserRouter>
    <Navigation/>
      <Routes>
        <Route path='/' exact Component={Home} />
      </Routes>
      <Routes>
        <Route path='/register' exact Component={Register} />
      </Routes>
      <Routes>
        <Route path='/login' exact Component={Login} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
