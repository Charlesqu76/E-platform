use std::sync::Arc;

use crate::{
    model::product::{
        ProductComment, ProductInfo, ProductQuery, QueryDetail, QueryProducts, SummaryReturn,
    },
    util::format_url,
};
use actix_web::{get, web, HttpResponse, Responder};
use reqwest::Client;
use sqlx::PgPool;

#[get("products")]
pub async fn products(
    client: web::Data<Arc<Client>>,
    query: web::Query<QueryProducts>,
) -> impl Responder {
    let q = ProductQuery { q: query.q.clone() };

    let res: Vec<ProductInfo> = client
        .get(format_url("recommend"))
        .query(&q)
        .send()
        .await
        .unwrap()
        .json::<Vec<ProductInfo>>()
        .await
        .unwrap();

    HttpResponse::Ok().json(res)
}

#[get("product/detail")]
pub async fn detail(pool: web::Data<PgPool>, query: web::Query<QueryDetail>) -> impl Responder {
    let results = sqlx::query_as::<_, ProductInfo>(
        "SELECT p.*, CAST(AVG(pur.rate) AS FLOAT) AS ratings
                FROM product AS p
                LEFT OUTER JOIN purchase AS pur ON (p.id = pur.product)
                WHERE p.id = $1
                GROUP BY p.id",
    )
    .bind(&query.id.parse::<i32>().unwrap())
    .fetch_one(pool.get_ref())
    .await;

    match results {
        Ok(results) => HttpResponse::Ok().json(results),
        Err(err) => HttpResponse::InternalServerError().finish(),
    }
}

#[get("product/comments")]
pub async fn comments(pool: web::Data<PgPool>, query: web::Query<QueryDetail>) -> impl Responder {
    let results = sqlx::query_as::<_, ProductComment>(
        "   SELECT *
            FROM purchase
            JOIN customer ON (customer.id = purchase.customer)
            WHERE product = $1 AND comment IS NOT NULL",
    )
    .bind(&query.id.parse::<i32>().unwrap())
    .fetch_all(pool.get_ref())
    .await;

    match results {
        Ok(results) => HttpResponse::Ok().json(results),
        Err(err) => HttpResponse::InternalServerError().finish(),
    }
}

#[get("product/comments/summary")]
pub async fn summary(
    client: web::Data<Arc<Client>>,
    query: web::Query<QueryDetail>,
) -> impl Responder {
    let q = QueryDetail {
        id: query.id.clone(),
    };
    let res = client
        .get(format_url("summary"))
        .query(&q)
        .send()
        .await
        .unwrap()
        .json::<SummaryReturn>()
        .await
        .unwrap();

    HttpResponse::Ok().json(res)
}
