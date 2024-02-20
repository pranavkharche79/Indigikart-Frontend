import axios from "axios";
import { useEffect, useState } from "react";

function AllCustomers(){
    const [customers,setCustomers]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:8000/api/customers")
        .then(resp=>{
            setCustomers(resp.data)
            console.log(customers)
        })
    },[])
    
    return (
        <div className="container-fluid">
            <h4 className="text-black p-2 text-center">All Customers</h4>
            <table className="table table-bordered table-striped table-light table-hover">
            {/* table table-bordered table-striped table-light table-hover */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>User Name</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                {customers.map(x=>(
                    <tr key={x.id}>
                        <td>{x.name}</td>
                        <td>{x.city}</td>
                        <td>{x.gender}</td>
                        <td>{x.phone}</td>
                        <td>{x.userid}</td>
                        <td>{x.pwd}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllCustomers;