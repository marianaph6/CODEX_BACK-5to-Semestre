
             ---------------CREAR BASE DE DATOS---------------

create database ApoloSalud;

             ---------------CREAR TABLAS---------------

create table CodigoAdmin(id_codigo serial primary key, numero varchar(20) not null);

create table Sexo(id_sexo serial primary key, nombre varchar(20) not null);

create table Departamento(id_departamento serial primary key, nombre varchar(30) not null);

create table Rol(id_rol serial primary key, nombre varchar(20) not null);

create table EstadoCivil(id_estadoCivil serial primary key, nombre varchar(20) not null);

create table Especialidad(id_especialidad serial primary key, nombre varchar(40) not null, descripcion text);

create table Medicamento(id_medicamento serial primary key, nombre varchar(40) not null, descripcion text);

create table AreaLaboratorio(id_areaLaboratorio serial primary key, nombre varchar(40) not null);

create table Ciudad(id_ciudad serial primary key, nombre varchar(30) not null, id_departamento int not null, 
foreign key (id_departamento) references Departamento(id_departamento) on delete restrict on update cascade);

create table Examen(id_examen serial primary key, nombre varchar(40) not null, id_areaLaboratorio int not 
null, foreign key (id_areaLaboratorio) references AreaLaboratorio(id_areaLaboratorio) on delete restrict on 
update cascade);

create table Remision(id_remision serial primary key, id_especialidad int not null, descripcion text, 
foreign key (id_especialidad) references Especialidad(id_especialidad) on delete restrict on update 
cascade);

create table Usuario(cedula_usuario text primary key, nombres text not null, apellidos text not null, 
fechaNacimiento date not null, correo text, telefono varchar(20), direccion text, ocupacion text, 
id_especialidad int, id_sexo int not null, id_estadoCivil int not null, id_ciudad int not null, 
id_rol int not null, 
foreign key (id_especialidad) references Especialidad(id_especialidad) on delete restrict on update cascade,
foreign key (id_sexo) references Sexo(id_sexo) on delete restrict on update cascade,
foreign key (id_estadoCivil) references EstadoCivil(id_estadoCivil) on delete restrict on update cascade,
foreign key (id_ciudad) references Ciudad(id_ciudad) on delete restrict on update cascade,
foreign key (id_rol) references Rol(id_rol) on delete restrict on update cascade);

create table Ingreso(id_ingreso serial primary key, usuario varchar(20) not null, contraseña varchar(20) not 
null, cedula_usuario text not null, foreign key (cedula_usuario) references Usuario(cedula_usuario) 
on delete cascade on update cascade);

create table HistoriaClinica(id_historiaClinica serial primary key, id_paciente text not null, 
foreign key (id_paciente) references Usuario(cedula_usuario) on delete cascade on update cascade);

create table Entrada(id_entrada serial primary key, peso double precision, estatura double precision,
fecha date not null, motivoConsulta text not null, descripcion text not null, id_remision int, 
id_historiaClinica int not null,
foreign key (id_remision) references Remision(id_remision) on delete set null on update cascade, 
foreign key (id_historiaClinica) references HistoriaClinica(id_historiaClinica) on delete cascade on update 
cascade);

create table ExamenPaciente(id_examenPaciente serial primary key, id_examen int not null, id_paciente text 
not null, id_medicoAuxiliar text, id_entrada int, resultado text, fecha date, 
foreign key (id_examen) references Examen(id_examen) on delete restrict on update cascade,
foreign key (id_paciente) references Usuario(cedula_usuario) on delete cascade on update cascade,
foreign key (id_medicoAuxiliar) references Usuario(cedula_usuario) on delete set null on update cascade,
foreign key (id_entrada) references Entrada(id_entrada) on delete cascade on update cascade);

create table EntradaPosologia(id_entradaPosologia serial primary key, posologia text not null, id_medicamento
int not null, id_entrada int not null, foreign key (id_medicamento) references Medicamento(id_medicamento) 
on delete restrict on update cascade, foreign key (id_entrada) references Entrada(id_entrada)
on delete cascade on update cascade);

             ---------------INGRESO DE DATOS BÁSICOS---------------

insert into CodigoAdmin(numero) VALUES ('11111');
insert into CodigoAdmin(numero) VALUES ('22222');
insert into CodigoAdmin(numero) VALUES ('33333');

insert into Rol(nombre) VALUES ('Paciente');
insert into Rol(nombre) VALUES ('Medico');
insert into Rol(nombre) VALUES ('Auxiliar');

insert into AreaLaboratorio(nombre) VALUES ('Laboratorios de análisis de rutina');
insert into AreaLaboratorio(nombre) VALUES ('Laboratorios de análisis específicos');

insert into Examen(nombre, id_areaLaboratorio) VALUES ('Biometría Hemática', 1);
insert into Examen(nombre, id_areaLaboratorio) VALUES ('Examen general de orina', 1);
insert into Examen(nombre, id_areaLaboratorio) VALUES ('Grupo sanguíneo', 1);
insert into Examen(nombre, id_areaLaboratorio) VALUES ('Prueba de embarazo', 1);
insert into Examen(nombre, id_areaLaboratorio) VALUES ('Perfil reumático', 1);
insert into Examen(nombre, id_areaLaboratorio) VALUES ('Pruebas de funcionamiento hepático', 1);
insert into Examen(nombre, id_areaLaboratorio) VALUES ('Anatomía patológica', 2);
insert into Examen(nombre, id_areaLaboratorio) VALUES ('Absorción atómica', 2);
insert into Examen(nombre, id_areaLaboratorio) VALUES ('Citogenética', 2);
insert into Examen(nombre, id_areaLaboratorio) VALUES ('Radioinmuno análisis(RIA)', 2);

insert into Sexo(nombre) VALUES ('Femenino');
insert into Sexo(nombre) VALUES ('Masculino');
insert into Sexo(nombre) VALUES ('Otro');

insert into EstadoCivil(nombre) VALUES ('Soltero');
insert into EstadoCivil(nombre) VALUES ('Divorciado');
insert into EstadoCivil(nombre) VALUES ('Viudo');
insert into EstadoCivil(nombre) VALUES ('Casado');
insert into EstadoCivil(nombre) VALUES ('Union libre');

insert into Departamento(nombre) VALUES ('Bolivar');
insert into Departamento(nombre) VALUES ('Atlántico');
insert into Departamento(nombre) VALUES ('Magdalena');
insert into Departamento(nombre) VALUES ('Valle del cauca');
insert into Departamento(nombre) VALUES ('Cundinamarca');
insert into Departamento(nombre) VALUES ('Antioquia');
insert into Departamento(nombre) VALUES ('Cauca');
insert into Departamento(nombre) VALUES ('Nariño');
insert into Departamento(nombre) VALUES ('Caldas');
insert into Departamento(nombre) VALUES ('Risaralda');
insert into Departamento(nombre) VALUES ('Quindio');
insert into Departamento(nombre) VALUES ('Cesar');

insert into Ciudad(nombre, id_departamento) VALUES ('Cartagena', 1);
insert into Ciudad(nombre, id_departamento) VALUES ('Barranquilla', 2);
insert into Ciudad(nombre, id_departamento) VALUES ('Santa Marta', 3);
insert into Ciudad(nombre, id_departamento) VALUES ('Buenaventura', 4);
insert into Ciudad(nombre, id_departamento) VALUES ('Cali', 4);
insert into Ciudad(nombre, id_departamento) VALUES ('Yumbo', 4);
insert into Ciudad(nombre, id_departamento) VALUES ('Bogotá', 5);
insert into Ciudad(nombre, id_departamento) VALUES ('Medellín', 6);
insert into Ciudad(nombre, id_departamento) VALUES ('Itaguí', 6);
insert into Ciudad(nombre, id_departamento) VALUES ('Sabaneta', 6);
insert into Ciudad(nombre, id_departamento) VALUES ('Popayán', 7);
insert into Ciudad(nombre, id_departamento) VALUES ('Pasto', 8);
insert into Ciudad(nombre, id_departamento) VALUES ('Manizales', 9);
insert into Ciudad(nombre, id_departamento) VALUES ('Pereira', 10);
insert into Ciudad(nombre, id_departamento) VALUES ('Santa Rosa de osos', 10);
insert into Ciudad(nombre, id_departamento) VALUES ('Armenia', 11);
insert into Ciudad(nombre, id_departamento) VALUES ('Valledupar', 12);
