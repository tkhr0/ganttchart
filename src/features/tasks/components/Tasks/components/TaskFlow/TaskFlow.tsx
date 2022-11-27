import { useEffect, useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "reactflow";
import type { Node } from "reactflow";

import { tasksToFlow } from "../../functions";
import { taskNodeType } from "../Task";
import type {
  Status,
  StatusNode,
  StatusNodeData,
  TaskNodeData,
  TaskQueried,
  HandleChangeStatus,
} from "../../types";

export const TaskFlow = ({
  tasks,
  statuses,
}: {
  tasks: TaskQueried[];
  statuses: Status[];
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
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
