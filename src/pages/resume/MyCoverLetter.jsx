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
    <div className="p-6 flex flex-row items-center bg-white shadow rounded-lg mb-6">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">My Cover Letters</h1>
        <p className="text-gray-600">
            Manage your cover letters here. You can create, edit, or delete them as needed.
        </p>
      </div>

      {/* Button to create a new cover letter */}
      <Button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
        onClick={() => {
          navigate("/cover-letter");
        }}
      > 
        <Icon icon="mdi:plus" className="w-4 h-4 mr-2" />
        Create New Cover Letter
      </Button>
    </div>

     {/* Cover Letter List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {coverLetterList.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {coverLetterList.map((coverLetter) => (
              <div
                key={coverLetter.id}
                className="p-4 flex items-start justify-between hover:bg-gray-50 transition-colors"
              >
                {/* Cover Letter Details */}
                <div className="flex-1 mr-4">
                  <h2 className="text-lg font-semibold mb-2">{coverLetter.name || "Untitled"}</h2>
                  
                  {/* Truncated Description with max 2 lines */}
                  <p 
                    className="text-gray-600 text-sm leading-relaxed mb-2"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {coverLetter.description || "No description available."}
                  </p>
                  
                  {/* Created Date */}
                  <p className="text-gray-400 text-xs">
                    Created: {coverLetter.created_at ? new Date(coverLetter.created_at).toLocaleDateString() : 'Unknown'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 flex-shrink-0">
                  <Button
                    onClick={() => handleEditCoverLetter(coverLetter)}
                    className="flex items-center px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                    title="View Cover Letter"
                  >
                    <Icon icon="mdi:eye" className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button
                    onClick={() => handleDeleteCoverLetter(coverLetter.id)}
                    className="flex items-center px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                    title="Delete Cover Letter"
                  >
                    <Icon icon="mdi:delete" className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Icon icon="mdi:file-document-outline" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No cover letters created yet.</p>
            <p className="text-gray-400 text-sm mt-2">Create your first cover letter to get started!</p>
          </div>
        )}
      </div>

    </>

  );
};

export default MyCoverLetter;