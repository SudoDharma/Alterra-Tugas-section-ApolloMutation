import './App.css';

import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Search from "./pages/Search"
import FormPage from './pages/FormPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path='/search/:id' element={<Search />}/>
      <Route path='/add' element={<FormPage header={"Tambah pengunjung baru"}/>}/>
      <Route path='/edit' element={<FormPage header={"Edit pengunjung"}/>}/>
    </Routes>
  );
}

export default App;
