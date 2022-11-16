use std::default::Default;

use async_graphql::*;
use chrono::NaiveDate;

use super::Member;
use super::Role;
use super::Status;

#[derive(Debug, SimpleObject)]
pub struct Task {
    name: String,
    begin_date: Option<NaiveDate>,
    end_date: Option<NaiveDate>,
    estimated_hours: u8,
    assignee: Option<Member>,
    assignable_role: Option<Role>,
    status: Status,
}

impl Task {
    pub fn new(
        name: String,
        begin_date: Option<NaiveDate>,
        end_date: Option<NaiveDate>,
        estimated_hours: u8,
        assignee: Option<Member>,
        assignable_role: Option<Role>,
        status: Status,
    ) -> Self {
        Self {
            name,
            begin_date,
            end_date,
            estimated_hours,
            assignee,
            assignable_role,
            status,
        }
    }
}

impl Default for Task {
    fn default() -> Self {
        Self::new(
            "Hoge Role".to_string(),
            Some(NaiveDate::from_ymd_opt(2022, 1, 1).unwrap()),
            Some(NaiveDate::from_ymd_opt(2022, 1, 3).unwrap()),
            0,
            Some(Member::default()),
            Some(Role::default()),
            Status::default(),
        )
    }
}
