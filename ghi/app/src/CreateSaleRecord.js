import React, {useEffect, useState} from 'react';

function SaleRecordForm(props){
    const [autos, setAutos] = useState([])
    const [salespersons, setSalePersons] = useState([])
    const [customers, setCustomers] = useState([])
    const [automobile, setAutomobile] = useState('')
    const [sales_person, setSalesPerson] = useState('')
    const [customer, setCustomer] = useState('')
    const [price, setPrice] = useState('')

    const handleAutomobile = (event) => {
        const value = event.target.value;
        setAutomobile(value);
    }

    const handleSalesPerson = (event) => {
        const value = event.target.value;
        setSalesPerson(value);
    }

    const handleCustomer = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const handlePrice = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    const handleSubmit = async (event) => {
        const data = {};
        event.preventDefault();
        data.automobile = automobile;
        data.sales_person = sales_person;
        data.customer = customer;
        data.price = price;

        const salerecordUrl = 'http://localhost:8090/api/sales/salerecord/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log(data)
        const response = await fetch(salerecordUrl, fetchConfig);
        if (response.ok){
            const newSaleRecord = await response.json();
            setAutomobile('');
            setSalesPerson('');
            setCustomer('');
            setPrice('');
        }
    }
const fetchData = async () => {
    const url = 'http://localhost:8100/api/automobiles/';
     const response = await fetch(url);
     if (response.ok){
        const data = await response.json();
        setAutos(data.autos);
        console.log("data:", data);
     }
     const customerurl = 'http://localhost:8090/api/sales/customer/';
     const response1 = await fetch(customerurl);
     if (response1.ok){
        const data1 = await response1.json();
        setCustomers(data1.customer);

     }
     const salespersonurl = 'http://localhost:8090/api/sales/salesperson/';
     const response2 = await fetch(salespersonurl);
     if (response2.ok){
        const data2 = await response2.json();
        setSalePersons(data2.sales_person)
     }
    }

useEffect(() => {
    fetchData();
}, []);

// console.log("salerecords:", salerecords);

return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Record a new sale</h1>
            <form onSubmit={handleSubmit} id="create-salerecord-form">
            <div className="mb-3">
                <select onChange={handleAutomobile} value={automobile} required type="number" name="automobile" id="automobile" className="form-select">
                  <option >Choose an Automobile</option>
                    {autos.map(auto => {
                        return (
                            <option key={auto.href} value={auto.href}>
                                {auto.vin}
                            </option>
                        )
                    })}
                </select>
              </div>
              <div className="mb-3">
                <select onChange={handleSalesPerson} value={sales_person} required type="number" name="sales_person" id="sales_person" className="form-select">
                  <option >Choose a Sales person</option>
                    {salespersons.map(sale => {
                        return (
                            <option key={sale.sales_person_name} value={sale.id}>
                                {sale.employee_number} {sale.sales_person_name}
                            </option>
                        )
                    })}
                </select>
              </div>
              <div className="mb-3">
                <select onChange={handleCustomer} value={customer} required type="number" name="customer" id="customer" className="form-select">
                  <option>Choose a Customer</option>
                    {customers.map(cust => {
                        return (
                            <option key={cust.customer_name} value={cust.id}>
                                {cust.customer_name}
                            </option>
                        )
                    })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handlePrice}  value={price} placeholder="Price" required type="number" name="price" id="price" className="form-control" />
                <label htmlFor="price">Price</label>
              </div>

              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
)
}
export default SaleRecordForm;
