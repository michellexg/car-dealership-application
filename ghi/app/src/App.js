import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelList from './VehicleModelList';
import VehicleModelForm from './VehicleModelForm';

function App() {
  const [models, setModels] = useState([])

  const getModels = async() => {
    const response = await fetch('http://localhost:8100/api/models')
    if (response.ok){
      const data = await response.json();
      const models = data.models;

      setModels(models);
    }
  }
  useEffect(() =>{
    getModels();
  }, [])

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/models" element= {<VehicleModelList models={models} getModels={getModels}/>}></Route>
          <Route path="/models/new" element = {<VehicleModelForm/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
