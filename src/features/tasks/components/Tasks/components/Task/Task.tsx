import { memo, useState } from "react";
import type { ChangeEvent } from "react";
import { Handle, Position } from "reactflow";
import { clsx } from "clsx";

import type { Status } from "gql/graphql";

import type { TaskNodeData } from "../../types";
import style from "./Task.module.css";

export const Task = memo(function task({
  data,
}: {
  data: TaskNodeData;
}): JSX.Element {
  const [status, setStatus] = useState<Status[keyof Status]>(data.status);

  const handleChangeStatus = (evt: ChangeEvent<HTMLSelectElement>) => {
    const nextStatus = evt.target.value as Status;
    data.onChagneStatus({
      id: data.id,
      nextStatus,
      prevStatus: status as Status,
    });
    setStatus(nextStatus);
  };

  return (
    <div className={clsx(style["body"])}>
      <Handle type="target" position={Position.Left} />
      <p>{data.name}</p>
      <select value={status.toString()} onChange={handleChangeStatus}>
        {data.statuses.map((status) => {
          return (
            <option key={status} value={status}>
              {status}
            </option>
          );
        })}
      </select>
      <Handle type="source" position={Position.Right} />
    </div>
  );
});
