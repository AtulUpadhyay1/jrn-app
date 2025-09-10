import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "@/components/ui/Textinput";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { resumeService } from "../../../services/resumeService";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

const schema = yup.object().shape({
  language: yup.string().required("Language is required"),
  proficiency: yup.string().required("Proficiency is required"),
});

const proficiencyLevels = [
  { label: "Basic", value: "Basic" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "High", value: "High" },
  { label: "Native", value: "Native" },
];

const Communication = ({ data, onStepSubmit, onNext, onPrevious, submitting }) => {
  const [languages, setLanguages] = useState(data.communication || []);
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
      language: "",
      proficiency: "",
    },
  });

  const onAddLanguage = async (formData) => {
    if (!formData.language || !formData.proficiency) {
        toast.error("Both language and proficiency are required");
      return;
    }

    const existingLanguage = languages.find(lang => lang.language === formData.language);
    if (existingLanguage) {
        toast.error("Language already exists");
        reset();
      return;
    }

    var response = editIndex !== null ? await resumeService.updateCommunication(languages[editIndex].id, formData) : 
    await resumeService.addCommunication(formData);
    if (response.success) {
      toast.success(response.message || (editIndex !== null ? "Language updated successfully" : "Language added successfully"));
      if (editIndex !== null) {
        const updatedLanguages = [...languages];
        updatedLanguages[editIndex] = formData;
        setLanguages(updatedLanguages);
        setEditIndex(null);
      } else {
        setLanguages((prev) => [...prev, formData]);
      }
      reset();
    } else {
      toast.error(response.message || "Failed to add language");
    }
  };
      

  const onSubmitStep = async () => {
    await onStepSubmit("communication", { communication: languages });
    onNext();
  };

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await resumeService.getCommunication();
          setLanguages(response.data || []);
          data.communication = response.data || [];
        } catch (err) {
          console.error("Failed to fetch communication data", err);
        }
      };
      fetchData();
    }, []);

    const handleEdit = (index) => {
      const langToEdit = languages[index];
        setEditIndex(index);
      setValue("language", langToEdit.language);
      setValue("proficiency", langToEdit.proficiency);
    };

    const handleDelete = async (index) => {
        if (index < 0 || index >= languages.length) return;
      const langToDelete = languages[index];   
      const response = await resumeService.deleteCommunication(langToDelete.id);
      if (response.success) {
        setLanguages((prev) => prev.filter((_, i) => i !== index));
        toast.success("Language deleted successfully");
      } else {
        toast.error(response.message || "Failed to delete language");
      }
    };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Communication Skills</h2>

      <form onSubmit={handleSubmit(onAddLanguage)} className="space-y-4">
        <Textinput
          name="language"
          label="Language"
          placeholder="Enter language"
          register={register}
          error={errors.language}
        />

        <Select
          label="Proficiency"
          name="proficiency"
          register={register}
          error={errors.proficiency}
          options={proficiencyLevels}
        />

        <Button type="submit" variant="primary">
            {editIndex !== null ? "Update Language" : "Add Language"}
        </Button>
      </form>

      {languages.length > 0 && (
        <div className="mt-6">
          <h6 className="font-medium mb-2">My Languages</h6>
          <ul className="space-y-2">
            {languages.map((lang, index) => (
              <li
                key={index}
                className="border rounded p-2 flex justify-between"
              >
                
                <div className="flex justify-between w-full">
                    <div className="flex-1 mt-2">
                        <strong>{lang.language}</strong> - {lang.proficiency}
                    </div>
                    <div className="flex justify-end">
                                              <Button
                                                type="button"
                                                onClick={() => handleEdit(index)}
                                                className="p-1 rounded hover:bg-gray-200"
                                              >
                                                <Icon icon="mdi:pencil" className="h-5 w-5 text-blue-500" />
                                              </Button>
                                              <Button
                                                type="button"
                                                onClick={() => handleDelete(index)}
                                                className="p-1 rounded hover:bg-gray-200"
                                              >
                                                <Icon icon="mdi:trash" className="h-5 w-5 text-red-500" />
                                              </Button>
                                            </div>
                 </div>
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

export default Communication;
