use crate::service::product::{comments, detail, products, summary};
use actix_web::web;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("ep")
            .service(products)
            .service(detail)
            .service(comments)
            .service(summary),
    );
}
