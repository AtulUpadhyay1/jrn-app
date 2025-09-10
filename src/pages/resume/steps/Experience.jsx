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
  job_title: yup.string().required("Job title is required"),
  company: yup.string().required("Company name is required"),
  employment_type: yup.string().required("Employment type is required"),
  start_date: yup.string().required("Start date is required"),
  end_date: yup.string().required("End date is required"),
  responsibilities: yup.string().required("Responsibilities are required"),
  technologies: yup.string().required("Technologies are required"),
  location: yup.string().required("Location is required"),
});

const Experience = ({ data, onStepSubmit, onNext, onPrevious, submitting }) => {
  const [experienceList, setExperienceList] = useState(data.experience || []);
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
      job_title: "",
      company: "",
      employment_type: "",
      start_date: "",
      end_date: "",
      responsibilities: "",
      technologies: "",
      location: "",
    },
  });

  const onAddItem = async (formData) => {
    if (!formData.job_title || !formData.company || !formData.employment_type || !formData.start_date || !formData.end_date || !formData.responsibilities || !formData.technologies || !formData.location) {
      toast.error("All fields are required");
      return;
    }
    if (editIndex === null && experienceList.some(item => item.job_title === formData.job_title && item.company === formData.company)) {
      toast.error("Experience with this job title and company already exists");
      reset();
      return;
    }

    // Assuming resumeService.addExperience is defined to handle adding experience
    const response = editIndex !== null
      ? await resumeService.updateExperience(experienceList[editIndex].id, formData)
      : await resumeService.addExperience(formData);

    if (response.success) {
      toast.success(response.message || (editIndex !== null ? "Experience updated successfully" : "Experience added successfully"));
      if (editIndex !== null) {
        const updatedExperience = [...experienceList];
        updatedExperience[editIndex] = formData;
        setExperienceList(updatedExperience);
        setEditIndex(null);
      } else {
        setExperienceList((prev) => [...prev, formData]);
      }
      reset();
    } else {
      toast.error(response.message || "Failed to add experience");
    }   
  };

    const handleEditExperience = (index) => {
    const experienceToEdit = experienceList[index];
    setValue("job_title", experienceToEdit.job_title);
    setValue("company", experienceToEdit.company);
    setValue("employment_type", experienceToEdit.employment_type);
    setValue("start_date", experienceToEdit.start_date);
    setValue("end_date", experienceToEdit.end_date);
    setValue("responsibilities", experienceToEdit.responsibilities);
    setValue("technologies", experienceToEdit.technologies);
    setValue("location", experienceToEdit.location);
    setEditIndex(index);
  };

    const handleDeleteExperience = async (index) => {
    if (index < 0 || index >= experienceList.length) return;
    const experienceToDelete = experienceList[index];
    const response = await resumeService.deleteExperience(experienceToDelete.id);
    if (response.success) {
      toast.success("Experience deleted successfully");
      setExperienceList((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error(response.message || "Failed to delete experience");
    }
  };

  const onSubmitStep = async () => {
    await onStepSubmit("experience", { experience: experienceList });
    onNext();
  };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await resumeService.getExperience();
          setExperienceList(response.data || []);
          data.experience = response.data || [];
        } catch (err) {
          console.error("Failed to fetch experience data", err);
        }
      };
      fetchData();
    }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Experience</h2>

      <form onSubmit={handleSubmit(onAddItem)} className="space-y-4">
        <Textinput
          name="job_title"
          label="Job Title"
          placeholder="Enter job title"
          register={register}
          error={errors.job_title}
        />

        <Textinput
          name="company"
          label="Company"
          placeholder="Enter company name"
          register={register}
          error={errors.company}
        />

        <Textinput
          name="employment_type"
          label="Employment Type"
          placeholder="e.g., Full-time, Part-time"
          register={register}
          error={errors.employment_type}
        />

        <Textinput
          type="date"
          name="start_date"
          label="Start Date"
          register={register}
          error={errors.start_date}
        />

        <Textinput
          type="date"
          name="end_date"
          label="End Date"
          register={register}
          error={errors.end_date}
        />

        <Textarea
          name="responsibilities"
          label="Responsibilities"
          placeholder="Describe your main responsibilities"
          register={register}
          error={errors.responsibilities}
        />

        <Textinput
          name="technologies"
          label="Technologies"
          placeholder="Technologies used"
          register={register}
          error={errors.technologies}
        />

        <Textinput
          name="location"
          label="Location"
          placeholder="Job location"
          register={register}
          error={errors.location}
        />

        <Button type="submit" variant="primary">
            {editIndex !== null ? "Update Experience" : "Add Experience"}
        </Button>
      </form>

      {experienceList.length > 0 && (
            <div className="mt-6">
                <h6 className="font-medium mb-2">Added Experience</h6>
                <ul className="space-y-4">
                {experienceList.map((item, index) => (
                    <li
                    key={index}
                    className="border rounded-lg p-4 bg-white shadow-sm relative"
                    >
                    {/* Action buttons */}
                    <div className="absolute top-2 right-2 flex space-x-2">
                        <Button
                        type="button"
                        onClick={() => handleEditExperience(index)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                        title="Edit"
                        >
                        <Icon icon="mdi:pencil" className="text-gray-600 w-5 h-5" />
                        </Button>
                        <Button
                        type="button"
                        onClick={() => handleDeleteExperience(index)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                        title="Delete"
                        >
                        <Icon icon="mdi:delete" className="text-red-500 w-5 h-5" />
                        </Button>
                    </div>

                    {/* Job title */}
                    <div className="flex">
                        <span className="font-semibold text-lg">
                        {item.job_title}
                        </span>
                    </div>
                    {/* Company */}
                    <div className="mt-1 text-sm text-gray-600">
                        <strong>Company:</strong> {item.company}
                    </div>  

                    {/* Employment type */}
                    <div className="mt-1 text-sm text-gray-600">
                        <strong>Employment:</strong> {item.employment_type}
                    </div>

                    {/* Duration */}
                    <div className="mt-1 text-sm text-gray-600">
                        <strong>Duration:</strong> {item.start_date} to {item.end_date}
                    </div>

                    {/* Technologies */}
                    {item.technologies && (
                        <div className="mt-1 text-sm text-gray-600">
                        <strong>Technologies:</strong> {item.technologies}
                        </div>
                    )}

                    {/* Location */}
                    {item.location && (
                        <div className="mt-1 text-sm text-gray-600">
                        <strong>Location:</strong> {item.location}
                        </div>
                    )}

                    {/* Responsibilities */}
                    {item.responsibilities && (
                        <div className="mt-2 text-sm text-gray-700">
                        <strong>Responsibilities:</strong> {item.responsibilities}
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

export default Experience;
