"use client";
import React, { useState } from "react";
import ProjectHeader from "../ProjectHeader";
import Board from "../BoardView";
import ListView from "../ListView";
import TimelineView from "../TimelineVIew";
import TableView from "../TableView";

interface Props {
  params: { id: string };
}

const Project = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTab] = useState<string>("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState<boolean>(false);

  return (
    <div>
      {/* MODAL NEW TASK */}
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
