use async_graphql::*;

#[derive(Debug, SimpleObject)]
pub struct Task {
    name: String,
}

impl Task {
    pub fn new(name: String) -> Self {
        Self { name }
    }
}
