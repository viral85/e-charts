from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_get_data():
    response = client.get("/get-data")
    assert response.status_code == 200


def test_comment():
    response = client.post("/leave-comments", json={"data_id": 2, "comment": "test comment", "username": "D.Pithva"})
    assert response.status_code == 200


def test_comment_invalid_id():
    response = client.post("/leave-comments", json={"data_id": 222, "comment": "test comment", "username": "D.Pithva"})
    assert response.data == "Invalid data id"
