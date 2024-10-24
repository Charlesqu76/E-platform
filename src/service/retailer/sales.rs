use crate::{
    constant::AUTH_,
    model::retailer::SalesInfo,
    util::{decode_jwt, retailer::categorize_data},
};
use actix_web::{
    get,
    web::{self},
    HttpRequest, HttpResponse, Responder,
};
use serde_json::json;
use sqlx::PgPool;

#[get("hostory")]
pub async fn sales_history(pool: web::Data<PgPool>, req: HttpRequest) -> impl Responder {
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
            HttpResponse::Ok().json(json!(res.ok().unwrap()))
        }
        Err(err) => HttpResponse::InternalServerError().finish(),
    }
}
