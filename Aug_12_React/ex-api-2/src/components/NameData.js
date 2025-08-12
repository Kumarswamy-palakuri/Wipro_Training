import axios from "axios";
import { useEffect, useState } from "react";

const NameData=()=>{
   const [name, setName] = useState("");  
const [data,setData]=useState([])
  const getnamedata= async(searchName)=>{
    
    try {
      const res= await axios.get(`https://api.nationalize.io/?name=${searchName}`);
      setData(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
        }
  }

  useEffect(()=>{
getnamedata();
  },[])
  return (
  <>
       <input
        type="text"
        placeholder="Enter a name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
       <button onClick={() => getnamedata(name)}>Search</button>
  <h1>{data.name}</h1>
  <h3>{data.count}</h3>
  {/* {
    (data.country).map((e)=>(
      <p>{e.country_id}  {e.probability}</p>
    ))
  } */}
      {data.country && data.country.map((e, i) => (
      <p key={i}>
        {e.country_id} — {e.probability}
      </p>
      ))}
  </>)
}
export default NameData;