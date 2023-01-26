import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AutomobilesList() {
    const [automobiles, setAutomobiles] = useState([]);
    const getAutomobiles = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/');
        if (response.ok) {
            const data = await response.json();
            const automobiles = data.autos;
            setAutomobiles(automobiles);
        } else {
            console.error(response);
        }
    }
    useEffect(() => {
        getAutomobiles();
    }, [])

    return (
        <div>
            <Link className="btn btn-primary m-3" to="new/">Add Automobile</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                    </tr>
                </thead>
                <tbody>
                    {automobiles.map((automobile) => {
                        return (
                            <tr key={automobile.href}>
                                <td>{automobile.vin}</td>
                                <td>{automobile.color}</td>
                                <td>{automobile.year}</td>
                                <td>{automobile.model.name}</td>
                                <td>{automobile.model.manufacturer.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AutomobilesList
