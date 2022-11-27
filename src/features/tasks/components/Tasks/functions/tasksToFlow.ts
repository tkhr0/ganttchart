import type {
  HandleChangeStatus,
  Status,
  TaskEdge,
  TaskNode,
  TaskQueried,
} from "../types";
import { taskToFlow } from "./";

export const tasksToFlow = ({
  tasks,
  statuses,
  handleChangeStatus,
}: {
  tasks: TaskQueried[];
  statuses: Status[];
  handleChangeStatus: HandleChangeStatus;
}): { nodes: TaskNode[]; edges: TaskEdge[] } => {
  const countPerStatus: { [K in `${Status}`]?: number } = {};

  return tasks.reduce(
    (prev, task) => {
      const { node, edges } = taskToFlow({
        task,
        statuses,
        handleChangeStatus,
      });

      const status = node.data.status as Status;
      const countOfThisStatus = countPerStatus[status] ?? 0;
      node.position.y = countOfThisStatus * 100;
      countPerStatus[status] = countOfThisStatus + 1;

      return {
        nodes: [...prev.nodes, node],
        edges: prev.edges.concat(edges),
      };
    },
    {
      nodes: [] as TaskNode[],
      edges: [] as TaskEdge[],
    }
  );
};
