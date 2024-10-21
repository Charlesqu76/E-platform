use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Serialize, Deserialize, FromRow, Debug)]
pub struct ProductInfo {
    id: i32,
    name: String,
    description: String,
    price: f64,
    quantity: i32,
    ratings: Option<f64>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SSS {
    pub products: Vec<ProductInfo>,
    pub query: Option<String>,
}

#[derive(Serialize, Deserialize, FromRow, Debug)]
pub struct HistoryBuy {
    name: String,
    description: String,
    price: f64,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct QueryDetail {
    pub id: String,
}

#[derive(Serialize, Deserialize, FromRow, Debug)]
pub struct ProductComment {
    customer: i32,
    comment: Option<String>,
    rate: Option<i32>,
    name: String,
}

#[derive(Deserialize, Debug)]
pub struct QueryProducts {
    pub q: Option<String>,
}

#[derive(Serialize, Deserialize, FromRow, Debug)]
pub struct CommitSummary {
    comment: Option<String>,
    rate: Option<i32>,
}
