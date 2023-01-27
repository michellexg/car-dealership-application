import React, { useEffect, useState } from 'react';

function AppointmentForm() {
    const [technicians, setTechnicians] = useState([]);
    const [vin, setVin] = useState('');
    const [name, setName] = useState('');
    const [datetime, setDateTime] = useState('');
    const [reason, setReason] = useState('');
    const [technician, setTechnician] = useState('');

    const handleVinChange = event => {
        setVin(event.target.value);
    }

    const handleNameChange = event => {
        setName(event.target.value);
    }

    const handleDateTimeChange = event => {
        let utcTime = new Date(event.target.value);
        let offset = utcTime.getTimezoneOffset();
        let offsetHour = offset / 60;
        let hour = ""
        if (offsetHour < 10 && offsetHour > 0) {
            hour = "-0" + offsetHour;
        } else if (offsetHour > 10) {
            hour = "-" + offsetHour.toString();
        } else if (offsetHour < 0 && offsetHour > -10) {
            hour = "+0" + offsetHour;
        } else {
            hour = "-" + offsetHour.toString();
        }
        let time = `${event.target.value}:00${hour}:00`
        setDateTime(time);
    }

    const handleReasonChange = event => {
        setReason(event.target.value);
    }

    const handleTechnicianChange = event => {
        setTechnician(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const data = {};
        data.vin = vin;
        data.name = name;
        data.datetime = datetime;
        data.reason = reason;
        data.technician = technician;
        const url = "http://localhost:8080/api/appointments/"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setVin('');
            setName('');
            setDateTime('');
            setReason('');
            setTechnician('');

        }
    }

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians)
        }

    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new appointment</h1>
                    <form onSubmit={handleSubmit} id="create-appointment-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleVinChange} placeholder="VIN" required type="text" name="vin" id="vin"
                                className="form-control" value={vin} />
                            <label htmlFor="vin">Vin</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} type="text" required name="name" id="name" className="form-control" value={name} />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleDateTimeChange} type="datetime-local" name="datetime" id="datetime" className="form-control" value={datetime} />
                            <label htmlFor="datetime">Date and Time</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleReasonChange} type="reason" required name="reason" id="reason" className="form-control" value={reason} />
                            <label htmlFor="reason">Reason</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleTechnicianChange} value={technician} id="technician" required name="technician" className="form-select">
                                <option>Choose a technician:</option>
                                {technicians.map(technician => {
                                    return (
                                        <option key={technician.id} value={technician.id}>
                                            {technician.name}
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
    )
}

export default AppointmentForm;
