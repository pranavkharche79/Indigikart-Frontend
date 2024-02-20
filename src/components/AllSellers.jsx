import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

function AllSellers(){
    const [sellers,setSellers]=useState([])

    const loaddata=()=>{
        axios.get("http://localhost:8000/api/sellers")
        .then(resp=>{
            //console.log(resp.data.data)
            setSellers(resp.data.data)
            console.log(sellers)
        })
    }
    useEffect(()=>{
        loaddata()
    },[])

    const updateStatus=(seller)=>{
        let response=window.confirm('Are you sure to update this supplier status ?');
        if(response){
           axios.post("http://localhost:8000/api/sellers/status",{
            sellerid:seller.id,
            status:!seller.isactive
           })
           .then(resp=>{
            enqueueSnackbar("Status updated successfully", {
                variant: "success",
                autoHideDuration:3000,
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
            })
                loaddata()
           })
        }
    }
    
    return (
        <div className="container-fluid text-black">
            <h4 className="p-2 text-center">All Sellers</h4>
            <table className="table table-bordered table-striped table-light table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Details</th>
                        <th>User Name</th>
                        <th>Certificate</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {sellers.map(x=>(
                    <tr key={x.id}>
                        <td>{x.name}</td>
                        <td>
                            City: {x.city}<br/>
                            Phone: {x.phone}                            
                        </td>
                        <td>{x.userid}</td>
                        <td><img style={{width:"200px",height:"200px"}} src={x.certificate}/></td>
                        <td>{x.isactive ? <b>Active</b>:<b>Inactive</b>}</td>
                        <td>
                            {x.isactive ?(
                            <button onClick={(e)=>updateStatus(x)} className="btn btn-danger btn-sm">Deactivate</button>
                            ):(
                            <button onClick={(e)=>updateStatus(x)} className="btn btn-success btn-sm">Activate</button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllSellers;