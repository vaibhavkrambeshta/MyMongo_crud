import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import { PropagateLoader } from 'react-spinners';
// Components
import Employee from "../../components/Employee/Employee";
import SearchEmployees from "../../components/SearchEmployees/SearchEmployees";

class Home extends Component {
  state = {
    data: null,
    allEmployees: null,
    error: ""
  };

  async componentDidMount() {
    try {
      const employees = await axios("/api/v1/employees");
      console.log("employees===", employees)
      this.setState({ data: employees.data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  removeEmployee = async id => {
    try {
      const employeeRemoved = await axios.delete(`/api/v1/employees/${id}`);
      const employees = await axios("/api/v1/employees");
      this.setState({ data: employees.data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  searchEmployees = async key => {
    try {
        const searchEmployees = await axios(`/api/v1/employees/search/${key}`);
        // const employees = await axios("/api/v1/employees");
        this.setState({ data: searchEmployees.data });
      } catch (err) {
        this.setState({ error: err.message });
      }
  };

  render() {
    let employees;

    if (this.state.data)
      employees =
        this.state.data.employees &&
        this.state.data.employees.map(employee => (
          <Employee key={employee._id} {...employee} removeEmployee={this.removeEmployee} />
        ));
    else return <div className="Spinner-Wrapper"> <PropagateLoader color={'#333'} /> </div>;

    if (this.state.error) return <h1>{this.state.error}</h1>;
    if (this.state.data !== null)
      if (!this.state.data.employees.length)
        return <h1 className="No-Employees">No employees!</h1>;

    return (

      <div className="Table-Wrapper">
        <h1>Employees:</h1>
        <SearchEmployees searchEmployees={this.searchEmployees} />
        <table className="Table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Organization</th>
              <th>Designation</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>{employees}</tbody>
        </table>
      </div>
    );
  }
}

export default Home;
