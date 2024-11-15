pub mod retailer;

use crate::{
    constant::{EP_AUTH, HOST, RETAILER_AUTH},
    model::{Claims, Claimss},
};
use actix_web::{cookie::Cookie, web::Bytes, HttpRequest};
use futures::Stream;
use jsonwebtoken::{decode, encode, errors::Error, DecodingKey, EncodingKey, Header, Validation};
use reqwest::Response;
use std::{fs, pin::Pin};

pub fn create_jwt(id: i32, email: &str, name: &str) -> String {
    let claims = Claims { id, email, name };
    const SECRET: &[u8] = b"my_secret_key";

    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(SECRET),
    )
    .expect("Failed to generate JWT");
    token
}

pub fn decode_jwt(jwt: &str) -> Result<Claimss, Error> {
    const SECRET: &[u8] = b"my_secret_key";
    let decoding_key = DecodingKey::from_secret(SECRET.as_ref());
    let mut validation = Validation::default();
    validation.required_spec_claims.remove("exp");
    validation.validate_exp = false;
    let token_data = decode::<Claimss>(jwt, &decoding_key, &validation)?;
    Ok(token_data.claims)
}

pub fn format_url(path: &str) -> String {
    format!("{}{}", HOST, path)
}

pub fn convert_reqwest_stream(
    response: Response,
) -> Pin<Box<dyn Stream<Item = Result<Bytes, Box<dyn std::error::Error>>>>> {
    // Create an async stream that yields chunks
    let stream = futures::stream::try_unfold(response, |mut response| async move {
        match response.chunk().await {
            Ok(Some(chunk)) => Ok(Some((chunk, response))),
            Ok(None) => Ok(None),
            Err(e) => Err(Box::new(e) as Box<dyn std::error::Error>),
        }
    });
    Box::pin(stream)
}

pub fn get_token_key(p: String) -> String {
    if p == "ep" {
        EP_AUTH.to_owned()
    } else if p == "retailer" {
        RETAILER_AUTH.to_owned()
    } else {
        panic!("can't find token key");
    }
}

pub fn get_second_path_segment(path: &str) -> &str {
    let parts: Vec<&str> = path.split('/').filter(|&s| !s.is_empty()).collect();
    if parts.len() >= 2 {
        parts[1]
    } else {
        panic!("can not find the second path ")
    }
}

pub fn get_id(req: &HttpRequest) -> i32 {
    let token = get_token(req);
    let auth_cookie = token
        .expect("can not find auth token")
        .value()
        .parse::<String>()
        .unwrap();
    let id: i32 = decode_jwt(&auth_cookie).expect("parse token erro").id;
    id
}

pub fn create(directory: &String) {
    if !fs::metadata(directory).is_ok() {
        fs::create_dir(&directory.clone());
        println!("Directory created: {}", directory);
    } else {
        println!("Directory already exists: {}", directory);
    }
}

pub fn get_token(req: &HttpRequest) -> Option<Cookie<'static>> {
    let path = req.path();
    let p = get_second_path_segment(path);
    let token_key = get_token_key(p.to_string());
    let auth_cookie = req.cookie(&token_key);
    auth_cookie
}
