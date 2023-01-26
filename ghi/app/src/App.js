
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
import VehicleModelList from './VehicleModelList';
import VehicleModelForm from './VehicleModelForm';
import SaleRecordList from './SaleRecordList';
import SalesPersonForm from './CreateSalesPersonForm';
import CustomerForm from './CreateCustomerForm';
import SaleRecordForm from './CreateSaleRecord';
import SalesHistoryList from './SalesHistoryList';

function App() {

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
          <Route path="models/">
            <Route path="" element={<VehicleModelList />} />
            <Route path="new/" element={<VehicleModelForm />} />
          </Route>
          <Route path="sales/">
            <Route path="" element={<SaleRecordList />} />
            <Route path="salesperson/" element={<SalesPersonForm />} />
            <Route path="customer/" element={<CustomerForm />} />
            <Route path="salerecord/" element={<SaleRecordForm />} />
            <Route path="history/" element={<SalesHistoryList />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
