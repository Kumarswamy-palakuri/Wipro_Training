import axios from "axios";
import { useEffect,useState } from "react";

const  Movies=()=>{
  const [movies, setMovies] = useState([]);
const getMoviesdata= async()=>{
  try {
    const response =await axios.get("https://www.omdbapi.com/?i=tt3896198&apikey=1c12799f&s=titanic&page=1");

    console.log(response.data.Search);
    setMovies(response.data.Search);
  } catch (error) {
    console.error("Error fetching movies data:", error);
  }
}

useEffect(() => {
    getMoviesdata();
  }, []);

return(

<> 
<h1>Movies List</h1>
{movies.map((e) => (
        <p>{e.Title}</p> // ✅ return JSX + correct field name
      ))}
</>
 
  
)
}
export default Movies;