use actix_web::cookie::Cookie;
use actix_web::http::StatusCode;
use actix_web::{
    dev::{Service, ServiceRequest, ServiceResponse},
    Error,
};
use jsonwebtoken::{decode, Validation};
use std::future::{ready, Ready};

// Replace with your actual secret key and algorithm
const SECRET_KEY: &str = "your_secret_key";
const ALGORITHM: &str = "HS256";

// Middleware structure
pub struct AuthMiddleware {
    validation: Validation,
    cookie_name: String,
}

impl AuthMiddleware {
    pub fn new(cookie_name: &str) -> Self {
        AuthMiddleware {
            validation: Validation::new(ALGORITHM)
                .set_secret_key(SECRET_KEY)
                .set_leeway(60) // Optional: Allow a slight time difference
                .set_required_claims(&["sub"]), // Example: Require a subject claim
            cookie_name: cookie_name.to_string(),
        }
    }
}

// Middleware implementation
impl<S, B> Service<ServiceRequest> for AuthMiddleware<S>
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type Future = Pin<Box<dyn Future<Output = Result<Self::Response, Self::Error>>>>;

    forward_ready!(service);

    fn call(&self, req: ServiceRequest) -> Self::Future {
        // Check for the presence of the auth-cookie
        if let Some(cookie) = req.cookie("auth-cookie") {
            // Validate the cookie
            if is_valid_cookie(cookie.value()) {
                // If the cookie is valid, proceed with the request
                let fut = self.service.call(req);
                return Box::pin(async move {
                    let res = fut.await?;
                    Ok(res)
                });
            }
        }

        // If the cookie is missing or invalid, return a 500 error
        Box::pin(async move {
            Ok(req.into_response(HttpResponse::InternalServerError().finish().into_body()))
        })
    }

    fn poll_ready(
        &self,
        ctx: &mut core::task::Context<'_>,
    ) -> std::task::Poll<Result<(), Self::Error>> {
        todo!()
    }
}

// fn poll_ready(
//     &self,
//     ctx: &mut core::task::Context<'_>,
// ) -> std::task::Poll<Result<(), Self::Error>> {
//     todo!()
// }
