import React, { useState,useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { resumeService } from "../../services/resumeService";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Select from "@/components/ui/Select";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

const CoverLetter = () => {
  const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
    } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        name: "",
        description: "",
      },
    });

  const navigate = useNavigate();
  const location = useLocation();
  const { coverLetter } = location.state || {};
  const [wordCount, setWordCount] = useState(500); // Default word count
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAIResponse] = useState(null);
  const [responseContent, setResponseContent] = useState(null);

  // If coverLetter is provided, populate the form with its data
  if (coverLetter) {
    console.log("Editing cover letter:", coverLetter);
    setValue("name", coverLetter.name || "");
    setValue("description", coverLetter.description || "");
    setValue("company", coverLetter.company || "");
    setValue("role", coverLetter.role || "");
    setValue("skills", coverLetter.skills || "");
    setValue("experience_years", coverLetter.experience_years || "");
    //setAIResponse(coverLetter.generated_response);
    // if (coverLetter.generated_response && typeof coverLetter.generated_response === "string") {
    //   const json = JSON.parse(coverLetter.generated_response,null,2);
    //   setContent(json.content || "");
    // }
  
  }


  useEffect(() => {
    console.log("CoverLetter generated_response changed:", coverLetter?.generated_response);
    if (coverLetter?.generated_response) {
      try {
        const json = JSON.parse(coverLetter.generated_response);
        setResponseContent(json.content || "");
      } catch (error) {
        console.error("Invalid JSON:", error);
      }
    }
  }, [coverLetter?.generated_response]); // ✅ only run when value changes



  const onSubmit = async (data) => {
    //add some values in data
    data.language = "en-GB";
    data.style = "plain";
    data.use_bullets = true;  
    data.sign_off_name = data.name;
    data.tone = data.tone || "polite"; // Default tone if not provided
    //convert comma based skill in array
    data.skills = data.skills ? data.skills.split(",").map(skill => skill.trim()) : [];
    data.structure = ["opener","fit","key_achievements","why_company","closing"];
    data.max_words = wordCount;
    setLoading(true);

    // for edit till not its disabled
    //coverLetter ? await resumeService.updateCoverLetter(coverLetter.id, data) :
    const response =  await resumeService.saveCoverLetter(data);
    if (response.success) {
      toast.success("Cover letter generated successfully!");
      reset();
        // Optionally, you can navigate to a different page or update the state

        // setValue("name", "");
        // setValue("description", "");
        // navigate(-1);

        const id = response.data.id;
        const aiResponse = await resumeService.getCoverLetterAIResponse(id);
        setAIResponse(aiResponse);

        // Handle success, e.g., navigate to the cover letter page or display it
      } else {
        toast.error("Failed to generate cover letter.");
      }
      setLoading(false);
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Cover Letter Inputs</h2>
          <div className="space-y-4">
            
            <Textinput
              label="Your Name"
              name="name"
              placeholder="Enter your name"
              error={errors.name?.message}
              register={register}
              
            />
            <Textarea
              label="Job Description"
              name="description"
              placeholder="Enter job description"
              rows={4}
              error={errors.description?.message}
              register={register}
            />
            {/* company */}
            <Textinput
              label="Company Name"
              name="company"
              placeholder="Enter company name"
              error={errors.company?.message}
              register={register}
            />
            {/* Role */}
            <Textinput
              label="Role"
              name="role"
              placeholder="Enter role"
              error={errors.role?.message}
              register={register}
            />
            {/* Skills */}
            <Textinput
              label="Skills"
              name="skills"
              placeholder="Enter skills"
              error={errors.skills?.message}
              register={register}
            />
            {/* experience in years */}
            <Textinput
              label="Experience (in years)"
              name="experience_years"
              placeholder="Enter experience in years"
              error={errors.experience_years?.message}
              register={register}
            />
            {/* Max Word Slider limit 200 to 2000 */}
            <div className="flex items-center space-x-4">
            <label htmlFor="wordCount" className="whitespace-nowrap font-medium">
              Max Words:
            </label>
  
                {/* Slider container */}
                <div className="flex-1 flex items-center space-x-3">
                  <input
                    id="wordCount"
                    type="range"
                    min="200"
                    max="2000"
                    step="50"
                    value={wordCount}
                    onChange={(e) => setWordCount(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <span className="px-2 py-1 text-sm font-semibold bg-blue-100 text-blue-700 rounded-md min-w-[3rem] text-center">
                    {wordCount}
                  </span>
                </div>
            </div>


            {/* Tone -Select Component Tone -polite, aggressive */}
            <Select
                      label="Tone"
                      name="tone"
                      register={register}
                      error={errors.tone}
                      options={[{ value: "polite", label: "Polite" }, { value: "aggressive", label: "Aggressive" }]}
             />


            {/* if cover letter data exist then remove button */}
            {coverLetter == null && (
              <Button
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                onClick={handleSubmit(onSubmit)}
              >
                {coverLetter ? "Update Cover Letter" : "Generate Cover Letter"}
              </Button>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        {/* Add a loading state or spinner here if needed if ai response null show enter details to get AI response */}
        <div className="bg-white p-6 rounded-xl shadow">
          {loading ? (
            <div className="flex justify-center items-center py-4">
              <span className="loader"></span>
            </div>
          ) : aiResponse || responseContent ? (
            <div className="bg-white p-6 rounded-xl shadow text-gray-800 whitespace-pre-wrap">
              {/* Show this data in edit mode */}
              <h2 className="text-lg font-semibold">Cover Letter Preview</h2>
              {/* check coverLetter?.generated_response is exist and decode it from String to json */}
              {/* parse json data or apiResponse.letter on one variable */}
              
              <textarea
                value={responseContent || aiResponse?.letter || ""}
                onChange={(e) => setResponseContent(e.target.value)}
                className="mt-4 w-full border rounded-md p-2 resize-y min-h-[650px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your generated cover letter will appear here..."
                />

            </div>
          ) : (
            <div className="text-gray-500 text-center">Enter details to get AI response</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoverLetter;
