# SOCIALMUD DOCUMENTATION

## DBUTILS

### Register, Login & Account
 - **checkRegister(id)** -> Receives user \_id and checks if there's a register for that ID;
 - **checkUsername(u)** -> Receives user's username and checks if there's a register with that username (ie.: if it exists);
 - **getNonSensitiveData(u)** -> Receive's username and returns non sensitive data about that account;
 - **registerUser(u,p)** -> Receives username and password, checks if there's a register with that username on \_id. If exists, returns false. If not exists, returns true;
 - **searchUser(word)** -> Receives full or part of username and searches for it in DB;
 - **setAuthCaller(id,c)** -> Receives \_id and caller and sets the caller as authed for that \_id;
 - **getUserAuthCaller(id)** -> Receives \_id and searches DB for an authed caller for that user \_id;
 - **getCallerAuthUser(c)** -> Receives caller and searches db for an authed user;
 - **getAccount(id)** -> Receives \_id and returns account linked to that \_id;
 - **login(u,p,c)** -> Receives username, password and caller, makes the login stuff;
 - **logout(id,c)** -> Receives \_id and caller, sets caller to "" for logging out;
 - **setPassword(id,p)** -> Receives \_id and password and set password to the new one;
 - **setDefaultPrivacy(id,p)** -> Receives \_id and privacy, then sets it to default.
 
 ### Profile
 -

## SYSUTILS

## REGISTER

## LOGIN

## LOGOUT

## FEED

## PROFILE

## SEARCH

## DETAILS

## GUI
