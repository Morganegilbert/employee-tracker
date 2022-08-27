
-- seeds department table with name values
INSERT INTO department
  (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

-- seeds role table with title, salary, and department_id values
INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Sales Lead', '100000', 1),
  ('Salesperson', '80000', 1),
  ('Lead Engineer', '150000', 2),
  ('Software Engineer', '120000', 2),
  ('Account Manager', '160000', 3),
  ('Accountant', '125000', 3),
  ('Legal Team Lead', '250000', 4),
  ('Lawyer', '190000', 4);

-- seeds employee table with first_name, last_name, role_id, and manager
INSERT INTO employee
  (first_name, last_name, role_id, manager)
VALUES
  ('John', 'Doe', 2, 1),
  ('Jane', 'Doe', 3, 4),
  ('Daniel', 'Radcliffe', 1, 1),
  ('Elijah', 'Wood', 4, 2);

-- seeds manager table with name and employee_id values
INSERT INTO Manager
  (name, employee_id)
VALUES
  ('Jane Doe', 1),
  ('John Doe', 2);