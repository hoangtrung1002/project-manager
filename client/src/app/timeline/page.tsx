"use client";
import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import { useGetProjectsQuery } from "@/state/api";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useMemo, useState } from "react";

type TaskTypeItem = "task" | "milestone" | "project";

const Timeline = () => {
  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-Us",
  });
  const ganttTasks = useMemo(() => {
    return (
      projects?.map((project) => ({
        start: new Date(project.startDate as string),
        name: project.name,
        end: new Date(project.endDate as string),
        id: `Tasks-${project.id}`,
        type: "project" as TaskTypeItem,
        progress: 50,
        isDisabled: false,
      })) || []
    );
  }, [projects]);

  const handleViewMode = (even: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: even.target.value as ViewMode,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !projects)
    return <div>An error occurred while fetching projects</div>;

  return (
    <div className="max-w-full p-8">
      <header className="mb-4 flex items-center justify-between">
        <Header name="Projects Timeline" />
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
      </header>
      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            projectBackgroundColor={isDarkMode ? "#101214" : "#1F29317"}
            projectProgressColor={isDarkMode ? "#1F29317" : "#AEB8C2"}
            projectProgressSelectedColor={isDarkMode ? "#000" : "#9BA1A6"}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
