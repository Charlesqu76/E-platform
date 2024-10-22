use std::sync::Arc;

use crate::{
    constant::AUTH_,
    model::{
        product::QueryDetail,
        retailer::{AISearch, AISearchQuery, AddProductInfo, ModifyProductInfo, ProductInfo},
    },
    util::{decode_jwt, format_url},
};
use actix_web::{
    get, post,
    web::{self},
    HttpRequest, HttpResponse, Responder,
};
use reqwest::Client;
use serde_json::json;
use sqlx::PgPool;

#[get("")]
pub async fn products(pool: web::Data<PgPool>, req: HttpRequest) -> impl Responder {
    let auth_cookie = req
        .cookie(AUTH_)
        .unwrap()
        .value()
        .parse::<String>()
        .unwrap();
    let id = decode_jwt(&auth_cookie).unwrap().id;
    let result: Result<Vec<ProductInfo>, sqlx::Error> = sqlx::query_as::<_, ProductInfo>(
        "SELECT p.*, CAST(AVG(pur.rate) AS FLOAT) AS ratings
                FROM product AS p
                LEFT OUTER JOIN purchase AS pur ON (p.id = pur.product)
                WHERE p.retailer = $1
                GROUP BY p.id
                ORDER BY p.id DESC",
    )
    .bind(id)
    .fetch_all(pool.get_ref())
    .await;

    match result {
        Ok(products) => {
            println!("{:?}", products);
            HttpResponse::Ok().json(products)
        }
        Err(e) => {
            println!("{:?}", e);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[post("add")]
pub async fn add_product(
    pool: web::Data<PgPool>,
    req: HttpRequest,
    data: web::Json<AddProductInfo>,
) -> impl Responder {
    let auth_cookie = req
        .cookie(AUTH_)
        .unwrap()
        .value()
        .parse::<String>()
        .unwrap();
    let id = decode_jwt(&auth_cookie).unwrap().id;
    let result = sqlx::query(
        "INSERT INTO product (name, description, price,  quantity, retailer)
                VALUES ($1, $2, $3, $4, $5)
                 RETURNING *",
    )
    .bind(&data.name)
    .bind(&data.description)
    .bind(&data.price)
    .bind(&data.quantity)
    .bind(id)
    .execute(pool.get_ref())
    .await;

    match result {
        Ok(row) => {
            println!("{:?}", row);
            HttpResponse::Ok().json({})
        }
        Err(e) => {
            println!("{:?}", e);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[post("modify")]
pub async fn modify_product(
    pool: web::Data<PgPool>,
    req: HttpRequest,
    data: web::Json<ModifyProductInfo>,
) -> impl Responder {
    let auth_cookie = req
        .cookie(AUTH_)
        .unwrap()
        .value()
        .parse::<String>()
        .unwrap();
    let id = decode_jwt(&auth_cookie).unwrap().id;
    let result = sqlx::query(
        "UPDATE product
                SET name = $1,
                    description = $2,
                    price = $3,
                    quantity = $4
                WHERE id = $5 AND retailer = $6
                RETURNING *",
    )
    .bind(&data.name)
    .bind(&data.description)
    .bind(&data.price)
    .bind(&data.quantity)
    .bind(&data.id)
    .bind(id)
    .execute(pool.get_ref())
    .await;

    match result {
        Ok(row) => {
            println!("{:?}", row);
            HttpResponse::Ok().json({})
        }
        Err(e) => {
            println!("{:?}", e);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[get("aisearch")]
pub async fn aisearch(
    client: web::Data<Arc<Client>>,
    query: web::Query<AISearchQuery>,
) -> impl Responder {
    let q = AISearchQuery {
        name: query.name.clone(),
    };
    let res = client
        .get(format_url("aisearch"))
        .query(&q)
        .send()
        .await
        .unwrap();

    let a = &res.json::<AISearch>().await;
    match a {
        Ok(r) => HttpResponse::Ok().json(r),
        Err(_) => HttpResponse::Ok().json(json!({"content":1 })),
    }
}
