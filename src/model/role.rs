use std::default::Default;

use async_graphql::*;

#[derive(Debug, SimpleObject)]
pub struct Role {
    name: String,
}

impl Role {
    pub fn new(name: String) -> Self {
        Self { name }
    }
}

impl Default for Role {
    fn default() -> Self {
        Self::new("Hoge Role".to_string())
    }
}
