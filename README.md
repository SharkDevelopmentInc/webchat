# Chat
Web chat created for fun. Created by TheRamenator in early 2022, forked by Shark Development Incorporated ion Febuary 2022.

## Some Features
* To send an image, copy it to your clipboard and paste it while typing in the message form.
* Click on a name in the userlist to interact with user commands.
* Type "/cmds" to see a list of commands
* Mention a user (like "@user") to notify them about your presence.


## How to create admins
* If you decide to fork the original project, you can create an admin account by running the following these instructions. Please note that it is currently broken. 
1. Open the public/admins.json file. Make sure allowAdminCreation is set to true.

2. Run the following command in the chatroom's chat:


  /createadmin name color password

3. To join as an admin, enter your username as !yourpassword
   So for example:
I could execute /createadmin AdminName red ilikepie.
Then, I would enter my username as !ilikepie.

### More about allowAdminCreation
20	- If this variable is set to true, anyone is allowed to create an admin account.
21	- If false, no one is allowed to create an admin account.
22	-
23	- I couldn't think of a more convenient way to let the site's owner create an admin account whenever.
24	-
25	- I would recommend setting it to false after you are done creating an admin account to prevent anyone else from creating their own admin account.
26	-
### How to delete admin accounts
28	- If you want to delete an admin account, open the admins.json file and just delete the admin objects with the admin names that you want to remove.
29	-
30	- For example:
31	- If I wanted to remove the The Slothboy account, my code would change from this:
 ```
 {
 "allowAdminCreation": false,
  "admins": [
   {
    "name": "The Ramenator",
    "color": "#cc5500",
    "password": "!Password"
   },
   {
    "name": "The Slothboy",
    "color": "#009e60",
    "password": "!OtherPassword"
   }
  ]
 }
 ```
...To this:
 ```
 {
  "allowAdminCreation": false,
  "admins": [
   {
    "name": "The Ramenator",
    "color": "#cc5500",
    "password": "!Password"
   }
  ]
 }
```
62	-
63	- Keep in mind JSON has strict syntax, I would recommend pasting the file into [a json validator](https://jsonformatter.org/) to make sure there are no errors.
64	- The most important thing to remember is that JSON doesn't allow [trailing commas](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas).