use std::sync::Arc;

use crate::model::product::{
    CommitSummary, HistoryBuy, ProductComment, ProductInfo, QueryDetail, QueryProducts, SSS,
};
use actix_web::{get, post, web, HttpResponse, Responder};
use reqwest::Client;
use sqlx::PgPool;

#[get("products")]
pub async fn products(
    pool: web::Data<PgPool>,
    client: web::Data<Arc<Client>>,
    query: web::Query<QueryProducts>,
) -> impl Responder {
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
            let sss = SSS {
                products: results,
                query: query.q.clone(),
            };

            let res = client
                .post("http://localhost:3000/recommend")
                .json(&sss)
                .send()
                .await
                .unwrap()
                .text()
                .await
                .unwrap();
            println!("{:?}", res);

            let user_preference = sqlx::query_as::<_, HistoryBuy>(
                "
                   (SELECT name, description, price
                    FROM product
                    WHERE product.id in (
                    SELECT p.id FROM
                        purchase AS pur
                        JOIN product AS P ON ( pur.product = P.id )
                    WHERE
                        customer = 1
                    GROUP BY p.id
                    )) UNION (SELECT name, description, price
                    FROM product
                    WHERE product.id in (
                    SELECT p.id FROM
                        view AS v
                        JOIN product AS P ON ( v.product = P.id )
                    WHERE
                        customer = 1
                    GROUP BY p.id
                    ))
                ",
            )
            .bind(id)
            .fetch_all(pool.get_ref())
            .await
            .unwrap();

            HttpResponse::Ok().json({})
        }
        Err(err) => {
            println!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
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
pub async fn comments(pool: web::Data<PgPool>, query: web::Query<QueryDetail>) -> impl Responder {
    let results = sqlx::query_as::<_, ProductComment>(
        "									SELECT *
            FROM purchase
                INNER JOIN customer ON (customer.id = purchase.customer)
            WHERE product = $1 AND comment IS NOT NULL",
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
pub async fn aisummary(
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
            // let res = summary(results, client).await;
            HttpResponse::Ok().json(results)
        }
        Err(err) => {
            println!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[post("product/purchase")]
pub async fn purchase(pool: web::Data<PgPool>, query: web::Query<QueryDetail>) -> impl Responder {
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
