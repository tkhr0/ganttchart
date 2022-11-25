use std::default::Default;

use async_graphql::*;
use chrono::NaiveDate;

use super::Member;
use super::Role;
use super::Status;

#[derive(Debug, SimpleObject)]
pub struct Task {
    id: u64,
    name: String,
    begin_date: Option<NaiveDate>,
    end_date: Option<NaiveDate>,
    estimated_hours: u8,
    assignee: Option<Member>,
    assignable_role: Option<Role>,
    status: Status,
    followings: Vec<Task>,
}

impl Task {
    pub fn new(
        id: u64,
        name: String,
        begin_date: Option<NaiveDate>,
        end_date: Option<NaiveDate>,
        estimated_hours: u8,
        assignee: Option<Member>,
        assignable_role: Option<Role>,
        status: Status,
        followings: Vec<Self>,
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
            followings,
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
            vec![Self::new(
                2,
                "Dependent Task".to_string(),
                None,
                None,
                0,
                None,
                None,
                Status::default(),
                vec![],
            )],
        )
    }
}
