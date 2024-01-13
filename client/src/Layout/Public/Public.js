import React, { Fragment } from 'react';
import "./../Home/Home.css";
import { PropagateLoader } from 'react-spinners';
const Public = () => {
  return (
    <div className="Spinner-Wrapper"> <PropagateLoader color={'#333'} /></div>
  );
};

export default Public;