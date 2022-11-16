use async_graphql::*;

use super::Project;

#[derive(Debug, SimpleObject)]
pub struct Organization {
    name: String,
    projects: Vec<Project>,
}

impl Organization {
    pub fn new(name: String) -> Self {
        Self {
            name,
            projects: vec![
                Project::new("hog prj".to_string()),
                Project::new("foo prj".to_string()),
                Project::new("bar prj".to_string()),
            ],
        }
    }
}
