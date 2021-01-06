/* Seeds for SQL table. */
USE employee_DB;

/* Insert 3 Rows into your new table */
INSERT INTO department (name)
VALUES ("Admin"),("Engineer"),("Design");

INSERT INTO role (title, salary, department_id)
VALUES ("Director", 5000, 1),("Software Engineer", 4000, 2), ("UI Designer", 4000, 3);

INSERT INTO employee (first_name, last_name)
VALUES ("Abdulhakeem", "Dahir"),("Maksim, Verkhoturov"),("");