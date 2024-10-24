use crate::service::user::{get_user_info, login};
use actix_web::web;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(login).service(get_user_info);
}
