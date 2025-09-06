import { useState } from "react";
import AuthService from "../Services/AuthService";

const Login = () => {

    // localStorage.clear();
    const[message,setMessage] = useState("")
    const [data,setState] = useState({
        username : '',
        password : '',
        result : ''
    })

    const handleChange = event => {
        setState({
          ...data,[event.target.name]:event.target.value
        })   
     }

    const authService = AuthService();

    const handleLogin = async () => {
      localStorage.clear();
        try {
        const token = await authService.login(data.username,data.password);
        // alert(token);
        setMessage("Token Generated...Access the Protected Resource");
        }
        catch(error) {
            alert("Login Failed");
        }
    }
         return(   
        <div>
          <form>
            User Name : 
            <input type="text" name="username" value={data.username} 
                onChange={handleChange} /> <br/><br/>
            Password :
            <input type="password" name="password" value={data.password} 
              onChange={handleChange} /> <br/><br/>
            <input type="button" value="Login" onClick={handleLogin} />   <br/><br/>
            {/* Full Name : {data.fullName} 
           Result :  {data.result} */}
           {message}
          </form>
        </div>
      )

}

export default Login;