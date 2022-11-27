import { Position } from "reactflow";

import type {
  HandleChangeStatus,
  Status,
  TaskEdge,
  TaskNode,
  TaskQueried,
} from "../types";

type Flow = {
  node: TaskNode;
  edges: TaskEdge[];
};

export const taskToFlow = ({
  task,
  statuses,
  handleChangeStatus,
}: {
  task: TaskQueried;
  statuses: Status[];
  handleChangeStatus: HandleChangeStatus;
}): Flow => {
  const node: TaskNode = {
    id: task.id.toString(),
    position: { x: 0, y: 0 },
    data: {
      ...task,
      statuses,
      onChagneStatus: handleChangeStatus,
      label: task.name,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    parentNode: task.status,
    extent: "parent",
    type: "task",
  };

  const edges: TaskEdge[] = task.followingIds.map((followingId: number) => ({
    id: `${task.id}-${followingId}`,
    source: `${task.id}`,
    target: `${followingId}`,
  }));

  return { node, edges };
};
