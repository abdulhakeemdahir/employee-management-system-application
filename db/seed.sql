/* Seeds for SQL table. */
USE employee_DB;

/* Insert 3 Rows into your new table */
INSERT INTO department (name)
VALUES ("Admin"),("Engineer"),("Design");

INSERT INTO role (title, salary, department_id)
VALUES ("Director", 5000, 1),("Software Engineer", 4000, 2), ("UI Designer", 4000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Abdulhakeem", "Dahir", 1, null),("Maksim", "Verkhoturov", 2, 1),("Test", "Designer", 3, 1);