from pydantic import BaseSettings

# This class is used to validate/setup the environment variables
# It uses the .env file for the actual variable values
# NOTE: will need to hide the .env in prod
class Settings(BaseSettings):
    DATABASE_URL: str
    MONGO_INITDB_DATABASE: str

    JWT_PUBLIC_KEY: str
    JWT_PRIVATE_KEY: str
    REFRESH_TOKEN_EXPIRES_IN: int
    ACCESS_TOKEN_EXPIRES_IN: int
    JWT_ALGORITHM: str

    CLIENT_ORIGIN: str

    class Config:
        env_file = 'api/.env'


settings = Settings()