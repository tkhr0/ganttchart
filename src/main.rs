use async_graphql::{EmptyMutation, EmptySubscription, Schema};
use clap::{Parser, Subcommand};

use ganttchart::graphql::Query;
use ganttchart::server;

#[derive(Parser)]
struct Cli {
    #[command(subcommand)]
    command: Command,
}

#[derive(Subcommand)]
enum Command {
    Server,
    Dump,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let cli = Cli::parse();

    let schema = || Schema::build(Query::default(), EmptyMutation, EmptySubscription).finish();

    match cli.command {
        Command::Server => server::server(schema().clone()).await?.await,
        Command::Dump => {
            println!("{}", &schema().sdl());
            Ok(())
        }
    }
}
