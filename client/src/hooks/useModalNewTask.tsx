import { useCreateTaskMutation } from "@/state/api";
import { Priority, Status } from "@/types";
import { formatISO } from "date-fns";
import { useState } from "react";

const useModalNewTask = (id: string | null) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<Status>(Status.Todo);
  const [priority, setPriority] = useState<Priority>(Priority.Backlog);
  const [tags, setTags] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [authorUserId, setAuthorUserId] = useState<string>("");
  const [assignedUserId, setAssignedUserId] = useState<string>("");
  const [projectId, setProjectId] = useState("");

  const handleSubmit = async () => {
    if (!title || !authorUserId || !(id !== null || projectId)) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedDueDate = formatISO(new Date(dueDate), {
      representation: "complete",
    });

    await createTask({
      title,
      description,
      status,
      priority,
      tags,
      startDate: formattedStartDate,
      dueDate: formattedDueDate,
      authorUserId: parseInt(authorUserId),
      assignedUserId: parseInt(assignedUserId),
      projectId: id !== null ? Number(id) : Number(projectId),
    });
  };

  const isFormValid = () => {
    return title && authorUserId && !(id !== null || projectId);
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    status,
    setStatus,
    priority,
    setPriority,
    tags,
    setTags,
    startDate,
    setStartDate,
    dueDate,
    setDueDate,
    authorUserId,
    setAuthorUserId,
    assignedUserId,
    setAssignedUserId,
    isFormValid,
    handleSubmit,
    isLoading,
    projectId,
    setProjectId,
  };
};

export default useModalNewTask;
