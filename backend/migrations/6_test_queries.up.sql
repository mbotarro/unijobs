insert into userdata(username, password, email, address, telephone, student) values ('Estevam', 'senhateste','estevam@estevam', '', '3258', TRUE);
insert into userdata(username, password, email, address, telephone, student) values ('user', '1234','user@gmail.com', '', '1234-1234', TRUE);

insert into offer (id, name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp, telephone, email) values ('a74c4694-8eb2-11e9-bc42-526af7764a84' ,'Aula de Cálculo I', 'Derivada, Integral, posso te ajudar como  que você quiser!!', '', 30, 40, 1, 2, NOW() - INTERVAL '10 HOUR', '1234-1234', 'user@gmail.com');
insert into offer (id, name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp, telephone, email) values ('a74c4694-8eb2-11e9-bc42-526af7764a85' ,'Aula de Cálculo II', 'FOfereço aulas de Cálculo 2', '', 30, 40, 1, 2, NOW() - INTERVAL '9 HOUR', '1234-1234', 'user@gmail.com');
insert into offer (id, name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp, telephone, email) values ('a74c4694-8eb2-11e9-bc42-526af7764a86' ,'Aula de Cálculo III', 'Aulas de preparação para provas e resolução de listas', '', 30, 40, 1, 2, NOW() - INTERVAL '8 HOUR', '1234-1234', 'user@gmail.com');
insert into offer (id, name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp, telephone, email) values ('a74c4694-8eb2-11e9-bc42-526af7764a87' ,'Álgebra Linear', 'ou Mestrando em Matemática no ICMC. Posso ajudar com provas, listas, dúvidas teóricas etc', '', 30, 40, 1, 2, NOW() - INTERVAL '7 HOUR', '1234-1234', 'user@gmail.com');
insert into offer (id, name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp, telephone, email) values ('a74c4694-8eb2-11e9-bc42-526af7764a88' ,'ICC I', 'Problemas com trabalhos ou provas de ICC I? Estou aqui para te ajudar!!', '', 30, 40, 1, 2, NOW() - INTERVAL '6 HOUR', '1234-1234', 'user@gmail.com');
insert into offer (id, name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp, telephone, email) values ('a74c4694-8eb2-11e9-bc42-526af7764a89' ,'ICC II', 'Posso te ajudar em provas e trabalhos de ICCII', '', 30, 40, 1, 2, NOW() - INTERVAL '5 HOUR', '1234-1234', 'user@gmail.com');
insert into offer (id, name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp, telephone, email) values ('a74c4694-8eb2-11e9-bc42-526af7764a90' ,'Aulas de Física', 'Dou aulas particulares de Física I, II, III e IV', '', 40, 60, 1, 2, NOW() - INTERVAL '5 HOUR', '1234-1234', 'user@gmail.com');
insert into offer (id, name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp, telephone, email) values ('a74c4694-8eb2-11e9-bc42-526af7764a91' ,'Aula de Piano', 'Sou músico formado e dou aula particulares de piano para todos os níveis', '', 30, 30, 1, 4, NOW() - INTERVAL '5 HOUR', '1234-1234', 'user@gmail.com');
insert into offer (id, name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp, telephone, email) values ('a74c4694-8eb2-11e9-bc42-526af7764a92' ,'Pet Care', 'Adoro cachorros!! Aceito cuidar do seu pet na minha casa e passear com ele!!', '', 30, 40, 1, 8, NOW() - INTERVAL '5 HOUR', '1234-1234', 'user@gmail.com');
insert into offer (id, name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp, telephone, email) values ('a74c4694-8eb2-11e9-bc42-526af7764a93' ,'Serviços Domésticos', 'Posso te ajudar com limpeza de casa, apartamento. Também lavo e passo roupa!', '', 30, 40, 1, 6, NOW() - INTERVAL '5 HOUR', '1234-1234', 'user@gmail.com');

insert into request (id, name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp ) values ('a74c4694-8eb2-11e9-bc42-526af7764f64', 'Calculo I', 'Preciso de ajuda na matéria', '', 20, 40, 2, 2, NOW() - INTERVAL '10 HOUR');
insert into request (id, name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp ) values ('a74c4694-8eb2-11e9-bc42-526af7764f65', 'Calculo II', 'Tenho prova semana que vem', '', 20, 40, 2, 2, NOW() - INTERVAL '9 HOUR');
insert into request (id, name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp ) values ('a74c4694-8eb2-11e9-bc42-526af7764f66', 'Calculo III', 'Teorema de Green', '', 20, 40, 2, 2, NOW() - INTERVAL '8 HOUR');
insert into request (id, name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp ) values ('a74c4694-8eb2-11e9-bc42-526af7764f67', 'Álgebra Linear', 'Preciso de ajuda para prova', '', 20, 40, 2, 2, NOW() - INTERVAL '7 HOUR');
insert into request (id, name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp ) values ('a74c4694-8eb2-11e9-bc42-526af7764f69', 'Aula de ICC II', 'Ajuda na matéria', '', 20, 40, 2, 2, NOW() - INTERVAL '6 HOUR');
insert into request (id, name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp ) values ('a74c4694-8eb2-11e9-bc42-526af7764f70', 'Física I', 'Ajuda em Conservação de Movimento Linear', '', 20, 40, 2, 2, NOW() - INTERVAL '5 HOUR');
insert into request (id, name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp ) values ('a74c4694-8eb2-11e9-bc42-526af7764f71', 'Aula de Piano', 'Procuro aula para iniciantes', '', 20, 40, 2, 4, NOW() - INTERVAL '4 HOUR');
insert into request (id, name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp ) values ('a74c4694-8eb2-11e9-bc42-526af7764f72', 'Pet Care', 'Procuro alguém para passear com meu cachorro', '', 20, 20, 2, 8, NOW() - INTERVAL '3 HOUR');
insert into request (id, name, description, extrainfo, minprice, maxprice,  userid, categoryid, timestamp ) values ('a74c4694-8eb2-11e9-bc42-526af7764f73', 'Limpeza', 'Procuro alguém para me ajudar a limpar a casa', '', 20, 60, 2, 6, NOW() - INTERVAL '2 HOUR');
