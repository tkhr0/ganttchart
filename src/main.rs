use actix_web::{guard, web, App, HttpResponse, HttpServer, Result};
use async_graphql::http::GraphiQLSource;

async fn graphiql() -> Result<HttpResponse> {
    Ok(HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(
            GraphiQLSource::build()
                .endpoint("http://localhost:8080")
                .finish(),
        ))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(move || App::new().service(web::resource("/").guard(guard::Get()).to(graphiql)))
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}
