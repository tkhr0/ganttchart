use std::default::Default;

use async_graphql::*;

#[derive(Enum, Copy, Clone, Debug, Eq, PartialEq)]
pub enum Status {
    NONE,
    TODO,
    WIP,
    DONE,
}

impl Default for Status {
    fn default() -> Self {
        Self::NONE
    }
}
