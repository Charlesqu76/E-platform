use crate::service::user::{ep_login, get_user_info, retailer_login};
use actix_web::web;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(ep_login)
        .service(retailer_login)
        .service(get_user_info);
}
