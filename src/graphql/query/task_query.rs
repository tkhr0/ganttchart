use async_graphql::Object;

use crate::model::Task;

#[derive(Default)]
pub struct TaskQuery;

#[Object]
impl TaskQuery {
    async fn tasks(&self) -> Vec<Task> {
        vec![Task::default(), Task::default(), Task::default()]
    }
}
