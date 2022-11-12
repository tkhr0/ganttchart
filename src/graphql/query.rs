mod task_query;

use async_graphql::MergedObject;

use task_query::TaskQuery;

#[derive(MergedObject, Default)]
pub struct Query(TaskQuery);
