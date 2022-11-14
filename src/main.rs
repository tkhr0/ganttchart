use async_graphql::{EmptyMutation, EmptySubscription, Schema};

use ganttchart::graphql::Query;
use ganttchart::server;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let schema = Schema::build(Query::default(), EmptyMutation, EmptySubscription).finish();

    println!("{}", &schema.sdl());

    server::server(schema.clone()).await?.await
}
