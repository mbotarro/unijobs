insert into userdata(username, password, email, address, telephone, student) values ('Estevam', 'senhateste','estevam@estevam', '', '3258', TRUE);
insert into userdata(username, password, email, address, telephone, student) values ('user', '1234','user@gmail.com', '', '1234-1234', TRUE);
insert into request (name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp ) values ('Aula', 'Calculo I', '', 20, 40, 2, 1, NOW() - INTERVAL '10 HOUR');
insert into request (name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp ) values ('Aula', 'Calculo II', '', 20, 40, 2, 1, NOW() - INTERVAL '9 HOUR');
insert into request (name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp ) values ('Aula', 'Calculo III', '', 20, 40, 2, 1, NOW() - INTERVAL '8 HOUR');
insert into request (name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp ) values ('Aula', 'Calculo IV', '', 20, 40, 2, 1, NOW() - INTERVAL '7 HOUR');
insert into request (name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp ) values ('Aula', 'Phrasal Verbs', '', 20, 40, 2, 2, NOW() - INTERVAL '6 HOUR');
insert into request (name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp ) values ('Aula', 'Present Perfect', '', 20, 40, 2, 2, NOW() - INTERVAL '5 HOUR');
