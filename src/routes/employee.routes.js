const express = require('express')
const router = express.Router()
const employeeController =   require('../controllers/employee.controller');

// get call
// get posts endpoint
/**
 * @swagger
 * /:
 *    get:
 *      tags:
 *      - "employees"
 *      summary: This should return all employees
 *      description: ""
 *      operationId: "getEmployees"
 *      produces:
 *      - "application/json"
 *      parameters: []
 *      security:
 *      - jwt: []  
 *      responses:
 *        200:
 *          description: "successful operation"
 *          schema:
 *            type: "array"
 *            items:
 */
router.get('/', employeeController.findAll);


// Create
    /**
     * @swagger
     * '/':
     *  post:
     *     tags:
     *     - employees
     *     summary: Create a employee
     *     operationId: "register"
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - first_name
     *              - last_name
     *              - email
     *               - phone
     *              - organization
     *              - designation
     *              - salary
     *            properties:
     *              first_name:
     *                type: string
     *                default: abc 
     *              last_name:
     *                type: string
     *                default: def
     *              email:
     *                type: string
     *                default: abc@gmail.com
     *              phone:
     *                type: string
     *                default: 123
     *              organization:
     *                type: string
     *                default: a
     *              designation:
     *                type: string
     *                default: b
     *              salary:
     *                type: string
     *                default: 10000
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.post('/', employeeController.create);
// get with id
  /**
     * @swagger
     * '/{employeeId}':
     *  get:
     *     tags:
     *     - employees
     *     summary: Get a employee by id
     *     parameters:
     *      - name: employeeId
     *        in: path
     *        schema:
     *          type: integer
     *        description: The data of the employee
     *        required: true
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.get('/:id', employeeController.findById);
// update
/**
     * @swagger
     * '/{employeeId}':
     *  put:
     *     tags:
     *     - employees
     *     summary: update employee
     *     description: update an existing employee
     *     parameters:
     *       - in: path
     *         name: employeeId
     *         required: true
     *         schema: 
     *           type: string
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - first_name
     *              - last_name
     *              - email
     *               - phone
     *              - organization
     *              - designation
     *              - salary
     *            properties:
     *              first_name:
     *                type: string
     *                default: abc 
     *              last_name:
     *                type: string
     *                default: def
     *              email:
     *                type: string
     *                default: abc@gmail.com
     *              phone:
     *                type: string
     *                default: 123
     *              organization:
     *                type: string
     *                default: a
     *              designation:
     *                type: string
     *                default: b
     *              salary:
     *                type: string
     *                default: 10000
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.put('/:id', employeeController.update);
//Search
  /**
     * @swagger
     * '/search/{key}':
     *  get:
     *     tags:
     *     - employees
     *     summary: Get a employee by text search
     *     parameters:
     *      - name: key
     *        in: path
     *        schema:
     *          type: string
     *        description: Search data of the employee
     *        required: true
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
  router.get('/search/:key', employeeController.search);
// delete
 /**
     * @swagger
     * '/{employeeId}':
     *  delete:
     *     tags:
     *     - employees
     *     summary: Delete employee by Id
     *     parameters:
     *      - name: employeeId
     *        in: path
     *        description: The unique Id of the employee
     *        required: true
     *     responses:
     *      200:
     *        description: Removed
     *      400:
     *        description: Bad request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.delete('/:id', employeeController.delete);
module.exports = router