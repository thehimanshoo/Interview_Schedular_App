import React ,{useState,useEffect}from "react";
import axios from "axios";
const Interviews = ()=>{
    const [interviews,setInterviews] = useState([])
    const localdate = (gmtDate)=>{
        return new Date(gmtDate).toLocaleDateString()
    }
    useEffect(async ()=>{
        const result = await axios.get("http://127.0.0.1:5000/api/interview")
        setInterviews(result.data.interviews)
        console.log(result.data.interviews)
    },[])
    return(
        <div className="mt-5 d-flex text-center container flex-column justify-content-center">
            <div className="display-4 my-4">
                scheduled interviews
            </div>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
                {
                    interviews.map(eachInterview=>{
                        return(
                            <div className="card mb-3" key={eachInterview._id} style={{width:"600px"}}>
                                <div className="row g-0">
                                    <div className="col-md-4 d-flex align-items-center flex-column justify-content-center">
                                        <div className="display-5 my-3 font-weight-bold text-primary">timings</div>
                                        <h1 className="lead">start: {eachInterview.start}</h1>
                                        <h1 className="lead">end:  {eachInterview.end}</h1>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body text-dark font-weight-normal">
                                            <div className="display-5 my-3 font-weight-bold text-primary">participants</div>
                                            {
                                                eachInterview.participants.map((participant)=>{
                                                    return(
                                                        <p key={participant._Id}>{participant.name}</p>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Interviews