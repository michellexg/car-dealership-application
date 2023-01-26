import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function VehicleModelList({}){
    const [models, setModels] = useState([])

    const getModels = async() => {
        const response = await fetch('http://localhost:8100/api/models')
        if (response.ok){
          const data = await response.json();
          const models = data.models;

          setModels(models);
        }
      }

    useEffect(() =>{
        getModels();
      }, [])

    return(
        <>
        <h1>Vehicle Model List</h1>
              <Link className="btn btn-primary m-3" to="/models/new">Create a Vehicle Model</Link>
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
