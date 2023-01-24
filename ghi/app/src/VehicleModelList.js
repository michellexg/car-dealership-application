

function VehicleModelList({models, getModels}){
    if (models === undefined){
        return null;
    }

    return(
        <>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {models.map(model => {
            return (
              <tr key={model.name}>
                <td>{ model.name }</td>
                <td>{ model.manufacturer.name }</td>
                <td><img src={model.picture_url} className="img-thumbnail model"></img></td>
              </tr>
            );
          })}

        </tbody>
      </table>
    </>

    )
}
export default VehicleModelList;
