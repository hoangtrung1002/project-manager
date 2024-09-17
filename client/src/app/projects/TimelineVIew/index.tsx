import { useAppSelector } from "@/app/redux";
import { useGetTasksQuery } from "@/state/api";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useMemo, useState } from "react";

type Props = {
  id: string;
  setIsModalTaskOpen: (isOpen: boolean) => void;
};

type TaskTypeItem = "task" | "milestone" | "project";

const TimelineView = ({ id, setIsModalTaskOpen }: Props) => {
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-Us",
  });
  const ganttTasks = useMemo(() => {
    return (
      tasks?.map((task) => ({
        start: new Date(task.startDate as string),
        name: task.title,
        end: new Date(task.dueDate as string),
        id: `Tasks-${task.id}`,
        type: "task" as TaskTypeItem,
        progress: task.points ? (task.points / 10) * 100 : 0,
        isDisabled: false,
      })) || []
    );
  }, [tasks]);

  const handleViewMode = (even: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: even.target.value as ViewMode,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !tasks) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className="px-4 xl:px-6">
      <div className="flew-wrap flex items-center justify-between gap-2 py-5">
        <h1 className="me-2 text-lg font-bold dark:text-white">
          Project Task Timeline
        </h1>
        <div className="relative inline-block w-64">
          <select
            className="focus:shadow-outline block w-full appearance-none rounded-md border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-bg dark:text-white"
            value={displayOptions.viewMode}
            onChange={handleViewMode}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </div>
      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            barBackgroundColor={isDarkMode ? "#101214" : "#AEB8C2"}
            barBackgroundSelectedColor={isDarkMode ? "#000" : "#9BA1A6"}
          />
        </div>
        <div className="px-5 pb-5 pt-1">
          <button
            className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
            onClick={() => setIsModalTaskOpen(true)}
          >
            Add New Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimelineView;
