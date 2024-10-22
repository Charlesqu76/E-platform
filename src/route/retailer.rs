use actix_web::web::{self, scope};

use crate::service::retailer::{
    portrait::{buy, device, gender, generate, geo, view},
    product::{add_product, aisearch, modify_product, products},
    sales::{sales_history, sales_prediction},
};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        scope("retailer")
            .service(
                scope("portrait")
                    .service(buy)
                    .service(view)
                    .service(gender)
                    .service(device)
                    .service(geo)
                    .service(generate),
            )
            .service(
                scope("product")
                    .service(products)
                    .service(add_product)
                    .service(modify_product)
                    .service(aisearch),
            )
            .service(
                scope("sales")
                    .service(sales_history)
                    .service(sales_prediction),
            ),
    );
}
