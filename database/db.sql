

CREATE DATABASE if not exists DBQualityGate;

USE DBQualityGate;

-- Tabla Users
create table if not exists Users (
  id int1 unsigned not null auto_increment,
  fullname varchar(32) not null,
  username varchar(16) not null,
  password varchar(64) not null,
  level enum("r", "w", "x") default "r",
  created_at timestamp default current_timestamp,
  modified_at timestamp,
  unique (username),
  primary key (id)
);

-- Tabla Defaults
create table if not exists Defaults (
  id int1 unsigned not null auto_increment,
  designation varchar(32) not null,
  type varchar(32) not null,
  user_id int1 unsigned not null,
  created_at timestamp default current_timestamp,
  modified_at timestamp,
  primary key (id),
  CONSTRAINT FK_DefaultUser FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Tabla Etiquetas de Color
create table if not exists Eticolors (
  id int1 unsigned not null auto_increment,
  rgbcode varchar(7) not null,
  designation varchar(32) not null,
  user_id int1 unsigned not null,
  created_at timestamp default current_timestamp,
  modified_at timestamp,
  unique (rgbcode),
  primary key (id),
  CONSTRAINT FK_EticolorUser FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Tabla Parts
create table if not exists Parts (
  id int1 unsigned not null auto_increment,
  np varchar(16) not null,
  designation varchar(32) not null,
  user_id int1 unsigned not null,
  created_at timestamp default current_timestamp,
  modified_at timestamp,
  unique (np),
  primary key (id),
  CONSTRAINT FK_PartUser FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Tabla Registers
create table if not exists Registers (
  id int1 unsigned not null auto_increment,
  color_id int1 unsigned not null,
  part_id int1 unsigned not null,
  label VARCHAR(10) not null,
  default_id int1 unsigned,
  observation varchar(512),
  uuid_image varchar(36),
  ext__image varchar(4),
  user_id int1 unsigned not null,
  created_at timestamp default current_timestamp,
  modified_at timestamp,
  primary key (id),
  CONSTRAINT FK_RegisterEtiColor FOREIGN KEY (color_id) REFERENCES Eticolors(id),
  CONSTRAINT FK_RegisterPart FOREIGN KEY (part_id) REFERENCES Parts(id),
  CONSTRAINT FK_RegisterDefault FOREIGN KEY (default_id) REFERENCES Defaults(id),
  CONSTRAINT FK_RegisterUser FOREIGN KEY (user_id) REFERENCES Users(id)
);