"use client";
import React, { useState } from "react";
import ProjectHeader from "../ProjectHeader";
import Board from "../BoardView";

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
    </div>
  );
};

export default Project;
