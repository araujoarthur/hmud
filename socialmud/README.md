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
 - **setDefaultPrivacy(id,p)** -> Receives \_id and privacy, then sets it to default;
 - **usernameToID(u)** -> Receives an username and returns its \_id, if exists, else returns _null_;
 - **idToUsername(id)** -> Receives an \_id and returns its username, if \_id does not exist, returns _null_;
 - **setVip(id)** -> Receives \_id and toggles VIP for user \_id provided (not useful, no features for now);
 - **setVerified(id)** -> Receives \_id and toggles verified for the user;
 - **setDescription(id,d)** -> Receives \_id and text to set the user's description;
 - **setLastActive(id)** -> Receives \_id and sets last active to Date.now() for that user;
 - **getRegisterDate(id)** -> Receives \_id and returns register date for that user, if exists;
 

### Friendship
 -> Friend requests are _ALWAYS_ \[from,to]
 - **checkRequest(u1,u2)
## SYSUTILS

## REGISTER

## LOGIN

## LOGOUT

## FEED

## PROFILE

## SEARCH

## DETAILS

## GUI
