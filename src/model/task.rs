use std::default::Default;

use async_graphql::*;
use chrono::NaiveDate;

use super::Member;
use super::Role;
use super::Status;

type Id = u64;

#[derive(Debug, SimpleObject)]
pub struct Task {
    id: Id,
    name: String,
    begin_date: Option<NaiveDate>,
    end_date: Option<NaiveDate>,
    estimated_hours: u8,
    assignee: Option<Member>,
    assignable_role: Option<Role>,
    status: Status,
    following_ids: Vec<Id>,
}

impl Task {
    pub fn new(
        id: Id,
        name: String,
        begin_date: Option<NaiveDate>,
        end_date: Option<NaiveDate>,
        estimated_hours: u8,
        assignee: Option<Member>,
        assignable_role: Option<Role>,
        status: Status,
        following_ids: Vec<Id>,
    ) -> Self {
        Self {
            id,
            name,
            begin_date,
            end_date,
            estimated_hours,
            assignee,
            assignable_role,
            status,
            following_ids,
        }
    }
}

impl Default for Task {
    fn default() -> Self {
        Self::new(
            1,
            "Hoge Task".to_string(),
            Some(NaiveDate::from_ymd_opt(2022, 1, 1).unwrap()),
            Some(NaiveDate::from_ymd_opt(2022, 1, 3).unwrap()),
            0,
            Some(Member::default()),
            Some(Role::default()),
            Status::default(),
            vec![],
        )
    }
}
