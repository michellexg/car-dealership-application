
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

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/models" element= {<VehicleModelList/>}></Route>
          <Route path="/models/new" element = {<VehicleModelForm/>}></Route>
          <Route path="/sales" element = {<SaleRecordList/>}></Route>
          <Route path="/sales/salesperson" element = {<SalesPersonForm/>}></Route>
          <Route path="/sales/customer" element = {<CustomerForm/>}></Route>
          <Route path="/sales/salerecord" element = {<SaleRecordForm/>}></Route>
          <Route path="/sales/history" element = {<SalesHistoryList/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
