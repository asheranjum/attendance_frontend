import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';


function Attendance() {
    const [attendance, setAttendance] = useState([]);
    const [isDataLoad, setIsDataLoad] = useState(true);
    const [totalWorkHours, setTotalWorkHours] = useState();

    useEffect(() => {
        setIsDataLoad(false)
        axios.get('http://127.0.0.1:8000/api/employee/attendance')
            .then(response => {


                console.log('response.data', response.data)
                setAttendance(response.data.attendance_data);
                setTotalWorkHours(response.data.total_working_hours);
                setIsDataLoad(true)

            })
            .catch(error => { console.error(`Error: ${error}`); setIsDataLoad(false) });
    }, []);

  

    return (
        <div className='container mt-5'>

          
            <div>


                {isDataLoad
                    &&

                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Checkin</th>
                                <th scope="col">Checkout</th>
                                <th scope="col">Total Working Hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendance && attendance?.map((record, index) => (
                                <tr key={index}>
                                    <td>{record.Name}</td>
                                    <td>{record.checkin || "N/A"}</td>
                                    <td>{record.checkout || "N/A"}</td>
                                    <td>{record.total_working_hours}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
};

export default Attendance;
