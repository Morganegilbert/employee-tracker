CREATE database IF NOT EXISTS employee_DB;

USE employee_DB;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;
SET FOREIGN_KEY_CHECKS = 1;

-- make department table - need to add foreign key info
CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
  );

-- make role table - need to add foreign key info
CREATE TABLE role (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

-- make employee table - need to add foreign key info
CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager VARCHAR(30),
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE CASCADE
);

CREATE TABLE manager (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(60) NOT NULL,
  employee_id INTEGER NOT NULL,
  FOREIGN KEY (employee_id)
  REFERENCES employee(id)
  ON DELETE CASCADE
);