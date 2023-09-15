# Super Discount Bros. (Team-7)
Notify users about discounts offered at supermarkets and support a bargain shopping experience.

## Ready

### API Key Settings
To display Google Map, create a ".env" file in `./client/` directory.
Then, write the following environment variable with your Google API KEY.
````
REACT_APP_POSIPAN_API_KEY = ~YOUR API KEY~
````

### Ready for Execution
#### Step.1 Server　
First, move to the `./server/` folder.

Next, perform the following for the first time only
````
python manage.py migrate
````

Then, perform the following.
````
python manage.py runserver
````

It can be checked to see http://localhost:8000 if it is connected.



#### Step.2 Client　
Download 'Node.js' from https://nodejs.org/ja/download.

Next, move to the`./client/`.

If you have never installed React, you have to install react by executing the following command.
````
npm install react
````

Next, execute the following.
````
npm start
````

Finally, access the http://localhost:3000.
