import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { resumeService } from "../../../services/resumeService";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

const schema = yup.object().shape({
  title: yup.string().required("Project title is required"),
  description: yup.string().required("Description is required"),
  role: yup.string().required("Role is required"),
  technologies: yup.string().required("Technologies are required"),
  duration: yup.string().required("Duration is required"),
  team_size: yup.number().typeError("Team size must be a number").required("Team size is required"),
  link: yup.string().url("Enter a valid URL").required("Project link is required"),
});

const Projects = ({ data, onStepSubmit, onNext, onPrevious, submitting }) => {
  const [projectsList, setProjectsList] = useState(data.projects || []);
    const [editIndex, setEditIndex] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      role: "",
      technologies: "",
      duration: "",
      team_size: "",
      link: "",
    },
  });

  const onAddItem = async (formData) => {
    if (!formData.title || !formData.description || !formData.role || !formData.technologies || !formData.duration || !formData.team_size || !formData.link) {
        toast.error("All fields are required");
        return;
    }
    if (editIndex === null && projectsList.some(item => item.title === formData.title)) {
        toast.error("Project with this title already exists");
        reset();
      return;
    }
    
    // Assuming resumeService.addProject is defined to handle adding projects
    const response = editIndex !== null
      ? await resumeService.updateProject(projectsList[editIndex].id, formData)
      : await resumeService.addProject(formData);

    if (response.success) {
      toast.success(response.message || (editIndex !== null ? "Project updated successfully" : "Project added successfully"));
      if (editIndex !== null) {
        const updatedProjects = [...projectsList];
        updatedProjects[editIndex] = formData;
        setProjectsList(updatedProjects);
        setEditIndex(null);
      } else {
        setProjectsList((prev) => [...prev, formData]);
      }
      reset();
    } else {
      toast.error(response.message || "Failed to add project");
    }
  };

    const handleEditProject = (index) => {
    const projectToEdit = projectsList[index];
    setValue("title", projectToEdit.title);
    setValue("description", projectToEdit.description);
    setValue("role", projectToEdit.role);
    setValue("technologies", projectToEdit.technologies);
    setValue("duration", projectToEdit.duration);
    setValue("team_size", projectToEdit.team_size);
    setValue("link", projectToEdit.link);
    setEditIndex(index);
  };

  const handleDeleteProject = async (index) => {
    if (index < 0 || index >= projectsList.length) return;
    const projectToDelete = projectsList[index];
    const response = await resumeService.deleteProject(projectToDelete.id);
    if (response.success) {
      setProjectsList((prev) => prev.filter((_, i) => i !== index));
      toast.success("Project deleted successfully");
    } else {
      toast.error(response.message || "Failed to delete project");
    }
  };

  const onSubmitStep = async () => {
    await onStepSubmit("projects", { projects: projectsList });
    onNext();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await resumeService.getProjects();
        setProjectsList(response.data || []);
        data.projects = response.data || [];
      } catch (err) {
        console.error("Failed to fetch projects data", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Projects</h2>

      <form onSubmit={handleSubmit(onAddItem)} className="space-y-4">
        <Textinput
          name="title"
          label="Project Title"
          placeholder="Enter project title"
          register={register}
          error={errors.title}
        />

        <Textarea
          name="description"
          label="Description"
          placeholder="Brief description of the project"
          register={register}
          error={errors.description}
        />

        <Textinput
          name="role"
          label="Role"
          placeholder="Your role in the project"
          register={register}
          error={errors.role}
        />

        <Textinput
          name="technologies"
          label="Technologies"
          placeholder="Technologies used (comma separated)"
          register={register}
          error={errors.technologies}
        />

        <Textinput
          name="duration"
          label="Duration"
          placeholder="Duration (e.g., 6 months)"
          register={register}
          error={errors.duration}
        />

        <Textinput
          name="team_size"
          label="Team Size"
          placeholder="Number of team members"
          register={register}
          error={errors.team_size}
        />

        <Textinput
          name="link"
          label="Project Link"
          placeholder="https://project-link.com"
          register={register}
          error={errors.link}
        />

        <Button type="submit" variant="primary">
            {editIndex !== null ? "Update Project" : "Add Project"}
        </Button>
      </form>

      {projectsList.length > 0 && (
  <div className="mt-6">
    <h6 className="font-medium mb-2">Added Projects</h6>
    <ul className="space-y-3">
      {projectsList.map((item, index) => (
        <li
          key={index}
          className="border rounded-lg p-3 bg-white shadow-sm relative"
        >
          {/* Action buttons */}
          <div className="absolute top-2 right-2 flex space-x-2">
            <Button
              type="button"
              onClick={() => handleEditProject(index)}
              className="p-1 hover:bg-gray-100 rounded-full"
              title="Edit"
            >
              <Icon icon="mdi:pencil" className="text-gray-600 w-5 h-5" />
            </Button>
            <Button
              type="button"
              onClick={() => handleDeleteProject(index)}
              className="p-1 hover:bg-gray-100 rounded-full"
              title="Delete"
            >
              <Icon icon="mdi:delete" className="text-red-500 w-5 h-5" />
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">{item.title}</span>
            {item.date && (
              <span className="text-sm text-gray-500">{item.date}</span>
            )}
          </div>

          {/* Duration */}
          <div className="mt-1 text-sm text-gray-600">
            <strong>Duration:</strong> {item.duration}
          </div>

          {/* Technologies */}
          <div className="mt-1 text-sm text-gray-600">
            <strong>Technologies:</strong> {item.technologies}
          </div>

          {/* Role */}
          <div className="mt-1 text-sm text-gray-600">
            <strong>Role:</strong> {item.role}
          </div>

          {/* Team Size */}
          <div className="mt-1 text-sm text-gray-600">
            <strong>Team Size:</strong> {item.team_size}
          </div>

          {/* Description */}
          <div className="mt-2 text-sm text-gray-700">
            <strong>Description:</strong> {item.description}
          </div>


          {/* Link */}
          {item.link && (
            <div className="mt-2">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm"
              >
                {item.link}
              </a>
            </div>

          )}
        </li>
      ))}
    </ul>
  </div>
)}


      <div className="mt-6 flex justify-between">
        <Button onClick={onPrevious} variant="outline">
          Back
        </Button>
        <Button onClick={onSubmitStep} disabled={submitting}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Projects;
