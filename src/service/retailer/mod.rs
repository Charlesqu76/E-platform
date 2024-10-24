pub mod portrait;
pub mod product;
pub mod sales;

use crate::{
    model::retailer::{AISearch, AIsearchQuery, NormalQuery, NormalSend},
    util::{convert_reqwest_stream, format_url, get_id},
};
use actix_web::{
    get,
    web::{self},
    HttpRequest, HttpResponse, Responder,
};
use reqwest::Client;
use std::sync::Arc;

#[get("normal")]
pub async fn normal(
    client: web::Data<Arc<Client>>,
    query: web::Query<NormalQuery>,
    req: HttpRequest,
) -> impl Responder {
    let id: i32 = get_id(req);

    let q = NormalSend {
        id: id.to_string(),
        question: query.question.clone(),
    };

    let response = client
        .get(format_url("normal"))
        .query(&q)
        .send()
        .await
        .expect("error");

    let stream = convert_reqwest_stream(response);
    HttpResponse::Ok().streaming(stream)
}

#[get("aisearch")]
pub async fn aisearch(
    client: web::Data<Arc<Client>>,
    query: web::Query<AIsearchQuery>,
) -> impl Responder {
    // let id: i32 = get_id(req);
    let q = AIsearchQuery {
        name: query.name.clone(),
    };
    let response = client
        .get(format_url("aisearch"))
        .query(&q)
        .send()
        .await
        .expect("error")
        .json::<AISearch>()
        .await
        .expect("error");

    HttpResponse::Ok().json(response)
}
