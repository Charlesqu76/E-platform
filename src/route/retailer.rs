use std::collections::HashMap;

use crate::{
    constant::AUTH_,
    model::retailer::{AddProductInfo, ModifyProductInfo, ProductInfo, Purchase, SalesInfo},
    util::{decode_jwt, retailer::categorize_data},
};
use actix_web::{
    get, post,
    web::{self},
    HttpRequest, HttpResponse, Responder,
};
use log::error;
use serde_json::json;
use sqlx::PgPool;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("retailer")
            .service(products)
            .service(add_product)
            .service(modify_product)
            .service(portrait_days_view)
            .service(portrait_days_buy)
            .service(sales_history)
            .service(sales_prediction),
    );
}

#[get("products")]
async fn products(pool: web::Data<PgPool>, req: HttpRequest) -> impl Responder {
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

#[post("product/add")]
async fn add_product(
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

#[post("product/modify")]
async fn modify_product(
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

#[get("portraitDaysView")]
async fn portrait_days_view(pool: web::Data<PgPool>, req: HttpRequest) -> impl Responder {
    let auth_cookie = req
        .cookie(AUTH_)
        .unwrap()
        .value()
        .parse::<String>()
        .unwrap();
    let id: i32 = decode_jwt(&auth_cookie).unwrap().id;

    let results = sqlx::query_as::<_, Purchase>(
        "SELECT v.id AS id, time, v.geo, v.device, c.gender
    FROM view AS v
    INNER JOIN product AS p ON (v.product = p.id)
    INNER JOIN customer AS c ON (v.customer = c.id)
    WHERE retailer = $1 limit 20"
    ,
    )
    .bind(id)
    .fetch_all(pool.get_ref())
    .await;

    match results {
        Ok(results) => {
            println!("{:?}", serde_json::to_string(&results).unwrap());
            let mut time_category: HashMap<String, i32> = HashMap::new();
            for item in results {
                let time = item.time.format("%Y-%m-%d").to_string();
                *time_category.entry(time).or_insert(0) += 1;
            }
            HttpResponse::Ok().json(time_category)
        }
        Err(err) => {
            error!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[get("portraitDaysBuy")]
async fn portrait_days_buy(pool: web::Data<PgPool>, req: HttpRequest) -> impl Responder {
    let auth_cookie = req
        .cookie(AUTH_)
        .unwrap()
        .value()
        .parse::<String>()
        .unwrap();
    let id: i32 = decode_jwt(&auth_cookie).unwrap().id;
    let results = sqlx::query_as::<_, Purchase>(
        "SELECT pur.id AS id, time
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
            let mut time_category: HashMap<String, i32> = HashMap::new();
            for item in results {
                let time = item.time.format("%Y-%m-%d").to_string();
                *time_category.entry(time).or_insert(0) += 1;
            }

            HttpResponse::Ok().json(json!(time_category))
        }
        Err(err) => {
            error!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[get("sales/hostory")]
async fn sales_history(pool: web::Data<PgPool>, req: HttpRequest) -> impl Responder {
    let auth_cookie: String = req
        .cookie(AUTH_)
        .unwrap()
        .value()
        .parse::<String>()
        .unwrap();
    let id = decode_jwt(&auth_cookie).unwrap().id;

    let results = sqlx::query_as::<_, SalesInfo>(
        "SELECT * 
        FROM product AS p
        INNER JOIN purchase AS pur ON (p.id = pur.product)
        WHERE p.retailer = $1",
    )
    .bind(id)
    .fetch_all(pool.get_ref())
    .await;

    match results {
        Ok(results) => {
            let res = categorize_data(&results);
            println!("{:?}", res);
            HttpResponse::Ok().json(json!(res.ok().unwrap()))
        }
        Err(err) => {
            error!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[get("sales/prediction")]
async fn sales_prediction(pool: web::Data<PgPool>, req: HttpRequest) -> impl Responder {
    // let auth_cookie = req
    //     .cookie(AUTH_)
    //     .unwrap()
    //     .value()
    //     .parse::<String>()
    //     .unwrap();
    // let id = decode_jwt(&auth_cookie).unwrap().id;

    let id = 1;

    let results = sqlx::query_as::<_, SalesInfo>(
        "SELECT * 
        FROM product AS p
        INNER JOIN purchase AS pur ON (p.id = pur.product)
        WHERE p.retailer = $1",
    )
    .bind(id)
    .fetch_all(pool.get_ref())
    .await;

    match results {
        Ok(results) => {
            let res = categorize_data(&results);
            println!("{:?}", res);
            HttpResponse::Ok().json(json!(res.ok().unwrap()))
        }
        Err(err) => {
            error!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}
