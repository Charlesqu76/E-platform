use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Serialize, Deserialize, FromRow, Debug)]
pub struct Category {
    pub id: i32,
    pub time: NaiveDateTime,
}

#[derive(Serialize, Deserialize, FromRow, Debug)]
pub struct UserInfo {
    pub id: i32,
    pub email: String,
    pub name: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct LoginInfo {
    pub email: String,
    pub password: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GetUserInfo {
    pub id: String,
}
