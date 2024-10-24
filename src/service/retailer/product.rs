use crate::{
    model::retailer::{AddProductInfo, ModifyProductInfo, ProductInfo},
    util::get_id,
};
use actix_web::{
    get, post,
    web::{self},
    HttpRequest, HttpResponse, Responder,
};
use sqlx::PgPool;

#[get("")]
pub async fn products(pool: web::Data<PgPool>, req: HttpRequest) -> impl Responder {
    let id = get_id(req);
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
        Ok(products) => HttpResponse::Ok().json(products),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[post("add")]
pub async fn add_product(
    pool: web::Data<PgPool>,
    req: HttpRequest,
    data: web::Json<AddProductInfo>,
) -> impl Responder {
    let id: i32 = get_id(req);

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
        Ok(_) => HttpResponse::Ok().json({}),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[post("modify")]
pub async fn modify_product(
    pool: web::Data<PgPool>,
    req: HttpRequest,
    data: web::Json<ModifyProductInfo>,
) -> impl Responder {
    let id: i32 = get_id(req);

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
        Ok(_) => HttpResponse::Ok().json({}),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}
