
function SaleRecordList({salerecords, getSaleRecords}){
    if (salerecords === undefined){
        return null;
    }

    return(
        <>
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
                <td>{ salesrecord.sales_person_name }</td>
                <td>{ salesrecord.sales_person_number }</td>
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
