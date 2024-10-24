use crate::{
    model::retailer::{Device, Gender, Geo, Purchase},
    util::{get_id, retailer::categorize_time_data},
};
use actix_web::{
    get,
    web::{self},
    HttpRequest, HttpResponse, Responder,
};
use log::error;
use serde_json::json;
use sqlx::PgPool;

#[get("view")]
pub async fn view(pool: web::Data<PgPool>, req: HttpRequest) -> impl Responder {
    let id: i32 = get_id(req);

    let results = sqlx::query_as::<_, Purchase>(
        "SELECT time
            FROM view AS v
            JOIN product as pur ON (v.product = pur.id )
            WHERE time >= NOW() - INTERVAL '1 year' AND retailer = $1",
    )
    .bind(id)
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
    let id: i32 = get_id(req);

    let results = sqlx::query_as::<_, Purchase>(
        "SELECT time
            FROM purchase AS pur
            INNER JOIN product AS p ON (pur.product = p.id)
            WHERE time >= NOW() - INTERVAL '1 year' AND retailer = $1
    ",
    )
    .bind(id)
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
    let id: i32 = get_id(req);

    let results = sqlx::query_as::<_, Gender>(
        "SELECT gender, COUNT(gender)
            FROM purchase AS pur
            JOIN customer AS c ON (pur.customer = c.id )
            JOIN product AS p ON (pur.product = p.id)
            WHERE p.retailer = $1
            GROUP BY c.gender",
    )
    .bind(id)
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
    let id: i32 = get_id(req);

    let results = sqlx::query_as::<_, Device>(
        "SELECT device, COUNT(device)
            FROM purchase AS pur
            JOIN product AS p ON (pur.product = p.id)
            WHERE p.retailer = $1
            GROUP BY device",
    )
    .bind(id)
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
    let id: i32 = get_id(req);

    let results = sqlx::query_as::<_, Geo>(
        "SELECT geo, COUNT(geo)
        FROM purchase AS pur
        JOIN product AS p ON (pur.product = p.id)
        WHERE p.retailer = $1
        GROUP BY geo",
    )
    .bind(id)
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
