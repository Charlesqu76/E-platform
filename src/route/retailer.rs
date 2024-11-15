use actix_web::web::{self, scope};

use crate::service::retailer::{
    aisearch, normal,
    portrait::{buy, device, gender, geo, view},
    product::{add_product, modify_product, products},
    sales::sales_history,
};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        scope("retailer")
            .service(normal)
            .service(aisearch)
            .service(
                scope("portrait")
                    .service(buy)
                    .service(view)
                    .service(gender)
                    .service(device)
                    .service(geo),
            )
            .service(
                scope("product")
                    .service(products)
                    .service(add_product)
                    .service(modify_product),
            )
            .service(scope("sales").service(sales_history)),
    );
}
