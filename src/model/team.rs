use async_graphql::*;

#[derive(Debug, SimpleObject)]
pub struct Team {
    name: String,
}

impl Team {
    pub fn new(name: String) -> Self {
        Self { name }
    }
}
