use async_graphql::Object;

use chrono::NaiveDate;

use crate::model::{Member, Role, Status, Task};

#[derive(Default)]
pub struct TaskQuery;

#[Object]
impl TaskQuery {
    async fn tasks(&self) -> Vec<Task> {
        vec![
            Task::new(
                1,
                "Hoge Task".to_string(),
                Some(NaiveDate::from_ymd_opt(2022, 1, 1).unwrap()),
                Some(NaiveDate::from_ymd_opt(2022, 1, 3).unwrap()),
                0,
                Some(Member::default()),
                Some(Role::default()),
                Status::default(),
                vec![],
            ),
            Task::new(
                2,
                "Foo Task".to_string(),
                Some(NaiveDate::from_ymd_opt(2022, 1, 1).unwrap()),
                Some(NaiveDate::from_ymd_opt(2022, 1, 3).unwrap()),
                0,
                Some(Member::default()),
                Some(Role::default()),
                Status::default(),
                vec![],
            ),
            Task::new(
                3,
                "Bar Task".to_string(),
                Some(NaiveDate::from_ymd_opt(2022, 1, 1).unwrap()),
                Some(NaiveDate::from_ymd_opt(2022, 1, 3).unwrap()),
                0,
                Some(Member::default()),
                Some(Role::default()),
                Status::default(),
                vec![],
            ),
        ]
    }
}
