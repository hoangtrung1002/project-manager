import { formatISO } from "date-fns";
import { useCreateProjectMutation } from "@/state/api";
import { useState } from "react";

const useModalProject = () => {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [projectName, setProjectName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleSubmit = async () => {
    if (!projectName || !startDate || !endDate) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedEndDate = formatISO(new Date(endDate), {
      representation: "complete",
    });

    await createProject({
      name: projectName,
      description: description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
  };

  const isFormValid = () => {
    return projectName && description && startDate && endDate;
  };

  return {
    projectName,
    description,
    startDate,
    endDate,
    setProjectName,
    setDescription,
    setStartDate,
    setEndDate,
    handleSubmit,
    isFormValid,
    isLoading,
  };
};

export default useModalProject;
