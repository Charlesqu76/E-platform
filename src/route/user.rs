use crate::service::user::{get_user_info, login, logout};
use actix_web::web;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(login).service(logout).service(get_user_info);
}
