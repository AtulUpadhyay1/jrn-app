import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRolePlayCategories, useRolePlayUseCases } from "@/services/userSkillService";

const Practice = () => {
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Fetch categories using custom React Query hook
  const { 
    data: categoriesData, 
    isLoading: categoriesLoading, 
    error: categoriesError 
  } = useRolePlayCategories();

  // Fetch use cases using custom React Query hook
  const { 
    data: useCasesData, 
    isLoading: useCasesLoading, 
    error: useCasesError 
  } = useRolePlayUseCases();

  const categories = categoriesData?.data || [];
  const useCases = useCasesData?.data || [];

  // Set first category as selected by default when categories load
  useEffect(() => {
    if (categories.length > 0 && selectedCategoryId === null) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories, selectedCategoryId]);

  // Filter use cases based on selected category
  const filteredUseCases = useCases.filter(useCase => useCase.category_id === selectedCategoryId);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  // Show loading state
  if (categoriesLoading || useCasesLoading) {
    return (
      <section className="p-6 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading practice data...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (categoriesError || useCasesError) {
    return (
      <section className="p-6 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <Icon icon="heroicons-outline:exclamation-triangle" className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load data</h3>
              <p className="text-gray-600 mb-4">Something went wrong while fetching practice data.</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }


  return (
    <>
      <section className="p-6 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          {/* Categories Tabs */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Practice By Categories</h2>
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${selectedCategoryId === category.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    {category.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Use Cases Grid */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Use Cases {selectedCategoryId && `for ${categories.find(c => c.id === selectedCategoryId)?.name}`}
            </h3>
            {filteredUseCases.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Icon icon="heroicons-outline:folder-open" className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">No use cases found</h4>
                <p className="text-gray-500">No use cases available for this category yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUseCases.map((useCase) => (
                  <div key={useCase.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{useCase.name}</h4>
                          <p className="text-sm text-gray-600 line-clamp-3">{useCase.prompt}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-3 ${useCase.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                          }`}>
                          {useCase.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Icon icon="heroicons-outline:clock" className="w-4 h-4 mr-1" />
                          <span>{useCase.time} minutes</span>
                        </div>
                        <div className="flex items-center">
                          <Icon icon="heroicons-outline:video-camera" className="w-4 h-4 mr-1" />
                          <span className="capitalize">{useCase.use_case_type}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-xs text-gray-500">
                          Created {new Date(useCase.created_at).toLocaleDateString()}
                        </span>
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200 flex items-center"
                          onClick={() => {
                            // Store selected useCase in localStorage and open start page
                            localStorage.setItem('practiceUseCase', JSON.stringify(useCase));
                            window.open('/practice/start', '_blank');
                          }}
                        >
                          <Icon icon="heroicons-outline:play" className="w-4 h-4 mr-1" />
                          Start
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Practice;
