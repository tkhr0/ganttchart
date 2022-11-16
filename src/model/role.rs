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
