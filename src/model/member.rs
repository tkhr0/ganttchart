use async_graphql::*;

#[derive(Debug, SimpleObject)]
pub struct Member {
    name: String,
}

impl Member {
    pub fn new(name: String) -> Self {
        Self { name }
    }
}
