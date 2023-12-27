import React from 'react';
import './Employee.css';
import { Link } from 'react-router-dom';
// import Avatar from 'react-avatar';


const Employee = ({ _id, first_name, last_name, email, phone, organization, designation, salary, removeEmployee }) => {

  return(
    <tr>
      <td>{ first_name }</td>
      <td>{ last_name }</td>
      <td>{ email }</td>
      <td>{ phone }</td>
      <td>{ organization }</td>
      <td>{ designation }</td>
      <td>{ salary }</td>
      <td>
        <button onClick={ () => removeEmployee(_id) } className="Action-Button fa fa-trash"></button>
        <Link to={{ pathname: '/edit', search: _id }}>
         <button className="Action-Button fa fa-pencil"></button>
        </Link>
      </td>

    </tr>
  );
};

export default Employee;
