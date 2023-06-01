import React, {useState,useEffect} from "react";
import axios from "axios";
import "./CreateInterview.css"
import {Link} from "react-router-dom";
const CreateInterview = ()=>{
    const [start,setStart] = useState(null)
    const [end,setEnd] = useState(null)
    const [AvailableParticipants,setParticipants] = useState([])
    const [selectedParticipants,setSelectedParticipant] = useState([])
    const handleAddParticipant = (parti_Id)=>{
        const tempObj = {
            _id:parti_Id
        }
        for (const tempObjElement of selectedParticipants) {
            if (tempObjElement._id==parti_Id){
                alert('already added');
                return
            }
        }
        setSelectedParticipant(prevState =>[...prevState,tempObj])
    }
    useEffect(()=>{
        console.log("selectedParticipant--->",selectedParticipants)
    },[selectedParticipants])
    useEffect(async ()=>{
        const result = await axios.get("http://127.0.0.1:5000/api/participant")
        setParticipants(result.data.participants)
    },[])
    const handleChangeStart = (e)=>{
        e.preventDefault()
        console.log(e.target.value)
        const today = new Date();
        const startTime = new Date(today.toDateString() + ' ' + e.target.value);
        console.log(startTime)
        setStart(startTime)
    }
    const handleChangeEnd = (e)=>{
        e.preventDefault()
        console.log(e.target.value)
        const today = new Date();
        const endTime = new Date(today.toDateString() + ' ' + e.target.value);
        setEnd(endTime)
        console.log(endTime)
    }
    const HandleSubmit = async ()=>{
        if(start > end) {
            return alert('End time should be after start time.');
        }else if(selectedParticipants.length===0){
            return alert('please select participants first');
        }else{
            const dataTobeSubmitted = {
                start:start,
                end:end,
                participants:selectedParticipants
            }
            const result = await axios.post("http://127.0.0.1:5000/api/interview/create",dataTobeSubmitted);
            console.log(result.data)
            alert(result.data.message)
        }
    }
    return(
        <div className=" mt-5 text-center ">
            <div className="container d-flex justify-content-end align-items-end">
                <Link to="/interviews">
                    <button className="btn btn-dark">
                        interviews
                    </button>
                </Link>
            </div>
            <div className="display-4  text-dark my-5 ">
                Create Interview
            </div>
            <div className="form-section container d-flex align-items-center justify-content-center">
                <form className="w-50" onSubmit={HandleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label  text-left w-100">start time</label>
                        <input onChange={handleChangeStart} type="time" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label text-left w-100 ">end time</label>
                        <input onChange={handleChangeEnd} type="time" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label text-left w-100 ">add participants from the below list of participants</label>
                        {
                            selectedParticipants.map((eachSelectedParticipant)=>{
                                return(
                                    <h1 key={eachSelectedParticipant._id} className="text-dark h4">
                                        {eachSelectedParticipant.name}
                                    </h1>
                                )
                            })
                        }
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
            <div className="table-section mt-5 container">
                <table className="table table-success">
                    <thead className="bg-dark text-white ">
                    <tr>
                        <th scope="col">name</th>
                        <th scope="col">email</th>
                        <th scope="col">add</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        AvailableParticipants.map((eachAvailableParticipant)=>{
                            return(
                                <tr key={eachAvailableParticipant._id}>
                                    <td>{eachAvailableParticipant.name}</td>
                                    <td>{eachAvailableParticipant.email}</td>
                                    <td>
                                        <button className="btn btn-dark" onClick={()=>handleAddParticipant(eachAvailableParticipant._id)}>add</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CreateInterview