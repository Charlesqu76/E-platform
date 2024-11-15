use crate::service::product::{buy, comments, detail, products, summary, view};
use actix_web::web;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("ep")
            .service(products)
            .service(detail)
            .service(comments)
            .service(summary)
            .service(view)
            .service(buy),
    );
}
