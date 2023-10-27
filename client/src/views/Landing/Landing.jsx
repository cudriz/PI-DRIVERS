// import React from 'react'
import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.container}>
      
  
  
        <Link className={style.button} to="/home">
          HOME
        </Link>
     
    </div>
  );
};

export default Landing;
