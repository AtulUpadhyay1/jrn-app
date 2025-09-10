import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "@/components/ui/Textinput";
import Select from "@/components/ui/Select";
import { resumeService } from "../../../services/resumeService";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { Button } from "@headlessui/react";
import { set } from "date-fns";
import { da } from "date-fns/locale";


const schema = yup.object().shape({
  skill: yup.string().required("Skill is required"),
  category: yup.string().required("Category is required"),
  level: yup.string().required("Level is required"),
});

const skillLevels = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Expert", value: "Expert" },
];

const Skills = ({ onStepSubmit, onNext, onPrevious, data ,submitting}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    resetField,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      skill: "",
      category: "",
      level: "",
    },
  });

  const [skillsList, setSkillsList] = useState(data?.skills || []);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddSkill = async () => {
    const currentSkill = {
      skill: watch("skill"),
      category: watch("category"),
      level: watch("level"),
    };

    if (!currentSkill.skill || !currentSkill.category || !currentSkill.level) {
      return;
    }

    const response = editIndex !== null
      ? await resumeService.updateSkill(skillsList[editIndex].id, currentSkill)
      : await resumeService.addSkill(currentSkill);

    if (response.success) {
      toast.success(response.message || 
        (editIndex !== null ? "Skill updated successfully" : "Skill added successfully"));

      if (editIndex !== null) {
        // Update the existing skill in the list
        console.log("Updating skill at index:", editIndex);
        const updatedSkills = [...skillsList];
        updatedSkills[editIndex] = currentSkill;
        setSkillsList(updatedSkills);
        setEditIndex(null);
      } else {
        console.log("Adding new skill");
        setSkillsList([...skillsList, currentSkill]);
      }
      resetField("skill");
      resetField("category");
      resetField("level");
    } else {
      toast.error(response.message || "Failed to add skill");
      
    }

    

    
  };

  const handleNextClick = () => {
    onStepSubmit("skills", { skills: skillsList })
      .then(() => onNext())
      .catch(console.error);
  };

  const handleEdit = (index) => {
    const skillToEdit = skillsList[index];
    setValue("skill", skillToEdit.skill);
    setValue("category", skillToEdit.category);
    setValue("level", skillToEdit.level);
    setEditIndex(index);
    
    

  
  };

  const handleDelete = async (index) => {
    if (index < 0 || index >= skillsList.length) return;
    const response = await resumeService.deleteSkill(skillsList[index].id);
    if (response.success) {
      toast.success("Skill deleted successfully");
      setSkillsList((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error(response.message || "Failed to delete skill");
    }
  };

  

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await resumeService.getSkills();
          setSkillsList(response.data || []);
          data.skills = response.data || [];
        } catch (err) {
          console.error("Failed to fetch skills data", err);
        }
      };
      fetchData();
    }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Skills</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Textinput
          name="skill"
          label="Skill"
          placeholder="Enter Skill"
          register={register}
          error={errors?.skill?.message}
        />
        <Textinput
          name="category"
          label="Category"
          placeholder="Skill Category"
          register={register}
          error={errors?.category?.message}
        />
        <Select
        label="Level"
        name="level"
        register={register}
        error={errors.level}
        options={skillLevels}
        />
      </div>

      
      <Button
        type="button"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleAddSkill}
        disabled={submitting}
      >
        {editIndex !== null ? "Update Skill" : "Add Skill"}
      </Button>
      

      {skillsList.length > 0 && (
        <div className="mt-6">
          <h6 className="font-medium mb-2">Added Skills</h6>
          <ul className="space-y-2">
            {skillsList.map((sk, idx) => (
              <li
                key={idx}
                className="p-3 border border-gray-300 rounded bg-gray-50 flex justify-between"
              >
                <div><strong>{sk.skill}</strong> - {sk.category} ({sk.level})</div>
                <div className="flex gap-2 mt-2 justify-end">
                          <Button
                            type="button"
                            onClick={() => handleEdit(idx)}
                            className="p-1 rounded hover:bg-gray-200"
                          >
                            <Icon icon="mdi:pencil" className="h-5 w-5 text-blue-500" />
                          </Button>
                          <Button
                            type="button"
                            onClick={() => handleDelete(idx)}
                            className="p-1 rounded hover:bg-gray-200"
                          >
                            <Icon icon="mdi:trash" className="h-5 w-5 text-red-500" />
                          </Button>
                        </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <Button
          type="button"
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={onPrevious}
        >
          Back
        </Button>
        <Button 
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={handleNextClick}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Skills;
