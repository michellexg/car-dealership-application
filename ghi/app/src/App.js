import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturerForm';
import AutomobilesList from './AutomobileList';
import AutomobileForm from './AutomobileForm';

function App() {
  const [manufacturers, setManufacturers] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);

  const getManufacturers = async () => {
    const response = await fetch('http://localhost:8100/api/manufacturers/');
    if (response.ok) {
      const data = await response.json();
      const manufacturers = data.manufacturers;
      setManufacturers(manufacturers);
    } else {
      console.error(response);
    }
  }

  const getAutomobiles = async () => {
    const response = await fetch('http://localhost:8100/api/automobiles/');
    if (response.ok) {
      const data = await response.json();
      const automobiles = data.autos;
      setAutomobiles(automobiles);
    } else {
      console.error(response);
    }
  }

  useEffect(() => {
    getManufacturers();
    getAutomobiles();
  }, [])

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers/">
            <Route path="" element={<ManufacturersList manufacturers={manufacturers} />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="automobiles/">
            <Route path="" element={<AutomobilesList automobiles={automobiles} />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
