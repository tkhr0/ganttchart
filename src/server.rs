use std::io;
use std::net::Ipv4Addr;
use std::net::SocketAddr;

use actix_cors::Cors;
use actix_web::dev::Server;
use actix_web::{guard, web, web::Data, App, HttpResponse, HttpServer, Result};
use async_graphql::{http::GraphiQLSource, Schema};
use async_graphql::{EmptyMutation, EmptySubscription};
use async_graphql_actix_web::{GraphQLRequest, GraphQLResponse};

use crate::graphql::{AppSchema, Query};

async fn index(schema: web::Data<AppSchema>, req: GraphQLRequest) -> GraphQLResponse {
    schema.execute(req.into_inner()).await.into()
}

async fn graphiql(endpoint: Data<SocketAddr>) -> Result<HttpResponse> {
    let path = "/graphql";

    let endpoint = if endpoint.get_ref().ip() == Ipv4Addr::new(127, 0, 0, 1) {
        format!("http://localhost:{}{}", endpoint.port(), path)
    } else {
        format!("http://{}{}", endpoint.get_ref(), path)
    };

    Ok(HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(GraphiQLSource::build().endpoint(&endpoint).finish()))
}

pub async fn server(
    schema: Schema<Query, EmptyMutation, EmptySubscription>,
) -> Result<Server, io::Error> {
    let socket_addr = SocketAddr::from(([127, 0, 0, 1], 8080));

    Ok(HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();

        App::new()
            .wrap(cors)
            .app_data(Data::new(schema.clone()))
            .app_data(Data::new(socket_addr))
            .service(web::resource("/graphql").guard(guard::Post()).to(index))
            .service(web::resource("/").guard(guard::Get()).to(graphiql))
    })
    .bind(socket_addr)?
    .run())
}
