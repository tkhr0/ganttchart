use async_graphql::*;

use super::Team;

#[derive(Debug, SimpleObject)]
pub struct Project {
    name: String,
    teams: Vec<Team>,
}

impl Project {
    pub fn new(name: String) -> Self {
        Self {
            name,
            teams: vec![
                Team::new("hog team".to_string()),
                Team::new("foo team".to_string()),
                Team::new("bar team".to_string()),
            ],
        }
    }
}
