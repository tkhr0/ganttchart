mod organization_query;
mod status_query;
mod task_query;

use async_graphql::MergedObject;

use organization_query::OrganizationQuery;
use status_query::StatusQuery;
use task_query::TaskQuery;

#[derive(MergedObject, Default)]
pub struct Query(TaskQuery, OrganizationQuery, StatusQuery);
