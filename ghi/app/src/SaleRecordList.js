import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function SaleRecordList({}){
    const [salerecords, setSaleRecords] = useState([])

    const getSaleRecords = async() => {
        const response = await fetch('http://localhost:8090/api/sales/')
        if (response.ok){
          const data = await response.json();
          const salerecords = data.salerecord;
          setSaleRecords(salerecords);
        }
      }
      useEffect(() =>{
        getSaleRecords();
      }, [])

    return(
        <>

        <h1>List of Sales</h1>

              <Link className="btn btn-primary m-3" to="/sales/salerecord">Create a sale record</Link>

              <Link className="btn btn-primary m-3" to="/sales/salesperson">Add a sales person</Link>

              <Link className="btn btn-primary m-3" to="/sales/customer">Add a potential customer</Link>

              <Link className="btn btn-primary m-3" to="/sales/history">Sales person history</Link>

        <table className="table table-striped">
        <thead>
          <tr>
            <th>Sales Person</th>
            <th>Sales Person Employee Number</th>
            <th>Purchaser</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {salerecords.map(salesrecord => {
            return (
              <tr key={salesrecord.vin}>
                <td>{ salesrecord.sales_person.sales_person_name }</td>
                <td>{ salesrecord.sales_person.employee_number }</td>
                <td>{ salesrecord.customer.customer_name }</td>
                <td>{ salesrecord.automobile.vin }</td>
                <td>{ salesrecord.price }</td>
              </tr>
            );
          })}

        </tbody>
      </table>
    </>

    )
}
export default SaleRecordList;
