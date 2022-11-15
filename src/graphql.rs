use async_graphql::{EmptyMutation, EmptySubscription, Schema};

pub mod query;
pub use query::Query;
pub mod dump;
pub use dump::dump;

pub type AppSchema = Schema<Query, EmptyMutation, EmptySubscription>;
