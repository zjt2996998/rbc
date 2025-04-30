from pydantic import BaseModel, Field

class MessageCreate(BaseModel):
    user_id: str = Field(..., pattern=r"^[_a-z][a-z0-9_]*$", max_length=50)
    message: str = Field(..., min_length=1, max_length=500)

class MessageOut(BaseModel):
    userID: str
    message: str
