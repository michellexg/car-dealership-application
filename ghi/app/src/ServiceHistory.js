import React, { useState, useEffect } from 'react';



function ServiceHistory() {
    const [appointments, setAppointment] = useState([]);
    const getAppointment = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');
        if (response.ok) {
            const data = await response.json();
            const appointments = data.appointments;
            let unfinishedAppointment = []
            for (let appointment of appointments) {
                if (appointment.finished === false) {
                    unfinishedAppointment.push(appointment)
                }
            }
            setAppointment(unfinishedAppointment);
        } else {
            console.error(response);
        }
    }
    useEffect(() => {
        getAppointment();
    }, [])

    const [vin, setVin] = useState('');
    const [targetVin, setTargetVin] = useState('');

    const handleVinChange = event => {
        setVin(event.target.value);
    }

    const handleSearch = event => {
        event.preventDefault();
        setTargetVin(vin);
        setVin('');
    }

    return (
        <div>
            <form onSubmit={handleSearch} id="enter-vin">
                <div className="input-group m-3">
                    <input onChange={handleVinChange} placeholder="VIN" required type="text" name="vin" id="vin"
                        className="form-control" aria-describedby="basic-addon2" value={vin} />
                    <div className="input-group-append">
                        <button className="btn btn-primary">Search</button>
                    </div>
                </div>
            </form>
            <h1> Service appointments </h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Customer name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.filter(appointment => appointment.vin === targetVin).map((appointment) => {
                        const dateObject = new Date(appointment.datetime);
                        const date = dateObject.toLocaleDateString();
                        const time = dateObject.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                        return (
                            <tr key={appointment.id} id={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.name}</td>
                                <td>{date}</td>
                                <td>{time}</td>
                                <td>{appointment.technician.name}</td>
                                <td>{appointment.reason}</td>
                            </tr>
                        );

                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ServiceHistory
