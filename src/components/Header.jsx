import { useSelector } from "react-redux";

function Header(){
    const state=useSelector((state)=>state);
    console.log("Header ",state.loggedin.Username)
    return (
        <div className="jumbotron p-3 mb-0 rounded-0 bg-dark text-white">
            <img src={'/IndiGIKart.png'} style={{width:"150px",height:"100px",borderRadius:"150px"}} className="float-left"/>
            {state.loggedin.IsLoggedIn ?
            <>
            <h5 className="float-right"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg> Welcome {state.loggedin.Username }</h5> </>:
            ''}
            <h1 className="text-center"  >Welcome To IndiGI-Kart</h1>
            <div className="clearfix"></div>
        </div>
    )
}

export default Header;