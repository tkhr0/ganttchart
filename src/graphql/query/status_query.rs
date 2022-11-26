use async_graphql::Object;

use crate::model::Status;

#[derive(Default)]
pub struct StatusQuery;

#[Object]
impl StatusQuery {
    async fn statuses(&self) -> Vec<Status> {
        vec![Status::None, Status::Todo, Status::Wip, Status::Done]
    }
}
