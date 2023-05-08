USE company_db;

-- Insert sample data into the department table
INSERT INTO department (name)
VALUES ('Marketing'),
       ('Engineering'),
       ('Human Resources'),
       ('Sales');

-- Insert sample data into the role table
INSERT INTO role (title, salary, department_id)
VALUES ('Marketing Manager', 120000, 1),
       ('Software Engineer', 140000, 2),
       ('HR Manager', 110000, 3),
       ('Sales Manager', 130000, 4),
       ('Sales Representative', 60000, 4);

--  Insert sample data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
       ('Jane', 'Smith', 2, 1),
       ('Bob', 'Johnson', 3, NULL),
       ('Emily', 'Lee', 4, 3),
       ('Mike', 'Davis', 5, NULL),
       ('Sam', 'Roberts', 2, 5),
       ('Olga', 'Kim', 4, NULL),
       ('Fidel', 'Choi', 5, 7);

