from pydantic import BaseModel


class SubComments(BaseModel):
    data_id: int
    comment: str
    user_name: str
