use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

pub mod product;
pub mod retailer;
pub mod user;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims<'a> {
    pub id: i32,
    pub email: &'a str,
    pub name: &'a str,
    // pub exp: NaiveDateTime,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Claimss {
    pub id: i32,
    pub email: String,
    pub name: String,
}
