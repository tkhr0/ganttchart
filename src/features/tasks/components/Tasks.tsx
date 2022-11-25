import { useQuery } from "urql";
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
    }
  }
`);

type Task = Pick<FullTask, "id" | "name">;
type TaskNode = Node<Task & { label: string }>;
type TaskEdge = Edge<Record<string, unknown>>;

const taskToNode = (task: Task, index: number): TaskNode => {
  return {
    id: task.id.toString(),
    position: { x: 0, y: index * 100 },
    data: { ...task, label: task.name },
  };
};

export const Tasks = () => {
  const [{ data, fetching }] = useQuery({ query: tasksQuery });

  if (fetching) {
    return <></>;
  }

  return <TaskFlow tasks={data?.tasks ?? []} />;
};

const TaskFlow = ({ tasks }: { tasks: Task[] }) => {
  const initialEdges: TaskEdge[] = [
    // { id: "e1-2", source: "1", target: "2" }
  ];

  const [nodes, _setNodes, onNodesChange] = useNodesState(
    tasks.map((task, i) => taskToNode(task, i))
  );
  const [edges, _setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
