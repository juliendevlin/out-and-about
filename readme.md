# Out & About
## A journaling app for ski bums, dirt bags, mountaineers, or all of the above. (AKA a glorified form… but a full-stack form!)  
&emsp;  
### Punch List  
* submit several locations/routes as part of one entry
  * restructure how front end state is handled
  * restructure queries/server routes
  * onclick on form to add/remove rows
* image upload
* auto complete for existing db entries 
  * or 3rd party API/web scrape to populate db with routes/trails/etc
* authentication
* Maps/stats tabs
* load a fixed amount of entries per page that you can toggle through
* 3rd party integrations (lighterpack?)
* shared feed between users
* user facing error handling + required/unrequired fields
* refactor
  * clean up + comment
  * further break down components
  * more use query strings/params in server
  * more server side type checking/allow listing/error handling/db type restricting
  * convert to React-Redux
&emsp;   
&emsp;  
### React Component Layout  
|-- Index  
&emsp;|-- App <-- state/handlers/effects  
&emsp;&emsp;|-- Form   
&emsp;&emsp;|-- Entries Container  
&emsp;&emsp;&emsp;|-- Entry Items  
&emsp;&emsp;&emsp;|-- Update Prompt  
&emsp;&emsp;&emsp;|-- Delete Prompt  
&emsp;  
### Server Layout  
|-- server  
&emsp;|-- entries  
&emsp;&emsp;|-- GET  
&emsp;&emsp;|-- POST  
&emsp;&emsp;|-- PUT  
&emsp;&emsp;|-- DELETE  
&emsp;|-- form  
&emsp;&emsp;|-- GET  
&emsp;  
### Database Schema  
![schema](./docs/schema.png)
