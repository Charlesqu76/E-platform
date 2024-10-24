use crate::{
    constant::AUTH_,
    model::user::{GetUserInfo, LoginInfo, UserInfo},
    util::create_jwt,
};
use actix_web::{cookie::Cookie, get, post, web, HttpRequest, HttpResponse, Responder};
use sqlx::PgPool;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(login).service(get_user_info).service(logout);
}

#[post("login")]
async fn login(pool: web::Data<PgPool>, login_info: web::Json<LoginInfo>) -> impl Responder {
    let result = sqlx::query_as::<_, UserInfo>(
        "SELECT * 
        FROM retailer 
        WHERE email = ($1) AND password = ($2)",
    )
    .bind(&login_info.email)
    .bind(&login_info.password)
    .fetch_one(pool.get_ref())
    .await;

    match result {
        Ok(user_info) => {
            let jwt: String = create_jwt(user_info.id, &user_info.email, &user_info.name);
            let cookie = Cookie::build(AUTH_, jwt).http_only(true).path("/").finish();
            HttpResponse::Ok().cookie(cookie).json(user_info)
        }
        Err(e) => HttpResponse::InternalServerError().finish(),
    }
}

#[post("logout")]
async fn logout(req: HttpRequest) -> impl Responder {
    if let Some(original_cookie) = req.cookie(AUTH_) {
        let cookie = Cookie::build(AUTH_, "")
            .path(original_cookie.path().unwrap_or("/")) // Make sure to match the path
            .domain(original_cookie.domain().unwrap_or("")) // Match the domain if used
            .finish();

        return HttpResponse::Ok().cookie(cookie).body("Cookie deleted");
    }

    HttpResponse::Ok().body("Cookie not found")
}

#[get("userinfo")]
async fn get_user_info(pool: web::Data<PgPool>, params: web::Json<GetUserInfo>) -> impl Responder {
    let result = sqlx::query_as::<_, UserInfo>(
        "SELECT * 
        FROM retailer 
        WHERE id = ($1)",
    )
    .bind(params.id.clone())
    .fetch_one(pool.get_ref())
    .await;

    match result {
        Ok(user_info) => HttpResponse::Ok().json(user_info),
        Err(e) => HttpResponse::InternalServerError().finish(),
    }
}
