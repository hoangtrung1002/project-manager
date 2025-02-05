import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import { useGetTasksQuery } from "@/state/api";
import { Task } from "@/types";
import React from "react";

type Props = {
  id: string;
  setIsModalTaskOpen: (isOpen: boolean) => void;
};

const ListView = ({ id, setIsModalTaskOpen }: Props) => {
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="List"
          buttonComponent={
            <div className="btn-modal" onClick={() => setIsModalTaskOpen(true)}>
              Add Task
            </div>
          }
          isSmallText
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default ListView;
