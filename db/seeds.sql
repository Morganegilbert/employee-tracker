-- change to department with name
INSERT INTO voters
  (first_name, last_name, email)
VALUES
  ('James', 'Fraser', 'jf@goldenbough.edu'),

-- change to role with title, salary, and department id
INSERT INTO parties
  (name, description)
VALUES
  ('JS Juggernauts', 'The JS Juggernauts eat, breathe, and sleep JavaScript. They can build everything you could ever want in JS, including a new kitchen sink.'),

-- change to employee with first name, last name, role id, and manager id
INSERT INTO candidates
  (first_name, last_name, party_id, industry_connected)
VALUES
  ('Ronald', 'Firbank', 1, 1),

  