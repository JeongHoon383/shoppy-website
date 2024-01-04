import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
   <>
    <Navbar />
    <Outlet />
   </>
  );
}

export default App;
