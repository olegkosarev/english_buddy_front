from pathlib import Path

from fastapi import FastAPI, WebSocket
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi import Request

app = FastAPI()

# app.mount("/static", StaticFiles(directory="static"), name="static")
static_dir = Path(__file__).parent.absolute() / "static"
app.mount(
    "/static",
    StaticFiles(directory=static_dir),
    name="static",
)

templates = Jinja2Templates(directory="templates")


@app.get("/")
async def read_root(request: Request):
    data = {
        "levels": [
            {
                "name": "Beginner",
                "lessons": [
                    "HE IS A STUDENT",
                    "HE IS HAPPY",
                    "HE IS NOT HAPPY",
                    "IS HE HAPPY?",
                    "COLORS AND OBJECTS"
                ]
            },
            {"name": "Intermediate", "lessons": []},
            {"name": "Advanced", "lessons": []}
        ]
    }
    return templates.TemplateResponse("side_bar.html", {"request": request, "data": data})



# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
#     while True:
#         data = await websocket.receive_text()
#         # здесь может быть ваша логика обработки данных (например, сохранение в базу данных)
#         await websocket.send_text(f"Message text was: {data}")
