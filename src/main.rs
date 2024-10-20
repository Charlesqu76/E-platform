use actix_cors::Cors;
use actix_web::{middleware::Logger, web, App, HttpServer};
use dotenv::dotenv;
use env_logger::Env;
use reqwest::Client;
use sqlx::postgres::PgPoolOptions;
use std::{env, sync::Arc};

mod constant;
mod model;
mod mymiddlware;
mod route;
mod util;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init_from_env(Env::default().default_filter_or("info"));

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let client = Arc::new(Client::new());

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Failed to create pool");

    HttpServer::new(move || {
        App::new()
            .wrap(Logger::default())
            .wrap(Cors::permissive())
            .app_data(web::Data::new(pool.clone()))
            .app_data(web::Data::new(client.clone()))
            .service(
                web::scope("/api")
                    .configure(route::retailer::config)
                    .configure(route::user::config)
                    .configure(route::product::config),
            )
    })
    .bind("127.0.0.1:3001")?
    .run()
    .await
}
