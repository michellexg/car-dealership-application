import React, {useEffect, useState} from 'react';

function VehicleModelForm(props){
    const [manufacturers, setManufacturers] = useState([]);
    const [manufacturer_id, setManufacturer] = useState('');
    const [name, setName] = useState('');
    const [picture_url, setPicture] = useState('');

    const handleName = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handleManufacturer = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const handlePicture = (event) => {
        const value = event.target.value;
        setPicture(value);
    }

    const handleSubmit = async (event) => {
        const data = {};
        event.preventDefault();
        data.name = name;
        data.manufacturer_id = manufacturer_id;
        data.picture_url = picture_url;

        const modelsUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log(data)
        const response = await fetch(modelsUrl, fetchConfig);
        if (response.ok){
            const newModel = await response.json();
            setName('');
            setManufacturer('');
            setPicture('');
        }
    }
const fetchData = async () => {
    const url = 'http://localhost:8100/api/manufacturers/';
     const response = await fetch(url);

     if (response.ok){
        const data = await response.json();
        setManufacturers(data.manufacturers);
     }
}
useEffect(() => {
    fetchData();
}, []);

return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a vehicle model</h1>
            <form onSubmit={handleSubmit} id="create-vehicle-form">
              <div className="form-floating mb-3">
                <input onChange={handleName} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name" >Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handlePicture} value={picture_url} placeholder="Picture" required type="url" name="picture_url" id="picture_url" className="form-control" />
                <label htmlFor="picture_url">Picture</label>
              </div>
              <div className="mb-3">
                <select onChange={handleManufacturer} value={manufacturer_id} required name="manufacturer_id" id="manufacturer_id" className="form-select">
                  <option>Choose a Manufacturer</option>
                    {manufacturers.map(manufacturer => {
                        return (
                            <option key={manufacturer.id} value={manufacturer.id}>
                                {manufacturer.name}
                            </option>
                        )
                    })}
                </select>
              </div>

              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
)
}
export default VehicleModelForm;
