use std::default::Default;

use async_graphql::*;

#[derive(Enum, Copy, Clone, Debug, Eq, PartialEq)]
pub enum Status {
    None,
    Todo,
    Wip,
    Done,
}

impl Default for Status {
    fn default() -> Self {
        Self::None
    }
}
