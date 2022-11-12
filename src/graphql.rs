use async_graphql::{EmptyMutation, EmptySubscription, Schema};

pub mod query;
pub use query::Query;

pub type AppSchema = Schema<Query, EmptyMutation, EmptySubscription>;
