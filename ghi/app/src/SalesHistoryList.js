import React, { useEffect, useState, useForm } from 'react';


function SalesHistoryList({ }) {
  const [sales_person, setSalePerson] = useState('')
  const [salespersons, setSalesPersons] = useState([])
  const [salerecords, setSaleRecords] = useState([])

  const getSalesPersons = async () => {
    const response = await fetch('http://localhost:8090/api/sales/salesperson/')
    if (response.ok) {
      const data = await response.json();
      const salespersons = data.sales_person;
      setSalesPersons(salespersons);
    }
  }

  const getSaleRecords = async () => {
    const response = await fetch('http://localhost:8090/api/sales/')
    if (response.ok) {
      const data = await response.json();
      const salerecords = data.salerecord;
      setSaleRecords(salerecords);
    }
  }

  // const [sales_person_name, setSalePersonName] = useState('')
  // const [customer_name, setCustomerName] = useState('')
  // const [vin, setVin] = useState('')
  // const [price, setPrice] = useState('')


  // if (salerecords === undefined){
  //     return null;
  // }
  // const clearState = () => {
  //     setSalePersonName('');
  //     setCustomerName('');
  //     setVin('');
  //     setPrice('');
  // }


  const handleSalePerson = (event) => {
    // clearState();
    const value = event.target.value;
    setSalePerson(value);
    // this.setState({});

  }

  useEffect(() => {
    getSalesPersons();
    getSaleRecords();
    // setSalePerson();
    // clearState();
  }, []);
  // console.log("logged:", salerecords.filter(salerecord => salerecord.sales_person.sales_person_name === sales_person))
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Sales person history</h1>
              <div className="mb-3">
                <select onChange={handleSalePerson} value={sales_person} required type="text" name="sales_person" id="sales_person" className="form-select">
                  <option >Choose a sales person</option>
                  {salespersons.map(saleperson => {
                    return (
                      <option key={saleperson.id} value={saleperson.sales_person_name}>
                        {saleperson.sales_person_name}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sales person</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Sale price</th>
          </tr>
        </thead>
        <tbody>
          {salerecords.filter(salerecord => salerecord.sales_person.sales_person_name === sales_person).map((salerecord, idx) => {
            return (
              <tr key={salerecord.automobile.href + idx.toString()}>
                <td>{salerecord.sales_person.sales_person_name}</td>
                <td>{salerecord.customer.customer_name}</td>
                <td>{salerecord.automobile.vin} </td>
                <td>{salerecord.price}</td>
              </tr>
            );
          })}

        </tbody>
      </table>
    </>
  )
}




export default SalesHistoryList;
