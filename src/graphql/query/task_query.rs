use async_graphql::Object;

use crate::model::Task;

#[derive(Default)]
pub struct TaskQuery;

#[Object]
impl TaskQuery {
    async fn tasks(&self) -> Vec<Task> {
        vec![
            Task::new("hoge".to_string()),
            Task::new("foo".to_string()),
            Task::new("bar".to_string()),
        ]
    }
}
