import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturerForm';
import AutomobilesList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import TechnicianForm from './TechnicianForm';
import AppointmentsList from './AppointmentsList';
import AppointmentForm from './AppointmentForm';
import ServiceHistory from './ServiceHistory';

function App() {
  // const [manufacturers, setManufacturers] = useState([]);
  // const [automobiles, setAutomobiles] = useState([]);
  // const [salesRecords, setSalesRecords] = useState([]);
  // const [appointments, setAppointment] = useState([]);

  // const getManufacturers = async () => {
  //   const response = await fetch('http://localhost:8100/api/manufacturers/');
  //   if (response.ok) {
  //     const data = await response.json();
  //     const manufacturers = data.manufacturers;
  //     setManufacturers(manufacturers);
  //   } else {
  //     console.error(response);
  //   }
  // }

  // const getAutomobiles = async () => {
  //   const response = await fetch('http://localhost:8100/api/automobiles/');
  //   if (response.ok) {
  //     const data = await response.json();
  //     const automobiles = data.autos;
  //     setAutomobiles(automobiles);
  //   } else {
  //     console.error(response);
  //   }
  // }

  // const getSalesRecord = async () => {
  //   const response = await fetch('http://localhost:8090/api/sales/');
  //   if (response.ok) {
  //     const data = await response.json();
  //     const salesRecords = data.salerecord;
  //     setSalesRecords(salesRecords);
  //   } else {
  //     console.error(response);
  //   }
  // }

  // const getAppointment = async () => {
  //   const response = await fetch('http://localhost:8080/api/appointments/');
  //   if (response.ok) {
  //     const data = await response.json();
  //     const appointments = data.appointments;
  //     let unfinishedAppointment = []
  //     for (let appointment of appointments) {
  //       if (appointment.finished === false) {
  //         unfinishedAppointment.push(appointment)
  //       }
  //     }
  //     setAppointment(unfinishedAppointment);
  //   } else {
  //     console.error(response);
  //   }
  // }

  // useEffect(() => {
  //   // getManufacturers();
  //   // getAutomobiles();
  //   getAppointment();
  //   getSalesRecord();
  // }, [])

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers/">
            <Route path="" element={<ManufacturersList />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="automobiles/">
            <Route path="" element={<AutomobilesList />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="appointments/">
            <Route path="" element={<AppointmentsList />} />
            <Route path="new/" element={<AppointmentForm />} />
            <Route path="history/" element={<ServiceHistory />} />
            <Route path="technicians/new/" element={<TechnicianForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
