# loneJS v1.0

**STEPS TO PREVIEW IN BROWSER**
- go to link: https://github.com/robbobfrh84/loneJS
- click -> [Clone or download]
- copy link
- In terminal cd (to directory this file is located in)
- in the command line: enter > `$ git clone https://github.com/robbobfrh84/loneJS.git`
- cd loneJS
- Ensure you have this installed: https://www.npmjs.com/package/http-server
- In Terminal: `http-server -c-1`
- Open browser and go to http://localhost:8080/ if this file is index.html
- to view page2 of template, simply add the endpoint /#page2 so the url looks like > http://localhost:8080/#page2
- IF the main `.html` file isn't named index.html, just add the endpoint of the file (ex: http://localhost:8080/template.html)
- ALSO, you can `http-server -c-1 -p 8010` (will change port to 8010 if there's a conflict for some reason)
- ALSO, you may need to `sudo kill -9 PID` (If port has conflict (`top`: to find out PID)
