use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Serialize, Deserialize, FromRow, Debug)]
pub struct Purchase {
    pub time: NaiveDateTime,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GetProductData {
    pub id: String,
}

#[derive(Serialize, Deserialize, FromRow, Debug)]
pub struct ProductInfo {
    id: i32,
    name: String,
    description: String,
    price: f64,
    quantity: i32,
    ratings: Option<f64>,
    release_date: NaiveDateTime,
}

#[derive(Serialize, Deserialize, FromRow, Debug)]
pub struct ModifyProductInfo {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub price: f64,
    pub quantity: i32,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct AddProductInfo {
    pub name: String,
    pub description: String,
    pub price: f64,
    pub quantity: i32,
}

#[derive(Serialize, Deserialize, FromRow, Debug)]
pub struct SalesInfo {
    pub id: i32,
    pub name: String,
    pub price: i32,
    pub quantity: i32,
    pub time: NaiveDateTime,
    pub product: i32,
}

#[derive(Debug, Serialize)]
pub struct CategoryItem {
    pub price: f64,
    pub quantity: i32,
}

#[derive(Debug, Serialize, FromRow)]
pub struct Gender {
    gender: i32,
    count: i64,
}

#[derive(Debug, Serialize, FromRow)]
pub struct Device {
    device: String,
    count: i64,
}

#[derive(Debug, Serialize, FromRow)]
pub struct Geo {
    geo: String,
    count: i64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NormalQuery {
    pub question: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NormalSend {
    pub id: String,
    pub question: String,
}

#[derive(Debug, Serialize, Deserialize)]

pub struct AIsearchQuery {
    pub name: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AISearch {
    price: Option<f64>,
    description: String,
    references: Vec<String>,
}
