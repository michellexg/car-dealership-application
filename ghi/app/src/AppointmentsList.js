import React, { useEffect, useState } from 'react';



function AppointmentsList({ appointments, salesRecords, getAppointment }) {
    const vins = salesRecords.map((salesRecord) => salesRecord.automobile.vin);

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
        <table className="table table-striped">
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
                    if (vins.includes(appointment.vin)) {
                        vip = "VIP"
                    }
                    const dateObject = new Date(appointment.datetime);
                    const offset = dateObject.getTimezoneOffset()
                    console.log("offset", offset)
                    const date = dateObject.toLocaleDateString()
                    const time = dateObject.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    return (
                        <tr key={appointment.id} id={appointment.id}>
                            <td>{vip}</td>
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
    )
}

export default AppointmentsList
