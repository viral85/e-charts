#echarts

This project inculcates backed APIs to draw data from JSON file which includes username,
comments, data point as well as comment count.

Steps to run:

Once the project file is downloaded:

1. Create a virtual env and set it as your project's env.
2. Activate the env and install requirements through the command `pip install -r requirements.txt`
3. Once installed, the app can be run through the command `uvicorn main:app --reload
   `
   Notes:
1. APIs can be found in the `main.py` file
2. Schemas file define the structure for JSON
3. constants file is used for all the messages to be sent over the APIs
4. Service file consists of functional services for JSON operations
