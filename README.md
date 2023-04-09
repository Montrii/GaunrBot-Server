
# GaunrBot-Server

A little tool i have written for myself to receive error messages from [GaunrBot](https://github.com/Montrii/GaunrBot), while not actually connecting to the server its hosted on.

This is essentially a HTTP Server, allowing any application within my LAN to send data to it. Now, i can just code a HTTP POST Request to my internal IP, which in turn would get accepted here.

The script automatically converts this message into a Windows Notification Popup, with the ability to click on it to view the error message (passed by HTTP).

Entirely written in JavaScript.





## Installation

It depends on how you want to operate this.

If you wish to run this server on your machine all the time, follow these steps:

```bash
1. git clone https://github.com/Montrii/GaunrBot-Server
2. Alter every variables to your needs in server.js and gaunrbot_server.bat
3. Install NPM Packages: 'npm install'
4. Run it with 'node server.js'
5. Setup a Windows Service that executes the Batch, or simply put it in Autostart.
6. You are done :).
```



    
## Authors

- [@Montrii](https://www.github.com/Montrii)


## Acknowledgements

 - [node-notifier](https://www.npmjs.com/package/node-notifier)
 - [child_process](https://www.npmjs.com/package/child_process)


## License

[MIT](https://choosealicense.com/licenses/mit/)

