import { Button } from "@headlessui/react";
import React, { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import { resumeService } from "../../services/resumeService";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";



const MyCoverLetter = () => {
  const navigate = useNavigate();
  // fetch cover letters from the server or state management
  const [coverLetterList, setCoverLetterList] = useState([]);


  useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await resumeService.getCoverLetters();
            setCoverLetterList(data['data'] || []);
          } catch (err) {
            console.error("Failed to fetch cover letter data", err);
          }
        };
        fetchData();
      }, []);


  const handleEditCoverLetter = (coverLetter) => {
    navigate("/cover-letter", {
      state: {coverLetter }, // sending object here
    });
  };

  const handleDeleteCoverLetter = async (id) => {
    const response = await resumeService.deleteCoverLetter(id);
    if (response.success) {
      toast.success("Cover letter deleted successfully");
      setCoverLetterList((prev) => prev.filter((letter) => letter.id !== id));
    } else {
      toast.error(response.message || "Failed to delete cover letter");
    }
  };

 

  return (

    <>
    <div className="p-4 flex flex-row items-center">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">My Cover Letters</h1>
        <p className="text-gray-600 mb-6">
            Manage your cover letters here. You can create, edit, or delete them as needed.
        </p>
      </div>

     

      {/* Button to create a new cover letter */}
      <Button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => {
          navigate("/cover-letter");
          
        }}
      > 
        Create New Cover Letter
      </Button>
    </div>

     {/* Placeholder for cover letter list */}
      <div className="bg-white shadow rounded-lg p-6">
  {coverLetterList.length > 0 ? (
    coverLetterList.map((coverLetter) => (
      <div
        key={coverLetter.id}
        className="py-4 flex items-start justify-between"
      >
        {/* Cover Letter Details */}
        <div>
          <h2 className="text-lg font-semibold">{coverLetter.name || "Untitled"}</h2>
          <p className="text-gray-600 text-sm">
            {coverLetter.description || "No description available."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            onClick={() => handleEditCoverLetter(coverLetter)}
            className="p-1 hover:bg-gray-100 rounded-full"
            title="Edit"
          >
            <Icon icon="mdi:eye" className="w-5 h-5 text-gray-600" />
          </Button>
          <Button
            onClick={() => handleDeleteCoverLetter(coverLetter.id)}
            className="p-1 hover:bg-gray-100 rounded-full"
            title="Delete"
          >
            <Icon icon="mdi:delete" className="w-5 h-5 text-red-500" />
          </Button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No cover letters created yet.</p>
  )}
</div>

    </>

  );
};

export default MyCoverLetter;