import { useEffect, useMemo } from "react";
import { useQuery } from "urql";
import { Position } from "reactflow";
import type { Node, Edge } from "reactflow";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

import { graphql } from "gql";
import type { Status } from "gql/graphql";
import type { Task as FullTask } from "gql/graphql";
import { taskNodeType } from "./Task";

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

type StatusNodeData = { status: Status; label: string };
type StatusNode = Node<StatusNodeData> & { type: "group" };
type Task = Pick<FullTask, "id" | "name" | "followingIds" | "status">;
export type TaskNodeData = Task & {
  statuses: Status[];
  onChagneStatus: HandleChangeStatus;
} & { label: string };
type TaskNode = Node<TaskNodeData> & { type: "task" };
type TaskEdge = Edge<Record<string, unknown>>;
type Flow = {
  node: TaskNode;
  edges: TaskEdge[];
};
export type HandleChangeStatus = ({
  id,
  nextStatus,
  prevStatus,
}: {
  id: number;
  nextStatus: Status;
  prevStatus: Status;
}) => void;

const tasksToFlow = ({
  tasks,
  statuses,
  handleChangeStatus,
}: {
  tasks: Task[];
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

      const countOfThisStatus = countPerStatus[node.data.status] ?? 0;
      node.position.y = countOfThisStatus * 100;
      countPerStatus[node.data.status] = countOfThisStatus + 1;

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

const taskToFlow = ({
  task,
  statuses,
  handleChangeStatus,
}: {
  task: Task;
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

const TaskFlow = ({
  tasks,
  statuses,
}: {
  tasks: Task[];
  statuses: Status[];
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<
    StatusNodeData | TaskNodeData
  >([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const nodeTypes = useMemo(() => ({ ...taskNodeType }), []);

  const statusNodes: StatusNode[] = statuses.map((status, i) => {
    return {
      id: status,
      position: { x: i * 400, y: 200 },
      data: { status, label: status },
      type: "group",
      style: {
        width: 300,
        height: 300,
      },
    };
  });

  const handleChangeStatus: HandleChangeStatus = ({ id, nextStatus }) => {
    setNodes((nodes) => {
      const countPerStatus: { [K in `${Status}`]?: number } = {};
      const updatePosition = (node: Node<StatusNodeData | TaskNodeData>) => {
        if (node.type === "group") {
          return;
        }

        const countOfThisStatus = countPerStatus[node.data.status] ?? 0;
        node.position.y = countOfThisStatus * 100;
        countPerStatus[node.data.status] = countOfThisStatus + 1;
      };

      return nodes.map((node) => {
        if (node.id === id.toString()) {
          node.data.status = nextStatus;
          node.parentNode = nextStatus;
        }

        updatePosition(node);

        return node;
      });
    });
  };

  const flow = tasksToFlow({ tasks, statuses, handleChangeStatus });

  useEffect(() => {
    setNodes([...statusNodes, ...flow.nodes]);
    setEdges(flow.edges);
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
};
