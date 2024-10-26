use crate::{
    model::user::{GetUserInfo, LoginInfo, UserInfo},
    util::{create_jwt, get_second_path_segment, get_token_key},
};
use actix_web::{
    cookie::{
        time::{self},
        Cookie,
    },
    get, post, web, HttpRequest, HttpResponse, Responder,
};
use sqlx::PgPool;

#[post("login")]
pub async fn login(
    pool: web::Data<PgPool>,
    login_info: web::Json<LoginInfo>,
    req: HttpRequest,
) -> impl Responder {
    let path = req.path();
    let p = get_second_path_segment(&path);
    let mut table_name = "retailer";
    if p == "ep" {
        table_name = "customer"
    }

    let result = sqlx::query_as::<_, UserInfo>(
        "SELECT * 
        FROM $1 
        WHERE email = $2 AND password = $3",
    )
    .bind(table_name)
    .bind(&login_info.email)
    .bind(&login_info.password)
    .fetch_one(pool.get_ref())
    .await;

    match result {
        Ok(user_info) => {
            let jwt: String = create_jwt(user_info.id, &user_info.email, &user_info.name);
            let token_key = get_token_key(login_info.p.clone());
            let cookie = Cookie::build(token_key, jwt)
                .path("/")
                .max_age(time::Duration::days(1))
                .finish();

            HttpResponse::Ok().cookie(cookie).json(user_info)
        }
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

// #[post("logout")]
// pub async fn logout(req: HttpRequest) -> impl Responder {
//     if let Some(original_cookie) = req.cookie(AUTH_) {
//         let cookie = Cookie::build(AUTH_, "")
//             .path(original_cookie.path().unwrap_or("/"))
//             .domain(original_cookie.domain().unwrap_or(""))
//             .finish();

//         return HttpResponse::Ok().cookie(cookie).body("Cookie deleted");
//     }

//     HttpResponse::Ok().body("Cookie not found")
// }

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
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}
