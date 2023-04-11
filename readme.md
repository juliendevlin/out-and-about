# Out & About
## A journaling app for ski bums, dirt bags, mountaineers, or all of the above.
&emsp;  
### Future Work 
* submit several locations/routes as part of one entry
* image uploads
* auto complete for existing entries 
* 3rd party API to populate db with routes/trails/etc
* authentication
* Maps/stats tabs
* pagination
* 3rd party integrations (lighterpack)
* user feeds
* expanded user-facing error handling
&emsp;   
&emsp;  
### React Component Layout  
|-- Index  
&emsp;|-- App 
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
