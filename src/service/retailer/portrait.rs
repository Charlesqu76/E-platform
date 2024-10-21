use std::sync::Arc;

use crate::{
    model::retailer::{Device, Gender, Geo, Purchase},
    util::retailer::categorize_time_data,
};
use actix_web::{
    get,
    web::{self},
    HttpRequest, HttpResponse, Responder,
};
use log::error;
use reqwest::Client;
use serde::Serialize;
use serde_json::json;
use sqlx::PgPool;

#[get("view")]
pub async fn view(pool: web::Data<PgPool>, req: HttpRequest) -> impl Responder {
    // let auth_cookie = req
    //     .cookie(AUTH_)
    //     .unwrap()
    //     .value()
    //     .parse::<String>()
    //     .unwrap();
    // let id: i32 = decode_jwt(&auth_cookie).unwrap().id;

    let results = sqlx::query_as::<_, Purchase>(
        "SELECT time
            FROM view AS v
            JOIN product as pur ON (v.product = pur.id )
            WHERE time >= NOW() - INTERVAL '1 year' AND retailer = 1",
    )
    // .bind(id)
    .fetch_all(pool.get_ref())
    .await;

    match results {
        Ok(results) => {
            let res = categorize_time_data(results);
            HttpResponse::Ok().json(json!(res))
        }
        Err(err) => {
            error!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[get("buy")]
pub async fn buy(pool: web::Data<PgPool>, req: HttpRequest) -> impl Responder {
    // let auth_cookie = req
    //     .cookie(AUTH_)
    //     .unwrap()
    //     .value()
    //     .parse::<String>()
    //     .unwrap();
    // let id: i32 = decode_jwt(&auth_cookie).unwrap().id;
    let results = sqlx::query_as::<_, Purchase>(
        "SELECT time
            FROM purchase AS pur
            INNER JOIN product AS p ON (pur.product = p.id)
            WHERE time >= NOW() - INTERVAL '1 year' AND retailer = 1
    ",
    )
    // .bind(id)
    .fetch_all(pool.get_ref())
    .await;

    match results {
        Ok(results) => {
            let res = categorize_time_data(results);
            HttpResponse::Ok().json(json!(res))
        }
        Err(err) => {
            error!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[get("gender")]
pub async fn gender(pool: web::Data<PgPool>, req: HttpRequest) -> impl Responder {
    // let auth_cookie = req
    //     .cookie(AUTH_)
    //     .unwrap()
    //     .value()
    //     .parse::<String>()
    //     .unwrap();
    // let id: i32 = decode_jwt(&auth_cookie).unwrap().id;

    let results = sqlx::query_as::<_, Gender>(
        "SELECT gender, COUNT(gender)
            FROM purchase AS pur
            JOIN customer AS c ON (pur.customer = c.id )
            JOIN product AS p ON (pur.product = p.id)
            WHERE p.retailer = 1
            GROUP BY c.gender",
    )
    .fetch_all(pool.get_ref())
    .await;

    match results {
        Ok(results) => HttpResponse::Ok().json(results),
        Err(err) => {
            error!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[get("device")]
pub async fn device(pool: web::Data<PgPool>, req: HttpRequest) -> impl Responder {
    // let auth_cookie = req
    //     .cookie(AUTH_)
    //     .unwrap()
    //     .value()
    //     .parse::<String>()
    //     .unwrap();
    // let id: i32 = decode_jwt(&auth_cookie).unwrap().id;

    let results = sqlx::query_as::<_, Device>(
        "SELECT device, COUNT(device)
            FROM purchase AS pur
            JOIN product AS p ON (pur.product = p.id)
            WHERE p.retailer = 1
            GROUP BY device",
    )
    .fetch_all(pool.get_ref())
    .await;

    match results {
        Ok(results) => HttpResponse::Ok().json(results),
        Err(err) => {
            error!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[get("geo")]
pub async fn geo(pool: web::Data<PgPool>, req: HttpRequest) -> impl Responder {
    // let auth_cookie = req
    //     .cookie(AUTH_)
    //     .unwrap()
    //     .value()
    //     .parse::<String>()
    //     .unwrap();
    // let id: i32 = decode_jwt(&auth_cookie).unwrap().id;

    let results = sqlx::query_as::<_, Geo>(
        "SELECT geo, COUNT(geo)
        FROM purchase AS pur
        JOIN product AS p ON (pur.product = p.id)
        WHERE p.retailer = 1
        GROUP BY geo",
    )
    .fetch_all(pool.get_ref())
    .await;

    match results {
        Ok(results) => HttpResponse::Ok().json(results),
        Err(err) => {
            error!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[derive(Serialize)]
struct MyData {
    name: String,
    age: u32,
}

#[get("generate")]
pub async fn generate(
    pool: web::Data<PgPool>,
    clint: web::Data<Arc<Client>>,
    req: HttpRequest,
) -> impl Responder {
    // let auth_cookie = req
    //     .cookie(AUTH_)
    //     .unwrap()
    //     .value()
    //     .parse::<String>()
    //     .unwrap();
    // let id: i32 = decode_jwt(&auth_cookie).unwrap().id;

    let my_data = MyData {
        name: "Alice".to_string(),
        age: 30,
    };

    clint
        .post("http://localhost:3000/generate")
        .json(&my_data)
        .send()
        .await;

    // let results = sqlx::query_as::<_, Geo>(
    //     "SELECT geo, COUNT(geo)
    //     FROM purchase AS pur
    //     JOIN product AS p ON (pur.product = p.id)
    //     WHERE p.retailer = 1
    //     GROUP BY geo",
    // )
    // .fetch_all(pool.get_ref())
    // .await;

    HttpResponse::Ok().json({})

    // match results {
    //     Ok(results) => HttpResponse::Ok().json(results),
    //     Err(err) => {
    //         error!("{}", err);
    //         HttpResponse::InternalServerError().finish()
    //     }
    // }
}
