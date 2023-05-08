-- Insert sample data into the department table
INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Marketing'),
       ('Finance');

-- Insert sample data into the role table
INSERT INTO role (title, salary, department_id)
VALUES ('Marketing Manager', 100000, 3),
       ('Marketing Coordinator', 50000, 3),
       ('Finance Manager', 120000, 4),
       ('Accountant', 70000, 4);

--  Insert sample data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Cleidy', 'Azucena', 1, NULL),
       ('Jose', 'Smith', 2, 1),
       ('Katherine', 'Johnson', 3, NULL),
       ('Emily', 'Lee', 4, 3),
       ('Yasmin', 'Davis', 5, NULL),
       ('Norma', 'Roberts', 6, 5),
       ('Olga', 'Kim', 7, NULL),
       ('Fidel', 'Choi', 8, 7);
