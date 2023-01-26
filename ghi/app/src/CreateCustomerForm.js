import React, {useEffect, useState} from 'react';


function CustomerForm(props){
    const [customers, setCustomers] = useState([])
    const [customer_name, setCustomerName] = useState('')
    const [address, setAddress] = useState('')
    const [phone_number, setPhoneNumber] = useState('')

    const handleCustomer = (event) => {
        const value = event.target.value;
        setCustomerName(value);
    }
    const handleAddress = (event) => {
        const value = event.target.value;
        setAddress(value);
    }

    const handlePhoneNumber = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    }
    const handleSubmit = async (event) => {
        const data = {};
        event.preventDefault();
        data.customer_name = customer_name;
        data.address = address;
        data.phone_number = phone_number

        const customerUrl = 'http://localhost:8090/api/sales/customer/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log(data)
        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok){
            const newCustomer = await response.json();
            setCustomerName('');
            setAddress('');
            setPhoneNumber('');
        }
    }

return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Customer</h1>
            <form onSubmit={handleSubmit} id="create-salesperson-form">
              <div className="form-floating mb-3">
                <input onChange={handleCustomer} value={customer_name} placeholder="Name" required type="text" name="customer_name" id="customer_name" className="form-control" />
                <label htmlFor="sales_person_name" >Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleAddress} value={address} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
                <label htmlFor="address">Address</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handlePhoneNumber} value={phone_number} placeholder="Phone Number" required type="text" name="phone_number" id="phone_number" className="form-control" />
                <label htmlFor="phone_number">Phone Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
)
}
export default CustomerForm;
