import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AppointmentsList() {
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

    async function handleFinish(id) {
        const url = `http://localhost:8080/api/appointments/${id}`;
        let data = {
            "finished": true
        }
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(url, fetchConfig);
        return getAppointment()


    }

    async function handleDelete(id) {
        const url = `http://localhost:8080/api/appointments/${id}`;
        const fetchConfig = {
            method: "DELETE",
        }

        const response = await fetch(url, fetchConfig)
        return getAppointment()
    }

    return (
        <div>
            <Link className="btn btn-primary m-3" to="technicians/new/">Add Technician</Link>
            <Link className="btn btn-primary m-3" to="new/">Create Appointment</Link>
            <Link className="btn btn-primary m-3" to="history/">Find Appointment</Link>
            <table className="table table-striped m-3">
                <thead>
                    <tr>
                        <th></th>
                        <th>VIN</th>
                        <th>Customer name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => {
                        let vip = ""
                        if (appointment.vip) {
                            vip = "VIP"
                        }
                        const dateObject = new Date(appointment.datetime);
                        const date = dateObject.toLocaleDateString()
                        const time = dateObject.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                        return (
                            <tr key={appointment.id} id={appointment.id}>
                                <td className='text-danger text-center'>
                                    {vip}
                                </td>
                                <td>{appointment.vin}</td>
                                <td>{appointment.name}</td>
                                <td>{date}</td>
                                <td>{time}</td>
                                <td>{appointment.technician.name}</td>
                                <td>{appointment.reason}</td>
                                <td>
                                    <div className="btn-group" role="group">
                                        <button type="button" className='btn btn-danger' onClick={() => handleDelete(appointment.id)}>Cancel</button>
                                        <button type="button" className='btn btn-success' onClick={() => handleFinish(appointment.id)}>Finished</button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AppointmentsList
