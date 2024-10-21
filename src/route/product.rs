use crate::service::product::{aisummary, comments, detail, products, purchase};
use actix_web::web;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("ep")
            .service(products)
            .service(detail)
            .service(comments)
            .service(aisummary)
            .service(purchase),
    );
}
