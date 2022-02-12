create schema saikal_muratbek collate utf8_general_ci;

use saikal_muratbek;

create table category
(
    id          int auto_increment
        primary key,
    name        varchar(255) not null,
    description text         null
);

create table location
(
    id          int auto_increment
        primary key,
    name        varchar(255) not null,
    description text         null
);

create table subject
(
    id          int auto_increment
        primary key,
    name        varchar(255) not null,
    category_id int          null,
    location_id int          null,
    description text         null,
    image       varchar(31)  null,
    constraint subject_category_id_fk
        foreign key (category_id) references category (id),
    constraint subject_location_id_fk
        foreign key (location_id) references location (id)
);

insert into inventory.category (id, name, description)
values  (10, 'computer', 'something2'),
        (11, 'furniture', null),
        (12, 'dishes', null),
        (16, 'food', 'tomato');

insert into inventory.location (id, name, description)
 values  (1, 'first floor', null),
          (7, 'second floor', 'above the bridge'),
          (8, 'director cabinet', null),
          (9, 'home', '2 meters aaway');

insert into inventory.subject (id, name, category_id, location_id, description, image)
values  (9, 'computer', 10, 8, 'nice computer', 'download (3).jpeg'),
        (10, 'ASUS ZENBOOK', 10, 7, null, 'geforce_rtx_2.jpg'),
        (13, 'SOFA', 12, 1, null, null),
        (17, 'something3', 10, 7, 'something7777', null),
        (22, 'Armchair', 11, 1, 'something7777', null);