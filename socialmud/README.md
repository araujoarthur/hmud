# SOCIALMUD DOCUMENTATION

## DBUTILS

### Register, Login & Account
 - checkRegister(id) -> Receives user \_id and checks if there's a register for that ID;
 - checkUsername(u) -> Receives user's username and checks if there's a register with that username (ie.: if it exists);
 - getNonSensitiveData(u) -> Receive's username and returns non sensitive data about that account;
 - registerUser(u,p) -> Receives username and password, checks if there's a register with that username on \_id. If exists, returns false. If not exists, returns true;
 - searchUser(word) -> Receives full or part of username and searches for it in DB;
 - setAuthCaller(u,c) -> Receives \_id and caller and sets the caller as authed for that \_id;
 - getUserAuthCaller(u) -> Receives \_id and searches DB for an authed caller for that user;
 - getCallerAuthUser(c) -> Receives caller and searches db for an authed user;

## SYSUTILS

## REGISTER

## LOGIN

## LOGOUT

## FEED

## PROFILE

## SEARCH

## DETAILS

## GUI
