INSERT INTO "Users" (login, password, age) values ('anna123@gmail.com', 'fhgU3fdg', 12);
INSERT INTO "Users" (login, password, age) values ('bob123@gmail.com', 'y2fdh943', 45);
INSERT INTO "Users" (login, password, age) values ('ftunya@gmail.com', 'tkl45sdf', 26);
INSERT INTO "Users" (login, password, age) values ('groshik@gmail.com', 'idfg567sFF', 32);
INSERT INTO "Users" (login, password, age) values ('semenPetrovich@gmail.com', 'pass99', 99);

INSERT INTO "Groups" (name, permissions) values ('readers', ARRAY['READ']);
INSERT INTO "Groups" (name, permissions) values ('writers', ARRAY['WRITE']);
INSERT INTO "Groups" (name, permissions) values ('admins', ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']);
