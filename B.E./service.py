import json
import random
from constants import UPDATE_FAIL, VIEW_FAIL, INVALID_DATA_ID


def view_json():
    """
    This function fetches data from JSON file which includes username, data points, and comments as well as comment
    count.
    :return: Entire JSON block fetched frm the file.
    """
    try:
        with open("data_point.json", 'r+') as f:
            data = json.load(f)
        return data
    except Exception as e:
        return VIEW_FAIL + str(e)


def update_json(comments):
    """
    This function writes data to JSON file. It checks if the given data id matches with the file. If it does, it writes
    comments on those blocks, else returns errors.
    :param comments: schema for json body
    :return: Entire JSON file after update.
    """
    try:
        with open("data_point.json", 'r+') as f:
            data = json.load(f)
            for id in data:
                if id['data_id'] == comments.data_id:
                    id['comments'].append({
                        "com_id": random.randint(0, 4),
                        "comment": comments.comment,
                        "username": comments.user_name
                    })
                    id['comment_count'] += 1
                    f.seek(0)
                    json.dump(data, f, indent=4)
                    f.truncate()
                    break
            else:
                return INVALID_DATA_ID

        return data

    except Exception as e:
        return UPDATE_FAIL + str(e)
