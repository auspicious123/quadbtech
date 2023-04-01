import React, {useContext, useEffect, useState} from "react";
// import useFetch from "./useFetch";


// const API_URL=`https://www.omdbapi.com/?i=tt3896198&apikey=c6987e78&s=titanic`;
export const API_URL=`https://api.tvmaze.com/search/shows`;

const AppContext = React.createContext();


const AppProvider = ({ children }) => {
//   const [query, setQuery] = useState("hacker");
//   const { isLoading, isError, movie } = useFetch(`&s=${query}`);

  const [isLoading, setIsLoading]=useState(true);
  const [movie, setMovie]=useState([]);
  const [isError, setIsError]= useState({show: "false", msg:""});
    const [query, setQuery] = useState("all");


  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.length > 0) {
        setMovie(data);
        setIsLoading(false);
        setIsError({show: "false", msg:""});
      }else {
        setIsError({ show: true, msg: "No movies found" });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

    useEffect(()=>{
      let timerOut= setTimeout(()=>{
        getMovies(`${API_URL}?q=${query}`);
      },800);
      return ()=>clearTimeout(timerOut);
    },[query])

  return (
    <AppContext.Provider value={{isLoading,movie,isError, query, setQuery}}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider,  useGlobalContext};


