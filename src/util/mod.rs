mod response;
pub mod retailer;

use chrono::NaiveDateTime;
use jsonwebtoken::{decode, encode, errors::Error, DecodingKey, EncodingKey, Header, Validation};

use crate::model::{Claims, Claimss};

pub fn create_jwt(id: i32, email: &str, name: &str) -> String {
    let claims = Claims { id, email, name };
    // const SECRET: &[u8] = env::var("SECRET").unwrap();
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

pub const HOST: &str = "https://charlescrazy.fun/ai/";

pub fn format_url(path: &str) -> String {
    format!("{}{}", HOST, path)
}
