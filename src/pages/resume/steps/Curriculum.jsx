import React, { use, useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import { toast } from "react-toastify";
import { resumeService } from "../../../services/resumeService";
import { Icon } from "@iconify/react";


const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const Curriculum = ({ data, onStepSubmit, onNext, onPrevious, submitting }) => {
  const [curriculumList, setCurriculumList] = useState(data.curriculum || []);
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
    },
  });

  const onAddItem = async (formData) => {
    if (!formData.title || !formData.description) {
        toast.error("Both title and description are required");
        return;
    }
    if (curriculumList.some(item => item.title === formData.title)) {
        toast.error("Curriculum item with this title already exists");
        reset();
      return;
    }
    var response =  editIndex !== null ? await resumeService.updateCurriculum(curriculumList[editIndex].id, formData) : await resumeService.addCurriculum(formData);
    if (response.success) {
      toast.success(response.message || (editIndex !== null ? "Curriculum item updated successfully" : "Curriculum item added successfully"));
      if (editIndex !== null) {
        const updatedCurriculum = [...curriculumList];
        updatedCurriculum[editIndex] = formData;
        setCurriculumList(updatedCurriculum);
        setEditIndex(null);
      } else {
        setCurriculumList((prev) => [...prev, formData]);
      }
      reset();
    } else {
      toast.error(response.message || "Failed to add curriculum item");
    
    }
    
  };

    const handleEdit = (index) => {
      const itemToEdit = curriculumList[index];
        setEditIndex(index);
      setValue("title", itemToEdit.title);
      setValue("description", itemToEdit.description);
    };

    const handleDelete = async (index) => {
        if (index < 0 || index >= curriculumList.length) return;
        const itemToDelete = curriculumList[index];
        const response = await resumeService.deleteCurriculum(itemToDelete.id);
        if (response.success) {
          toast.success("Curriculum item deleted successfully");
          setCurriculumList((prev) => prev.filter((_, i) => i !== index));
        } else {
          toast.error(response.message || "Failed to delete curriculum item");
        }
      };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await resumeService.getCurriculum();
        setCurriculumList(response.data || []);
        data.curriculum = response.data || [];
      } catch (err) {
        console.error("Failed to fetch curriculum data", err);
      }
    };
    fetchData();
  }, []);

  const onSubmitStep = async () => {
    await onStepSubmit("curriculum", { curriculum: curriculumList });
    onNext();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Curriculum</h2>

      <form onSubmit={handleSubmit(onAddItem)} className="space-y-4">
        <Textinput
          name="title"
          label="Title"
          placeholder="Enter curriculum title (e.g., Data Structures)"
          register={register}
          error={errors.title}
        />

        <Textarea
          name="description"
          label="Description"
          placeholder="Brief description or objective"
          register={register}
          error={errors.description}
        />

        <Button type="submit" variant="primary">
          {editIndex !== null ? "Update Curriculum" : "Add Curriculum"  }
        </Button>
      </form>

      {curriculumList.length > 0 && (
        <div className="mt-6">
          <h6 className="font-medium mb-2">Added Curriculum Items</h6>
          <ul className="space-y-2">
            {curriculumList.map((item, index) => (
              <li
                key={index}
                className="border rounded p-2 flex flex-row justify-between items-start"
              >
                <div className="flex-1 mt-2">
                  <span className="font-semibold">{item.title}</span>
                
                  <span className="text-sm text-gray-600"> {item.description}</span>
                </div>
                <div className="flex justify-end mt-2">
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

export default Curriculum;
