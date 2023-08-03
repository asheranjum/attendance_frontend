import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';


function AttendanceUploader () {

    const [message, setMessage] = useState("");

    const { getRootProps, getInputProps } = useDropzone({
        accept: '.xls,.xlsx',
        maxSize: 1048576, // 1 MB
        onDrop: (acceptedFiles, fileRejections) => {
            setMessage("")
            if (fileRejections.length > 0) {
                const errorMessages = fileRejections.map(file => 
                    `${file.file.name} - ${file.errors.map(e => e.message).join(', ')}`
                );
                setMessage(`Invalid file(s): ${errorMessages.join(', ')}`);
                return;
            }
            acceptedFiles.forEach((file) => {
                const data = new FormData();
                data.append('file', file);
                axios.post('http://127.0.0.1:8000/api/upload-attendance', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    setMessage(response.data.message);
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        // If the server returned an error message, use it
                        setMessage(error.response.data.message);
                    } else {
                        // Otherwise, use a generic error message
                        setMessage(`Error: ${error}`);
                    }
                });
            });
        }
    });


    return (
        <div className='container mt-5'>

            <div style={{ textAlign: 'center', padding: '50px' }}>
            <div {...getRootProps()} style={{ 
                padding: '20px', 
                border: '2px dashed gray', 
                borderRadius: '10px', 
                cursor: 'pointer',
                marginBottom: '20px'
            }}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop excel files here, or click to select files</p>
            </div>
            {message && <div style={{ color: 'green' }}>{message}</div>}
        </div>
           
        </div>
    );
};

export default AttendanceUploader ;
