-- Define the department table
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) -
);

-- Define the role table
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30), 
    salary DECIMAL(10,2), 
    department_id INT, 
    FOREIGN KEY (department_id) REFERENCES department(id) 
);

-- Define the employee table
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INT, -- Foreign key to link the employee to a role
    manager_id INT, -- Foreign key to link the employee to their manager
    FOREIGN KEY (role_id) REFERENCES role(id), -- Foreign key constraint to ensure referential integrity
    FOREIGN KEY (manager_id) REFERENCES employee(id) 
);
