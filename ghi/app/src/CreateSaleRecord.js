import React, {useEffect, useState} from 'react';

function SaleRecordForm({salerecords}){
    // const [salerecords, setSaleRecords] = useState([])
    // const [salespersons, setSalesPersons] = useState([])
    // const [customers, setCustomers] = useState([])
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

        const salerecordUrl = 'http://localhost:8090/api/sales/';
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
// const fetchData = async () => {
//     const url = 'http://localhost:8090/api/sales/';
//      const response = await fetch(url);
//      if (response.ok){
//         const data = await response.json();
//         setSaleRecords(data.salerecords);
//         console.log("data:", data);
//      }
//     }
    // const salespersonurl = 'http://localhost:8090/api/sales/salesperson/'
    // const response1 = await fetch(salespersonurl);
    // if (response1.ok) {
    //     const data = await response1.json();
    //     setSalesPersons(data.salespersons);
    // }
    // const customerurl = 'http://localhost:8090/api/sales/customer/'
    // const response2 = await fetch(customerurl);
    // if (response2.ok) {
    //     const data = await response.json();
    //     setCustomers(data.costumers);
    // }

// useEffect(() => {
//     fetchData();
// }, []);

// console.log("salerecords:", salerecords);

return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Record a new sale</h1>
            <form onSubmit={handleSubmit} id="create-salerecord-form">
            <div className="mb-3">
                <select onChange={handleAutomobile} required type="number" name="automobile" id="automobile" className="form-select">
                  <option value={automobile}>Choose an Automobile</option>
                    {salerecords.map(salerecord => {
                        return (
                            <option key={salerecord.automobile.vin} value={salerecord.automobile.vin}>
                                {salerecord.automobile.vin}
                            </option>
                        )
                    })}
                </select>
              </div>
              <div className="mb-3">
                <select onChange={handleSalesPerson} required type="text" name="sales_person" id="sales_person" className="form-select">
                  <option value={sales_person}>Choose a Sales person</option>
                    {salerecords.map(salerecord => {
                        return (
                            <option key={salerecord.sales_person.sales_person_name} value={salerecord.sales_person.sales_person_name}>
                                {salerecord.sales_person.sales_person_name}
                            </option>
                        )
                    })}
                </select>
              </div>
              <div className="mb-3">
                <select onChange={handleCustomer} required type="text" name="customer" id="customer" className="form-select">
                  <option value={customer}>Choose a Customer</option>
                    {salerecords.map(salerecord => {
                        return (
                            <option key={salerecord.customer.customer_name} value={salerecord.customer.customer_name}>
                                {salerecord.customer.customer_name}
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
