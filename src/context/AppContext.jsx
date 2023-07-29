import React, { createContext, useEffect, useState } from "react";
import {baseUrl} from '../baseUrl';

//step1
export const AppContext=createContext();

 export default function AppContextProvider({children}){
  
    const [loading,setLoading]=useState(false);
    const [posts,setPosts]=useState([]);
    const [page,setPage]=useState(1);
    const [totalPage,setTotalPage]=useState(null);

    //data filling
    async function fetchBlogPosts(page=1){
      setLoading(true);
      let url=`${baseUrl}?page=${page}`;
      
      try{

        const result= await fetch(url);
        const data=await result.json();

        console.log(data);

        setPage(data.page);
        setTotalPage(data.totalPages);
        setPosts(data.posts)

      }catch(error){

        console.log("Error in fetching data");
        setPage(1);
        setPosts([]);
        setTotalPage(null);

      }

      setLoading(false);
    }

   

    //handling the page change functionality

    function handleChange(page){
        setPage(page);
        fetchBlogPosts(page);
    }


    const value={
        posts,
        setPosts,
        loading,
        setLoading,
        page,
        setPage,
        totalPage,
        setTotalPage,
        fetchBlogPosts,
        handleChange
    }

    //step2

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>


}