import { useQuery } from "urql";
import { clsx } from "clsx";

import { graphql } from "../../../gql";
import type { Task } from "../../../gql/graphql";
import style from "./tasks.module.css";

const tasksQuery = graphql(`
  query tasks {
    tasks {
      name
      beginDate
      endDate
      estimatedHours
      assignee {
        name
        role {
          name
        }
      }
      assignableRole {
        name
      }
      status
    }
  }
`);

export const Tasks = () => {
  const [{ data, fetching }] = useQuery({ query: tasksQuery });

  if (fetching) {
    return <></>;
  }

  return (
    <div className={clsx(style.center)}>
      {data?.tasks.map((task: Task, i) => {
        return (
          <div key={i}>
            <p>{task.name}</p>
            <p>{task.beginDate}</p>
            <p>{task.endDate}</p>
            <p>{task.estimatedHours}</p>
            <p>{task.assignee.name}</p>
            <p>{task.assignee.role.name}</p>
            <p>{task.assignableRole.name}</p>
            <p>{task.status}</p>
          </div>
        );
      })}
    </div>
  );
};
