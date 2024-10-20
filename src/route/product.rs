use std::sync::Arc;

use crate::{
    model::product::{
        CommitSummary, HistoryBuy, ProductComment, ProductInfo, QueryDetail, QueryProducts,
    },
    util::openai::{recommend, summary},
};
use actix_web::{get, post, web, HttpResponse, Responder};
use reqwest::Client;
use sqlx::PgPool;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("ep")
            .service(products)
            .service(detail)
            .service(comments)
            .service(aisummary)
            .service(purchase),
    );
    // .service(edit_category);
}

#[get("products")]
async fn products(
    pool: web::Data<PgPool>,
    client: web::Data<Arc<Client>>,
    query: web::Query<QueryProducts>,
) -> impl Responder {
    println!("asdfasdfasdfdas");
    let results = sqlx::query_as::<_, ProductInfo>(
        "SELECT p.*, CAST(AVG(pur.rate) AS FLOAT) AS ratings
                FROM product AS p
                LEFT OUTER JOIN purchase AS pur ON (p.id = pur.product)
                GROUP BY p.id",
    )
    .fetch_all(pool.get_ref())
    .await;

    let id = 1;

    match results {
        Ok(results) => {
            let user_preference = sqlx::query_as::<_, HistoryBuy>(
                "
                    SELECT product, SUM(product) as sum
                    FROM purchase 
                    WHERE customer = $1
                    GROUP BY product;
                ",
            )
            .bind(id)
            .fetch_all(pool.get_ref())
            .await
            .unwrap();
            let res = recommend(results, client, query.q.clone()).await;
            HttpResponse::Ok().json(res)
        }
        Err(err) => {
            println!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[get("product/detail")]
async fn detail(pool: web::Data<PgPool>, query: web::Query<QueryDetail>) -> impl Responder {
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
        Ok(results) => {
            print!("success: {:?}", results);
            HttpResponse::Ok().json(results)
        }
        Err(err) => {
            println!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[get("product/comments")]
async fn comments(pool: web::Data<PgPool>, query: web::Query<QueryDetail>) -> impl Responder {
    let results = sqlx::query_as::<_, ProductComment>(
        "SELECT *
            FROM purchase
                INNER JOIN customer ON (customer.id = purchase.customer)
            WHERE product = ($1) ",
    )
    .bind(&query.id.parse::<i32>().unwrap())
    .fetch_all(pool.get_ref())
    .await;

    match results {
        Ok(results) => HttpResponse::Ok().json(results),
        Err(err) => {
            println!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[get("product/comments/AIsummary")]
async fn aisummary(
    pool: web::Data<PgPool>,
    client: web::Data<Arc<Client>>,
    query: web::Query<QueryDetail>,
) -> impl Responder {
    let results = sqlx::query_as::<_, CommitSummary>(
        "SELECT *
            FROM purchase
                INNER JOIN customer ON (customer.id = purchase.customer)
            WHERE product = $1",
    )
    .bind(&query.id.parse::<i32>().unwrap())
    .fetch_all(pool.get_ref())
    .await;

    match results {
        Ok(results) => {
            println!("{:?}", results);
            let res = summary(results, client).await;
            HttpResponse::Ok().json(res)
        }
        Err(err) => {
            println!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[post("product/purchase")]
async fn purchase(pool: web::Data<PgPool>, query: web::Query<QueryDetail>) -> impl Responder {
    let results = sqlx::query_as::<_, ProductComment>(
        "SELECT *
            FROM purchase
                INNER JOIN customer ON (customer.id = purchase.customer)
            WHERE product = ($1) ",
    )
    .bind(&query.id)
    .fetch_all(pool.get_ref())
    .await;

    match results {
        Ok(results) => HttpResponse::Ok().json(results),
        Err(err) => {
            println!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}
