import type { Node, Edge } from "reactflow";

import type { Status, Task } from "gql/graphql";

export type { Status } from "gql/graphql";
export type StatusNodeData = { status: Status; label: string };
export type StatusNode = Node<StatusNodeData> & { type: "group" };

export type TaskQueried = Pick<Task, "id" | "name" | "followingIds" | "status">;
export type TaskNodeData = TaskQueried & {
  statuses: Status[];
  onChagneStatus: HandleChangeStatus;
} & { label: string };
export type TaskNode = Node & { type: "task" };
export type TaskEdge = Edge<Record<string, unknown>>;

export type HandleChangeStatus = ({
  id,
  nextStatus,
  prevStatus,
}: {
  id: number;
  nextStatus: Status;
  prevStatus: Status;
}) => void;
