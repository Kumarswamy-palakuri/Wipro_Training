import axios from 'axios';
import React, {Component, useState} from 'react';

const UserSearch = () => {
   const[userResult, SetUserResult] = useState({})
    const[userId,SetUserId] = useState(0) 

    const handleChange = event => {
        SetUserId(event.target.value)
    }

    const show = () => {
      let uid = parseInt(userId);
      axios.get("https://jsonplaceholder.typicode.com/users/"+uid).then(
            (response) => {
                SetUserResult(response.data)
            }  
          )
    }

    return(
      <div>
         <label>
                User Id : </label>
            <input type="number" name="userId" 
                value={userId} onChange={handleChange} /> <br/>
            <input type="button" value="Show" onClick={show} />
            <hr/>
            User Id : <b>{userResult.id}</b> <br/> 
            Name : <b>{userResult.name}</b> <br/>
            User Name : <b>{userResult.username}</b> <br/>
            Email : <b>{userResult.email}</b> <br/>
            Phone : <b>{userResult.phone}</b> <br/>
            Website : <b>{userResult.website}</b>
      </div>
    )
  
}

export default UserSearch;