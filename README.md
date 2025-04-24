# INSTALLATION GUIDE

## Step 1: Installing Pre-Requirements
If you don't have NPM, Node.JS, or MySQL, please make sure to have those before you clone the repository. These are some links to guides on installing those tools

* NPM/Node.js: https://www.youtube.com/watch?v=kQabFyl9r9I
* MySQL (we recommend using the workbench): https://www.youtube.com/watch?v=u96rVINbAUI

After making sure those are installed, you may proceed to 
`git clone` the project

## Step 2: Import the Dump in MySQL

Follow the next steps carefully:
* If you're using the workbench, create a New Connection to your localhost on the default MySQL port  (3306). If you don't wanna have to mess changing the passwords in the config files, set the Password to **Jp2X0f00_`gB**
* * If you'd rather set your own password, go to Backend/index.js and on mySQL.createConnection(Line 21), set the *password* field to your preferred password (needs to match the one you used in your New Connection in MySQL)
* Inside the mySQL server, create a New Schema and name it, **exactly** `librarymanagement`
* Now, in folder MySQL Dump, you will find an **ImportDump** folder. 
* Go to MySQL Workbench top bar -> Server -> Data Import and on **Import from Dump Project Folder**, select the address in your computer that points to **ImportDump**
![](https://i.imgur.com/vefRk0C.png)
* After Selecting it, try to set **Default Schema to be Imported To** into your librarymanagement. If it doesn't allow you (i.e is blank after selecting), you should still be fine. 
* Finally, click on **Start Import**
* If everything worked out, you now have the project's database set up on your MySQL!

# Step 3: Initialize the Project

Now, with the database set up, open a Terminal. Then:
* `cd backend`. Move to backend
* Run `npm start`
	* You will see these confirmation messages![](https://i.imgur.com/acXT3rU.png)
* Then, go to `localhost:8800`
* And your project should be working!
If you want some mock credentials to test:

**Member Login:**
* Username: abryant
* Password: Jm4pUc8nRv

**Staff Login**
* Email: david.wilson@email.com
* Password: Tp3#nKw7$Y
