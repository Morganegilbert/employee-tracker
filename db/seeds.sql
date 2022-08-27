
-- change to department with name
INSERT INTO department
  (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

-- change to role with title, salary, and department id
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

-- change to employee with first name, last name, role id, and manager id
INSERT INTO employee
  (first_name, last_name, role_id, manager)
VALUES
  ('Doe', 'John', 2, 1),
  ('Doe', 'Jane', 3, 4),
  ('Radcliffe', 'Daniel', 1, 1),
  ('Wood', 'Elijah', 4, 2);

INSERT INTO Manager
  (name, employee_id)
VALUES
  ('Jane Doe', 1),
  ('John Doe', 2);