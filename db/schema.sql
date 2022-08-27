-- creates database if there is none
CREATE database IF NOT EXISTS employee_DB;

-- database name and foreign key check
USE employee_DB;
SET FOREIGN_KEY_CHECKS = 0;

-- dropts tables if they exist
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS manager;
SET FOREIGN_KEY_CHECKS = 1;

-- department table setup
CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
  );

-- role table setup
CREATE TABLE role (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

-- employee table setup
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

-- manager table setup
CREATE TABLE manager (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(60) NOT NULL,
  employee_id INTEGER NOT NULL,
  FOREIGN KEY (employee_id)
  REFERENCES employee(id)
  ON DELETE CASCADE
);