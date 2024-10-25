use std::sync::Arc;

use crate::{
    model::product::{
        BuyQuery, ProductComment, ProductInfo, ProductQuery, QueryDetail, QueryProducts,
        SummaryReturn, ViewQuery,
    },
    util::{decode_jwt, format_url, get_id, get_second_path_segment, get_token_key},
};
use actix_web::{get, post, web, HttpRequest, HttpResponse, Responder};
use reqwest::Client;
use sqlx::PgPool;

#[get("products")]
pub async fn products(
    client: web::Data<Arc<Client>>,
    query: web::Query<QueryProducts>,
    req: HttpRequest,
) -> impl Responder {
    let path = req.path();
    let p = get_second_path_segment(path);
    let token_key = get_token_key(p.to_string());
    let auth_cookie = req.cookie(&token_key);
    let mut id = None;
    match auth_cookie {
        Some(cookie) => {
            let c = cookie.value().parse::<String>().unwrap();
            id = Some(decode_jwt(&c).expect("parse token erro").id.to_string());
        }
        None => {}
    }

    let q = ProductQuery {
        q: query.q.clone(),
        file: query.file.clone(),
        id,
    };

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
        Err(_) => HttpResponse::InternalServerError().finish(),
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
        Err(_) => HttpResponse::InternalServerError().finish(),
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

#[post("view")]
pub async fn view(
    pool: web::Data<PgPool>,
    query: web::Json<ViewQuery>,
    req: HttpRequest,
) -> impl Responder {
    let id: i32 = get_id(req);
    let results = sqlx::query_as::<_, ProductComment>(
        " INSERT INTO view (customer, product, geo, device) 
        VALUES ($1, $2, $3, $4)",
    )
    .bind(id)
    .bind(query.product_id)
    .bind(query.geo.clone())
    .bind(query.device.clone())
    .fetch_all(pool.get_ref())
    .await;

    match results {
        Ok(results) => HttpResponse::Ok().json({}),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[post("buy")]
pub async fn buy(
    pool: web::Data<PgPool>,
    query: web::Json<BuyQuery>,
    req: HttpRequest,
) -> impl Responder {
    let id: i32 = get_id(req);
    let results = sqlx::query_as::<_, ProductComment>(
        " INSERT INTO purchase (customer, product, price ,geo, device) 
        VALUES ($1, $2, $3, $4)",
    )
    .bind(id)
    .bind(query.product_id)
    .bind(query.price)
    .bind(query.geo.clone())
    .bind(query.device.clone())
    .fetch_all(pool.get_ref())
    .await;

    match results {
        Ok(results) => HttpResponse::Ok().json({}),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}
