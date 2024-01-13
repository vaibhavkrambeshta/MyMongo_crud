import React, { Fragment } from 'react';
import AddEmployee from '../../components/AddEmployee/AddEmployee';
import useAuth from "./../../hooks/useAuth";

const Add = () => {
  return (
    <Fragment>
      <AddEmployee />
    </Fragment>
  );
};

export default Add;