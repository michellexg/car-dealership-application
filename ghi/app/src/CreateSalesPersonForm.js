import React, {useEffect, useState} from 'react';
function SalesPersonForm(props){
    const [salespersons, setSalesPersons] = useState([])
    const [sales_person_name, setSalesPerson] = useState('')
    const [employee_number, setEmployeeNumber] = useState('')

    const handleSalesPerson = (event) => {
        const value = event.target.value;
        setSalesPerson(value);
    }
    const handleEmployeeNumber = (event) => {
        const value = event.target.value;
        setEmployeeNumber(value);
    }
    const handleSubmit = async (event) => {
        const data = {};
        event.preventDefault();
        data.sales_person_name = sales_person_name;
        data.employee_number = employee_number;

        const salespersonUrl = 'http://localhost:8090/api/sales/salesperson/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log(data)
        const response = await fetch(salespersonUrl, fetchConfig);
        if (response.ok){
            const newSalesPerson = await response.json();
            setSalesPerson('');
            setEmployeeNumber('');
        }
    }
// const fetchData = async () => {
//     const url = 'http://localhost:8100/api/manufacturers/';
//      const response = await fetch(url);

//      if (response.ok){
//         const data = await response.json();
//         setManufacturers(data.manufacturers);
//      }
// }
// useEffect(() => {
//     fetchData();
// }, []);



return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Sales Person</h1>
            <form onSubmit={handleSubmit} id="create-salesperson-form">
              <div className="form-floating mb-3">
                <input onChange={handleSalesPerson} value={sales_person_name} placeholder="Name" required type="text" name="sales_person_name" id="sales_person_name" className="form-control" />
                <label htmlFor="sales_person_name" >Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleEmployeeNumber} value={employee_number} placeholder="Employee Number" required type="number" name="employee_number" id="employee_number" className="form-control" />
                <label htmlFor="employee_number">Employee Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
)
}
export default SalesPersonForm;
