use std::default::Default;

use async_graphql::*;

use super::Role;

#[derive(Debug, SimpleObject)]
pub struct Member {
    name: String,
    role: Role,
}

impl Member {
    pub fn new(name: String, role: Role) -> Self {
        Self { name, role }
    }
}

impl Default for Member {
    fn default() -> Self {
        Self::new("Pole".to_string(), Role::default())
    }
}
