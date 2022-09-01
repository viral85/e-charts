from fastapi import FastAPI
from schemas import SubComments
from service import view_json, update_json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/get-data")
async def get_data():
    """
    This API (get request) sends over data fetched from the json file 'data_point.json' which consists of data as well
    as user comments.
    :return: bar raph data fetched from JSON file 'data_point.json'
    """
    return {"data": view_json()}


@app.post("/leave-comments")
async def comment(comments: SubComments):
    """
    This API lets a user post comments related to a selected data point on a given bar graph and lets the user view
    them as well.
    :param comments: Schema class.
    :return: Updated data from the json file.
    """
    data = update_json(comments)
    if type(data) == str:
        return {"message": data}
    return {"data": data}
