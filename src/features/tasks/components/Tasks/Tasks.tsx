import { useQuery } from "urql";
import "reactflow/dist/style.css";

import { graphql } from "gql";
import { TaskFlow } from "./components";

const tasksQuery = graphql(`
  query tasks {
    tasks {
      id
      name
      status
      followingIds
    }
  }
`);

const statusQuery = graphql(`
  query statuses {
    statuses
  }
`);

export const Tasks = (): JSX.Element => {
  const [statusesQueryResult] = useQuery({ query: statusQuery });
  const [tasksQueryResult] = useQuery({ query: tasksQuery });

  if (statusesQueryResult.fetching || tasksQueryResult.fetching) {
    return <></>;
  }

  return (
    <TaskFlow
      tasks={tasksQueryResult.data?.tasks ?? []}
      statuses={statusesQueryResult.data?.statuses ?? []}
    />
  );
};
