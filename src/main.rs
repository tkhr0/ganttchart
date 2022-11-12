use actix_files::NamedFile;
use actix_web::{get, App, HttpServer, Responder};

#[get("/")]
async fn root() -> impl Responder {
    NamedFile::open_async("./src/assets/index.html").await
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(root))
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}
