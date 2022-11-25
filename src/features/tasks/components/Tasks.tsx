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

import { graphql } from "../../../gql";
import type { Task as FullTask } from "../../../gql/graphql";

const tasksQuery = graphql(`
  query tasks {
    tasks {
      id
      name
      followingIds
    }
  }
`);

type Task = Pick<FullTask, "id" | "name" | "followingIds">;
type TaskNode = Node<Task & { label: string }>;
type TaskEdge = Edge<Record<string, unknown>>;
type Flow = {
  node: TaskNode;
  edges: TaskEdge[];
};

const taskToFlow = (task: Task, index: number): Flow => {
  const node: TaskNode = {
    id: task.id.toString(),
    position: { x: index * 300, y: 100 },
    data: { ...task, label: task.name },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  };

  const edges: TaskEdge[] = task.followingIds.map((followingId: number) => ({
    id: `${task.id}-${followingId}`,
    source: `${task.id}`,
    target: `${followingId}`,
  }));

  return { node, edges };
};

export const Tasks = () => {
  const [{ data, fetching }] = useQuery({ query: tasksQuery });

  if (fetching) {
    return <></>;
  }

  return <TaskFlow tasks={data?.tasks ?? []} />;
};

const TaskFlow = ({ tasks }: { tasks: Task[] }) => {
  const flow = tasks.reduce(
    (prev, task, i) => {
      const { node, edges } = taskToFlow(task, i);

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

  const [nodes, _setNodes, onNodesChange] = useNodesState(flow.nodes);
  const [edges, _setEdges, onEdgesChange] = useEdgesState(flow.edges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
};
