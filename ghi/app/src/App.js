import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelList from './VehicleModelList';
import VehicleModelForm from './VehicleModelForm';
import SaleRecordList from './SaleRecordList';
import SalesPersonForm from './CreateSalesPersonForm';
import CustomerForm from './CreateCustomerForm';
import SaleRecordForm from './CreateSaleRecord';
import SalesHistoryList from './SalesHistoryList';

function App() {
  const [models, setModels] = useState([])
  const [salerecords, setSaleRecords] = useState([])
  const [salespersons, setSalesPersons] = useState([])

  const getModels = async() => {
    const response = await fetch('http://localhost:8100/api/models')
    if (response.ok){
      const data = await response.json();
      const models = data.models;

      setModels(models);
    }
  }
  const getSaleRecords = async() => {
    const response = await fetch('http://localhost:8090/api/sales/')
    if (response.ok){
      const data = await response.json();
      const salerecords = data.salerecord;
      setSaleRecords(salerecords);
    }
  }

const getSalesPersons = async() => {
  const response = await fetch('http://localhost:8090/api/sales/salesperson/')
  if (response.ok){
    const data = await response.json();
    const salespersons = data.sales_person;
    setSalesPersons(salespersons);
  }
}


  useEffect(() =>{
    getModels();
    getSaleRecords();
    getSalesPersons();
  }, [])

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/models" element= {<VehicleModelList models={models} getModels={getModels}/>}></Route>
          <Route path="/models/new" element = {<VehicleModelForm/>}></Route>
          <Route path="/sales" element = {<SaleRecordList salerecords={salerecords} getSaleRecords={getSaleRecords}/>}></Route>
          <Route path="/sales/salesperson" element = {<SalesPersonForm/>}></Route>
          <Route path="/sales/customer" element = {<CustomerForm/>}></Route>
          <Route path="/sales/salerecord" element = {<SaleRecordForm salerecords={salerecords}/>}></Route>
          <Route path="/sales/history" element = {<SalesHistoryList salerecords={salerecords} salespersons={salespersons}/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
