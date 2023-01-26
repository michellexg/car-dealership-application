import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ManufacturersList() {
    const [manufacturers, setManufacturers] = useState([]);
    const getManufacturers = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/');
        if (response.ok) {
            const data = await response.json();
            const manufacturers = data.manufacturers;
            setManufacturers(manufacturers);
        } else {
            console.error(response);
        }
    }
    useEffect(() => {
        getManufacturers();
    }, [])

    return (
        <div>
            <Link className="btn btn-primary m-3" to="new/">Add Manufacturer</Link>
            <table className="table table-striped m-3">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map((manufacturer) => {
                        return (
                            <tr key={manufacturer.href}>
                                <td>{manufacturer.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ManufacturersList
