CREATE DATABASE LIBRARYMANAGEMENT;
USE LIBRARYMANAGEMENT;
CREATE TABLE CLIENT (
    Email    VARCHAR(255) NOT NULL,
    Fname    VARCHAR(255) NOT NULL,
    MInit    VARCHAR(5),
    Lname    VARCHAR(255),
    Phone_no INT,
    PRIMARY KEY (Email)
);

CREATE TABLE LIBRARY_BRANCH 

(Address 		INT			NOT NULL ,

Capacity		INT,			 

PRIMARY KEY(Address)); 

CREATE TABLE LIBRARY_ITEM_LOCATION 

(Library_Item_ID	INT		NOT NULL,

Library_Address		INT		NOT NULL, 
PRIMARY KEY(Library_Item_ID, Library_Address)); 

# Loan Table
CREATE TABLE LOAN 

(LoanID			INT		NOT NULL,

Library_Item_ID	INT		NOT NULL, 

Client_Email VARCHAR(255) NOT NULL,

LoanStatus		VARCHAR(255), 

LoanDate		DATE,

DueDate			DATE,

CurrentFine		INT ,

PRIMARY KEY(LoanID, Library_Item_ID, Client_Email) ,

FOREIGN KEY (Library_Item_ID) REFERENCES LIBRARY_ITEM(ItemID) ,

FOREIGN KEY (Client_Email) REFERENCES CLIENT(Email)); 

# Library Item Table
CREATE TABLE LIBRARY_ITEM 

(ItemID			INT			NOT NULL ,

Title			VARCHAR(255)	NOT NULL ,

No_of_copies	INT,

Status			VARCHAR(255)	NOT NULL ,

Location		VARCHAR(0),

Publisher_ID		INT		NOT NULL ,

Publication_Date	DATE,

Language			VARCHAR(255),

Editor_ID			INT		NOT NULL,

FOREIGN KEY (Publisher_ID) REFERENCES PUBLISHER(Publisher_ID),

FOREIGN KEY (Editor_ID) REFERENCES Editor(Editor_ID),

PRIMARY KEY (ItemID)); 

#Author Table

CREATE TABLE AUTHOR 

(Author_ID		INT			NOT NULL ,

Name			VARCHAR(255)	NOT NULL ,

Nationaility	VARCHAR(255),

PRIMARY KEY (Author_ID)); 

#Publisher Table

CREATE TABLE PUBLISHER 

(Publisher_ID		INT		NOT NULL,

Name			VARCHAR(255)	NOT NULL,

PRIMARY KEY(Publisher_ID));

# Editor Table
CREATE TABLE EDITOR	 

(Editor_ID		INT		NOT NULL ,

Name			VARCHAR(255)	NOT NULL ,

Specialization	VARCHAR(255),

PRIMARY KEY(Editor_ID)); 

 
# Table for library assistants
CREATE TABLE ASSISTANT 

(ESIN			INT		NOT NULL ,

Specialization	VARCHAR(255),

PRIMARY KEY(ESIN)); 

 
# Table for library employees
CREATE TABLE EMPLOYEE 

(SIN		INT			NOT NULL, 

Fname		VARCHAR(255)	NOT NULL ,

Minit		VARCHAR(255),

Lname		VARCHAR(255)		NOT NULL ,

Hire_Date		DATE, 

Access_Level		INT		NOT NULL ,

Address		VARCHAR(255),

Phone_no		INT ,

Work_Hours		INT		NOT NULL ,

Email			VARCHAR(255),

Branch_Address	VARCHAR(255)		NOT NULL,

PRIMARY KEY(SIN)); 

 # Table for employees receieving a fixed salary
CREATE TABLE SALARIED_EMPLOYEES 

(ESIN			INT		NOT NULL,

Salary			INT		NOT NULL ,

FOREIGN KEY (ESIN) REFERENCES EMPLOYEE(SIN),

PRIMARY KEY(ESIN)); 

 
# Table for employees paid hourly
CREATE TABLE HOURLY_EMPLOYEE 

(ESIN			INT		NOT NULL ,

Pay_Scale		INT		NOT NULL ,

FOREIGN KEY (ESIN) REFERENCES EMPLOYEE(SIN) ,

PRIMARY KEY(ESIN)); 

 

CREATE TABLE JANITOR 

(ESIN		INT			NOT NULL ,
Area		VARCHAR	(255)	NOT NULL ,

FOREIGN KEY (ESIN) REFERENCES EMPLOYEE(SIN) ,

PRIMARY KEY(ESIN)); 

 # Table for library managers

CREATE TABLE MANAGER 

(ESIN			INT		NOT NULL ,

Library_Address	VARCHAR(255)	NOT NULL ,

StartedOn		DATE		NOT NULL ,

FOREIGN KEY (ESIN) REFERENCES EMPLOYEE(SIN),

PRIMARY KEY (ESIN)); 

 

CREATE TABLE CATALOGS 
	(Assistant_SIN	INT		NOT NULL ,

Library_Item_ID		INT		NOT NULL ,

FOREIGN KEY (Assistant_SIN) REFERENCES ASSISTANT(ESIN),

FOREIGN KEY (Library_Item_ID) REFERENCES LIBRARY_ITEM(ItemID) ,

PRIMARY KEY(Assistant_SIN, Library_Item_ID)); 

 # Table corresponding to magazine library items 

CREATE TABLE MAGAZINE 

(Item_ID		INT		NOT NULL ,

ISSN			INT		NOT NULL ,

Category		VARCHAR(255),

Edition		INT ,

FOREIGN KEY (Item_ID) REFERENCES LIBRARY_ITEM(ItemID) ,

PRIMARY KEY(Item_ID)); 

 
 # Table corresponding to newspaper library items 
CREATE TABLE NEWSPAPER 

(Item_ID		INT		NOT NULL ,

Issue_Date		DATE		NOT NULL ,

Region			VARCHAR(255),

FOREIGN KEY (Item_ID) REFERENCES LIBRARY_ITEM(ItemID) ,

PRIMARY KEY(Item_ID)); 

 
 # Table corresponding to book library items
CREATE TABLE BOOK 

(Item_ID		INT		NOT NULL ,

ISBN			INT		NOT NULL ,

Page_Count		INT	 ,

Genre			VARCHAR(255), 

Format		VARCHAR(255),

Edition		INT,

FOREIGN KEY (Item_ID) REFERENCES LIBRARY_ITEM(ItemID),

PRIMARY KEY(Item_ID)); 

 
 # Table corresponding to research paper library items
CREATE TABLE RESEARCH_PAPER 

(Item_ID		INT		NOT NULL ,

Institution		VARCHAR(255), 

Field_of_Study	VARCHAR(255),

FOREIGN KEY (Item_ID) REFERENCES LIBRARY_ITEM(ItemID),

PRIMARY KEY(Item_ID)); 

 
 # Table corresponding to the primary genre each author is known to write 
CREATE TABLE AUTHOR_GENRES 

(Author_ID		INT		NOT NULL ,

Genre			VARCHAR(255),

FOREIGN KEY (Author_ID) REFERENCES AUTHOR(Author_ID) ,

PRIMARY KEY (Author_ID)); 

 
# Table corresponding to the relationship between an author and a library item they write
CREATE TABLE WRITTEN_BY 

(Author_ID		INT		NOT NULL ,

Item_ID			INT		NOT NULL ,

FOREIGN KEY (Author_ID) REFERENCES AUTHOR(Author_ID), 

FOREIGN KEY (Item_ID) REFERENCES LIBRARY_ITEM(ItemID) ,

PRIMARY KEY (Item_ID,Author_ID)); 

SELECT *
FROM CLIENT;




