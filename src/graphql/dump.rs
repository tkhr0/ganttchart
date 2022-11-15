use std::fs::File;
use std::io::{Error, Write};
use std::path::Path;

use async_graphql::{EmptyMutation, EmptySubscription, Schema};

use crate::graphql::Query;

pub fn dump(
    path: &Path,
    schema: &Schema<Query, EmptyMutation, EmptySubscription>,
) -> Result<(), Error> {
    let mut output = File::create(path.join("schema.graphql"))?;
    write!(output, "{}", schema.sdl())?;

    Ok(())
}
