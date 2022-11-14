import { useQuery } from "urql";

import { graphql } from "../../../gql";
import type { Task } from "../../../gql/graphql";

const tasksQuery = graphql(`
  query tasks {
    tasks {
      name
    }
  }
`);

export const Tasks = () => {
  const [{ data, fetching }] = useQuery({ query: tasksQuery });

  if (fetching) {
    return <></>;
  }

  return (
    <div>
      {data?.tasks.map((task: Task, i) => {
        return <p key={i}>{task.name}</p>;
      })}
    </div>
  );
};
