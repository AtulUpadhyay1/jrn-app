import React, { useState , useEffect} from "react";
import { useForm } from "react-hook-form";

import Textinput from "@/components/ui/Textinput";
import { resumeService } from "../../../services/resumeService";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";
import Button from "@/components/ui/Button";


const Education = ({ onStepSubmit, onNext, onPrevious, data ,submitting}) => {
    const { 
      register, 
      handleSubmit,
      resetField,
      setValue
     } = useForm({
        defaultValues: data?.education || {},
      });
      
  const [form, setForm] = useState({
    degree: "",
    specialization: "",
    institution: "",
    start_date: "",
    end_date: "",
    grade: "",
    location: "",
  });

  const [educationList, setEducationList] = useState(data?.education || []);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
};

  const handleAddEducation = async () => {
    if (!form.degree || !form.institution) {
        toast.error("Degree and Institution are required");
        return;
    }
    const formattedData = {
      ...form,
      start_date: formatDate(form.start_date),
      end_date: formatDate(form.end_date),
    };
    console.log("Formatted Data:", formattedData);

    const response = editIndex !== null
      ? await resumeService.updateEducation(educationList[editIndex].id, formattedData)
      : await resumeService.saveEducation(formattedData);

    console.log("Response from saveEducation:", response);

    if (response.success) {
      toast.success(response.message || 
        (editIndex !== null ? "Education updated successfully" : "Education added successfully"));
      if (editIndex !== null) {
        const updatedEducation = [...educationList];
        updatedEducation[editIndex] = formattedData;
        setEducationList(updatedEducation);
        setEditIndex(null);
      } else {
        setEducationList([...educationList, formattedData]);
      }
    
      setForm({
      degree: "",
      specialization: "",
      institution: "",
      start_date: "",
      end_date: "",
      grade: "",
      location: "",
    });
    } else {
      toast.error(response.message || "Failed to add education");
    }

    // Update the state with the new education entry
    
    
  };



  const handleNextClick = () => {
    onStepSubmit("education", { education: educationList })
      .then(() => onNext())
      .catch(console.error);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await resumeService.getEducation();
        setEducationList(response.data || []);
        data.education = response.data || [];

      } catch (err) {
        console.error("Failed to fetch education data", err);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (index) => {
        const eduToEdit = educationList[index];
        setEditIndex(index);
        setValue("degree", eduToEdit.degree);
        setValue("specialization", eduToEdit.specialization);
        setValue("institution", eduToEdit.institution);
        setValue("start_date", eduToEdit.start_date);
        setValue("end_date", eduToEdit.end_date);
        setValue("grade", eduToEdit.grade);
        setValue("location", eduToEdit.location);
        
        // Optionally, you can also update the form state
        setForm(eduToEdit);
  };

const handleDelete = async(index) => {
    if (index < 0 || index >= educationList.length) return;
    // Optionally, you can also call an API to delete the education entry
    const response = await resumeService.deleteEducation(educationList[index].id);
    if (response.success) {
      toast.success("Education deleted successfully");
      setEducationList((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error(response.message || "Failed to delete education");
    }
};

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Education</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Textinput
          name="degree"
          label="Degree"
          placeholder="Your Degree"
          value={form.degree}
          onChange={handleChange}
          register={register}
        />
        <Textinput
          name="specialization"
          label="Specialization"
          placeholder="Your Specialization"
          value={form.specialization}
          onChange={handleChange}
            register={register}
        />
        <Textinput
          name="institution"
          label="Institution"
          placeholder="Institution Name"
          value={form.institution}
          onChange={handleChange}
            register={register}
        />
        <Textinput
          name="start_date"
          label="Start Date"
          type="date"
          placeholder="DD-MM-YYYY"
          value={form.start_date}
          onChange={handleChange}
            register={register}
        />
        <Textinput
          name="end_date"
          label="End Date"
          type="date"
          placeholder="DD-MM-YYYY"
          value={form.end_date}
          onChange={handleChange}
            register={register}
        />
        <Textinput
          name="grade"
          label="Grade"
          placeholder="Grade or GPA"
          value={form.grade}
          onChange={handleChange}
            register={register}
        />
        <Textinput
          name="location"
          label="Location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
            register={register}
        />
      </div>

      {/* <button
        type="button"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleAddEducation}
      >
        Add Education
      </button> */}
      <Button
                  type="submit"
                  text={submitting ? "Saving..." : editIndex !== null ? "Update Education" : "Add Education"}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                  disabled={submitting}
                  onClick={handleAddEducation}
                />

      {/* Education List */}
      {educationList.length > 0 && (
        <div className="mt-6">
          <h6 className="font-medium mb-2">My Education</h6>
          <ul className="space-y-2">
            {educationList.map((edu, idx) => (
              <li
                key={idx}
                className="p-3 border border-gray-300 rounded bg-gray-50"
              >
                <div>
          <strong>{edu.degree}</strong> - {edu.specialization} <br />
          {edu.institution}, {edu.location} <br />
          {edu.start_date} to {edu.end_date} <br />
          Grade: {edu.grade}
        </div>

        <div className="flex gap-2 mt-2 justify-end">
          <button
            type="button"
            onClick={() => handleEdit(idx)}
            className="p-1 rounded hover:bg-gray-200"
          >
            <Icon icon="mdi:pencil" className="h-5 w-5 text-blue-500" />
          </button>
          <button
            type="button"
            onClick={() => handleDelete(idx)}
            className="p-1 rounded hover:bg-gray-200"
          >
            <Icon icon="mdi:trash" className="h-5 w-5 text-red-500" />
          </button>
        </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={onPrevious}
        >
          Back
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Education;
