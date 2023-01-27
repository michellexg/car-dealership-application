import React, { useState } from 'react';

function ManufacturerForm() {
    const [name, setName] = useState('');

    const handleNameChange = event => {
        setName(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const data = {};
        data.name = name
        const url = "http://localhost:8100/api/manufacturers/"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setName('');
        }


    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a manufacturer</h1>
                    <form onSubmit={handleSubmit} id="create-manufacturer-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name"
                                className="form-control" value={name} />
                            <label htmlFor="name">Name</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ManufacturerForm;
