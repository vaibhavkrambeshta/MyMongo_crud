'use strict';
const Employee = require('../models/employee.model');
exports.findAll = async(req, res) => {
  try {
    const employees = await Employee.find({});
    res.send({ employees })
  } catch(err) {
    res.status(400).send({ error: err });
  }
};
exports.create = async(req, res) => {
  try {
    console.log(req.body);
    const newEmployee = await Employee.create({ 
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      organization: req.body.organization,
      designation: req.body.designation,
      salary: req.body.salary
     });
     res.send({ newEmployee });
  } catch(err) {
    res.status(400).send({ error: err });
  }
};
exports.findById = async(req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.send({ employee });
  } catch (err) {
    res.status(404).send({ message: 'Employee not found!' });
  }
};
exports.update = async(req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body);
     res.send({ message: 'The employee was updated' });
  } catch(err) {
    res.status(400).send({ error: err });
  }
};
exports.delete = async(req, res) => {
  try {
    console.log("id ===", req.params.id)
    const removeStudent = await Employee.deleteOne({_id: req.params.id});
     res.send({ message: 'The student was removed' });
  } catch(err) {
    console.log("err ===", err)
    res.status(400).send({ error: err });
  }
};
exports.search = async(req, res) => {
  try {
    const employees = await Employee.find({
      $or: [
        {
          first_name: {
            $regex: req.params.key
          }
        }
      ]
    });
    res.send({ employees });
  } catch (err) {
    res.status(404).send({ message: 'Employee not found!' });
  }
};
