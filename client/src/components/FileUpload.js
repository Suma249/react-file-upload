import React, { Fragment, useState } from 'react'
import axios from 'axios'
import Message from './Message';
import Progress from './Progress';

function FileUpload() {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("choose file")
    const [uploadedFile, setUploadedFile] = useState({})
    const [message, setMessage] = useState()
    const [uploadPercentage, setUploadPercentage] = useState(0)
    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name)
    }
    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        console.log(formData);
        formData.append('file', file);
        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: ProgressEvent => {
                    setUploadPercentage(parseInt(Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)))
                    //clear percentage
                    setTimeout(() => setUploadPercentage(0), 10000);
                }

            }) //since we have added the proxy in react package.json, we ca durectly use /upload and no need  to add localhost:500/upload
            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath })
            setMessage('file u[ploaded')
        }
        catch (err) {
            if (err.response.status === 500) {
                setMessage("there was a problem with the server")
            }
            else {
                setMessage(err.response.data.msg)
            }
        }
    }
    return (
        <Fragment>
            {message ? <Message msg={message} /> : null}
            <form className='text-center' onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="file" className="form-control-file" id="customFile" onChange={onChange} />
                    <label htmlFor="customFile">
                        {
                            fileName
                        }
                    </label>
                </div>
                <Progress percentage={uploadPercentage} />
                <input type='submit' value='Upload' className='btn btn-primary btn-block mt-4 text-center' />
            </form>
            {
                uploadedFile ? <div className='row mt-5'>
                    <div className='col-md-6 m-auto'>
                        <h3 className='text-center'>{uploadedFile.fileName}</h3>
                        <img style={{ width: '100%' }} src={uploadedFile.filePath} alt="" />
                    </div>
                </div> : null
            }
        </Fragment>
    )
}

export default FileUpload