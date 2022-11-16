mod organization_query;
mod task_query;

use async_graphql::MergedObject;

use organization_query::OrganizationQuery;
use task_query::TaskQuery;

#[derive(MergedObject, Default)]
pub struct Query(TaskQuery, OrganizationQuery);
