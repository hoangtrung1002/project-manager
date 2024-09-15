"use client";
import { useState } from "react";
import Board from "../BoardView";
import ListView from "../ListView";
import ProjectHeader from "../ProjectHeader";
import TableView from "../TableView";
import TimelineView from "../TimelineVIew";
import ModalNewTask from "@/components/ModalNewTask";

interface Props {
  params: { id: string };
}

const Project = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTab] = useState<string>("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState<boolean>(false);

  return (
    <div>
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
      />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <Board id={id} setIsModalTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <ListView id={id} setIsModalTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "TimeLine" && (
        <TimelineView id={id} setIsModalTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && (
        <TableView id={id} setIsModalTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default Project;
