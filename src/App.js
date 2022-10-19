import React,{useEffect, useState} from 'react';
import "./App.css";
import axios from "axios";
import Addtodo from "./Addtodo";
import Todolist from "./Todolist";
import {BrowserRouter, Routes,Route} from "react-router-dom";





function App() {



  var display = 1;

  function handlecomp(page){
    if(page == 1){
      display = 1;
    }else{
      display = 0;
    }
  }


  
  

  return (
    <><div className='vail'><h1>This project does not currently have a mobile version</h1></div><BrowserRouter>
      <Routes>
        <Route index element={<Todolist />} />
        <Route path='addtodo' element={<Addtodo />} />
      </Routes>

    </BrowserRouter></>
  
     
  );
  

 
}

export default App;
