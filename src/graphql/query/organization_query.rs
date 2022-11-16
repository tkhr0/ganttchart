use async_graphql::Object;

use crate::model::Organization;

#[derive(Default)]
pub struct OrganizationQuery;

#[Object]
impl OrganizationQuery {
    async fn organizations(&self) -> Vec<Organization> {
        vec![
            Organization::new("hog org".to_string()),
            Organization::new("foo org".to_string()),
            Organization::new("bar org".to_string()),
        ]
    }
}
