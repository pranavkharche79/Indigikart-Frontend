import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import uservalidation from "../validations/uservalidation"
import { closeSnackbar, enqueueSnackbar } from "notistack"

function RegSupplier()
{
    const history = useHistory()
    const [submitted, setSubmitted] = useState(false)
    const [image, setImage] = useState("")
    const [user, setUser] = useState({
        name: "",
        city: "",
        userid: "",
        pwd: "",
        cpwd: "",
        phone: "",
        certificate: ""
    })
    const [errors, setErrors] = useState({})

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        if(!user.certificate){
            enqueueSnackbar("Click on Upload button", {
                variant: "error",
                autoHideDuration:6000,
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
                action,
            });
            e.preventDefault()
            return;
        }
        e.preventDefault()
        setErrors(uservalidation(user))
        setSubmitted(true)
    }

    const submitImage = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "pranav");
        data.append("cloud_name", "dvizikqng");

        fetch("https://api.cloudinary.com/v1_1/dvizikqng/image/upload", {
            method: "post",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                setUser({ ...user, certificate: data.secure_url }); 
                enqueueSnackbar("Certificate uploaded successfully", {
                    variant: "success",
                    autoHideDuration:2000,
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "center",
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const action = (snackbarId) => (
        <>
          <button onClick={() => {closeSnackbar(snackbarId);}}><b>OK</b></button>
        </>
      );

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitted && user.certificate) {
            const formData = new FormData();
            formData.append("certificate ", user.certificate); 
            formData.append("name", user.name);
            formData.append("city", user.city);
            formData.append("pwd", user.pwd);
            formData.append("phone", user.phone);
            formData.append("userid", user.userid);
            // console.log(formData);
            axios.post("http://localhost:8000/api/sellers", formData )
                .then(resp => {
                    // console.log(resp);
                    enqueueSnackbar("Seller registered successfully", {
                        variant: "success",
                        autoHideDuration:4000,
                        anchorOrigin: {
                          vertical: "top",
                          horizontal: "center",
                        },
                    });
                    history.push("/slogin");
                })
                .catch(error => {
                    // console.log(error);
                    enqueueSnackbar(error.response.data, {
                        variant: "error",
                        autoHideDuration: 7000,
                        anchorOrigin: {
                            vertical: "top",
                            horizontal: "center",
                        },
                        action,
                    });
                });
        }
    }, [errors, submitted, user]);

   

    return (
        <div className="container">
            <div className="card shadow bg-transparent mt-3 text-black">
        <div className="card-body">
            <div className="row">
                <div className="col-sm-6 mx-auto">
                    <h4 className="text-center p-2">
                        Seller Registration Form
                    </h4>
                    <form onSubmit={handleSubmit}>
                    <div className="form-group form-row">
                        <label className="col-sm-4 form-control-label">Seller Name</label>
                        <div className="col-sm-8">
                            <input type="text"  pattern="[A-Za-z ]+" required placeholder="Enter the Seller Name" title="Only Alphabet input is allowed" name="name" value={user.name} onChange={handleInput} className="form-control" />
                            {errors.name && <small className="text-danger float-right">{errors.name}</small>}
                        </div>                        
                    </div>
                    <div className="form-group form-row">
                        <label className="col-sm-4 form-control-label">City</label>
                        <div className="col-sm-8">
                            <input type="text" pattern="[A-Za-z]+"  title="Only Alphabet input is allowed" name="city" required placeholder="Enter the City " value={user.city} onChange={handleInput} className="form-control" />
                            {errors.city && <small className="text-danger float-right">{errors.city}</small>}
                        </div>
                        
                    </div>
                    
                    <div className="form-group form-row">
                        <label className="col-sm-4 form-control-label">Phone</label>
                        <div className="col-sm-8">
                            <input type="text"   pattern="[0-9]+" minLength={10} maxLength={10} name="phone" placeholder="Enter 10 digit phone number" title="Only numerical values allowed of 10 digits" required value={user.phone} onChange={handleInput} className="form-control" />
                            {errors.phone && <small className="text-danger float-right">{errors.phone}</small>}
                        </div>
                        
                    </div>
                    <div className="form-group form-row">
                        <label className="col-sm-4 form-control-label">Certificate</label>
                        <div className="col-sm-8">
                            <input type="file" accept=".jpg,.png" required name="photo" onChange={(e) => ( setImage(e.target.files[0]))} className="form-control" />                            
                        </div>
                        
                    </div>

                    <div className="form-group form-row">
                        <label className="col-sm-4 form-control-label"></label>
                        <div className="col-sm-8">
                            <button type="button" onClick={submitImage} required title="Click to upload" class="btn btn-success">Upload Photo</button>
                        </div>
                    </div>

                    <div className="form-group form-row">
                        <label className="col-sm-4 form-control-label">User Name</label>
                        <div className="col-sm-8">
                            <input type="text" required placeholder="Enter the UserName" maxLength={16} title="Upto 16 characters allowed" name="userid" value={user.userid} onChange={handleInput} className="form-control" />
                            {errors.userid && <small className="text-danger float-right">{errors.userid}</small>}
                        </div>
                    </div>

                    <div className="form-group form-row">
                        <label className="col-sm-4 form-control-label">Password</label>
                        <div className="col-sm-8">
                            <input type="password" required placeholder="Enter the Password" maxLength={16} minLength={8} title="min 8 and max 16 characters" name="pwd" value={user.pwd} onChange={handleInput} className="form-control" />
                            {errors.pwd && <small className="text-danger float-right">{errors.pwd}</small>}
                        </div>
                    </div>
                    <div className="form-group form-row">
                        <label className="col-sm-4 form-control-label">Confirm Password</label>
                        <div className="col-sm-8">
                            <input type="password" required placeholder="Confirm the Password" name="cpwd" value={user.cpwd} onChange={handleInput} className="form-control" />
                            {errors.cpwd && <small className="text-danger float-right">{errors.cpwd}</small>}
                        </div>
                    </div>
                    <button className="btn btn-primary float-right">Register Now</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default RegSupplier;
