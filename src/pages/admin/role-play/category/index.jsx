
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import Select from "@/components/ui/Select";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import { rolePlayCategoryService } from "@/services/rolePlayCategoryService";

// Validation schema for category form
const categorySchema = yup
  .object({
    name: yup
      .string()
      .required("Category name is required")
      .min(2, "Category name must be at least 2 characters")
      .max(50, "Category name must not exceed 50 characters"),
    status: yup
      .string()
      .required("Status is required")
      .oneOf(["active", "inactive"], "Invalid status selected"),
  })
  .required();

const RolePlayCategory = () => {
  const queryClient = useQueryClient();
  
  // State management
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Form states
  const [selectedCategory, setSelectedCategory] = useState(null);

  // React Query - Fetch categories
  const {
    data: categoriesResponse,
    isLoading,
    error: fetchError,
    refetch,
  } = useQuery({
    queryKey: ["rolePlayCategories"],
    queryFn: rolePlayCategoryService.getCategories
  });

  const categories = categoriesResponse?.data || [];

  // Form hook for category form
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(categorySchema),
    mode: "all",
    defaultValues: {
      name: "",
      status: "active",
    },
  });

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  // React Query Mutations
  const createCategoryMutation = useMutation({
    mutationFn: rolePlayCategoryService.createCategory,
    onSuccess: (response) => {
      toast.success(response.message || "Category created successfully");
      setIsCreateModalOpen(false);
      reset();
      queryClient.invalidateQueries({ queryKey: ["rolePlayCategories"] });
    },
    onError: (error) => {
      console.error("Error creating category:", error);
      toast.error(
        error.response?.data?.message || 
        error.message || 
        "Failed to create category"
      );
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, data }) => rolePlayCategoryService.updateCategory(id, data),
    onSuccess: (response) => {
      toast.success(response.message || "Category updated successfully");
      setIsEditModalOpen(false);
      setSelectedCategory(null);
      reset();
      queryClient.invalidateQueries({ queryKey: ["rolePlayCategories"] });
    },
    onError: (error) => {
      console.error("Error updating category:", error);
      toast.error(
        error.response?.data?.message || 
        error.message || 
        "Failed to update category"
      );
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: rolePlayCategoryService.deleteCategory,
    onSuccess: (response) => {
      toast.success(response.message || "Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["rolePlayCategories"] });
    },
    onError: (error) => {
      console.error("Error deleting category:", error);
      toast.error(
        error.response?.data?.message || 
        error.message || 
        "Failed to delete category"
      );
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: rolePlayCategoryService.toggleCategoryStatus,
    onSuccess: (response, categoryId) => {
      const category = categories.find(cat => cat.id === categoryId);
      const statusText = category?.status === 'active' ? 'deactivated' : 'activated';
      toast.success(response.message || `Category ${statusText} successfully`);
      queryClient.invalidateQueries({ queryKey: ["rolePlayCategories"] });
    },
    onError: (error) => {
      console.error("Error toggling category status:", error);
      toast.error(
        error.response?.data?.message || 
        error.message || 
        "Failed to toggle category status"
      );
    },
  });

  // Form submission handlers
  const handleCreateCategory = (formData) => {
    createCategoryMutation.mutate(formData);
  };

  const handleUpdateCategory = (formData) => {
    if (!selectedCategory) return;
    updateCategoryMutation.mutate({
      id: selectedCategory.id,
      data: formData,
    });
  };

  const handleToggleStatus = (category) => {
    toggleStatusMutation.mutate(category.id);
  };
  // Event Handlers
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setValue("name", category.name);
    setValue("status", category.status);
    setIsEditModalOpen(true);
  };

  const handleDelete = (category) => {
    Swal.fire({
      title: 'Delete Category',
      text: `Are you sure you want to delete "${category.name}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      focusConfirm: false,
      customClass: {
        popup: 'rounded-lg',
        title: 'text-lg font-semibold',
        content: 'text-sm text-slate-600',
        confirmButton: 'rounded-lg px-4 py-2 font-medium',
        cancelButton: 'rounded-lg px-4 py-2 font-medium'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategoryMutation.mutate(category.id);
      }
    });
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
    setSelectedCategory(null);
    reset();
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedCategory(null);
    reset();
  };

  // Utility functions
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    return status === "active" ? (
      <Badge label="Active" className="bg-success-500" />
    ) : (
      <Badge label="Inactive" className="bg-warning-500" />
    );
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Role Play Categories
          </h1>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-400">
            Manage role play categories for your application
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button
            text="Add New Category"
            icon="heroicons-outline:plus"
            className="btn-primary shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            onClick={() => setIsCreateModalOpen(true)}
          />
        </div>
      </div>

      {/* Error message for fetch error */}
      {fetchError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {fetchError.message || "Failed to fetch categories"}</span>
        </div>
      )}

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex-1 max-w-md">
            <Textinput
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon="heroicons-outline:search"
            />
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
              <Icon icon="heroicons-outline:collection" className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {filteredCategories.length} 
                {searchTerm ? ` of ${categories.length}` : ''} categor{filteredCategories.length === 1 ? 'y' : 'ies'}
              </span>
            </div>
            {searchTerm && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                <Icon icon="heroicons-outline:search" className="h-3 w-3 text-blue-500" />
                <span className="text-xs text-blue-600 dark:text-blue-400">
                  Filtered
                </span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Categories Table */}
      <Card>
        {isLoading ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  <th className="table-th w-16">
                    <div className="flex items-center">
                      <Icon icon="heroicons-outline:hashtag" className="h-4 w-4 mr-1 text-slate-500" />
                      #
                    </div>
                  </th>
                  <th className="table-th">
                    <div className="flex items-center">
                      <Icon icon="heroicons-outline:tag" className="h-4 w-4 mr-2 text-slate-500" />
                      Category Name
                    </div>
                  </th>
                  <th className="table-th w-32">
                    <div className="flex items-center">
                      <Icon icon="heroicons-outline:status-online" className="h-4 w-4 mr-2 text-slate-500" />
                      Status
                    </div>
                  </th>
                  <th className="table-th w-32">
                    <div className="flex items-center">
                      <Icon icon="heroicons-outline:cog" className="h-4 w-4 mr-2 text-slate-500" />
                      Actions
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                {[...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td className="table-td">
                      <div className="animate-pulse bg-slate-200 dark:bg-slate-600 h-4 rounded"></div>
                    </td>
                    <td className="table-td">
                      <div className="animate-pulse bg-slate-200 dark:bg-slate-600 h-4 rounded"></div>
                    </td>
                    <td className="table-td">
                      <div className="animate-pulse bg-slate-200 dark:bg-slate-600 h-6 w-16 rounded-full"></div>
                    </td>
                    <td className="table-td">
                      <div className="flex items-center space-x-1">
                        <div className="animate-pulse bg-slate-200 dark:bg-slate-600 h-8 w-8 rounded-lg"></div>
                        <div className="animate-pulse bg-slate-200 dark:bg-slate-600 h-8 w-8 rounded-lg"></div>
                        <div className="animate-pulse bg-slate-200 dark:bg-slate-600 h-8 w-8 rounded-lg"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : !filteredCategories || filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <Icon
              icon="heroicons-outline:folder-open"
              className="mx-auto h-12 w-12 text-slate-400"
            />
            <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
              No categories found
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Get started by creating a new category.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  <th scope="col" className="table-th w-16">
                    <div className="flex items-center">
                      <Icon icon="heroicons-outline:hashtag" className="h-4 w-4 mr-1 text-slate-500" />
                      #
                    </div>
                  </th>
                  <th scope="col" className="table-th">
                    <div className="flex items-center">
                      <Icon icon="heroicons-outline:tag" className="h-4 w-4 mr-2 text-slate-500" />
                      Category Name
                    </div>
                  </th>
                  <th scope="col" className="table-th w-32">
                    <div className="flex items-center">
                      <Icon icon="heroicons-outline:status-online" className="h-4 w-4 mr-2 text-slate-500" />
                      Status
                    </div>
                  </th>
                  <th scope="col" className="table-th w-32">
                    <div className="flex items-center">
                      <Icon icon="heroicons-outline:cog" className="h-4 w-4 mr-2 text-slate-500" />
                      Actions
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                {filteredCategories.map((category, index) => (
                  <tr
                    key={category.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    <td className="table-td">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {index + 1}
                      </span>
                    </td>
                    <td className="table-td">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {category.name}
                      </span>
                    </td>
                    <td className="table-td">{getStatusBadge(category.status)}</td>
                    <td className="table-td">
                      <div className="flex items-center space-x-1">
                        <div className="group relative">
                          <Button
                            icon="heroicons-outline:pencil"
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 border border-blue-200 hover:border-blue-300"
                            onClick={() => handleEdit(category)}
                          />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                            Edit Category
                          </div>
                        </div>
                        
                        <div className="group relative">
                          <Button
                            icon={
                              category.status === "active"
                                ? "heroicons-outline:eye-slash"
                                : "heroicons-outline:eye"
                            }
                            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 border ${
                              category.status === "active"
                                ? "bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700 border-amber-200 hover:border-amber-300"
                                : "bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 border-green-200 hover:border-green-300"
                            }`}
                            onClick={() => handleToggleStatus(category)}
                          />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                            {category.status === "active" ? "Deactivate" : "Activate"}
                          </div>
                        </div>
                        
                        <div className="group relative">
                          <Button
                            icon="heroicons-outline:trash"
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200 border border-red-200 hover:border-red-300"
                            onClick={() => handleDelete(category)}
                          />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                            Delete Category
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Create Category Modal */}
      <Modal
        activeModal={isCreateModalOpen}
        onClose={handleCreateModalClose}
        title="Create New Category"
        className="max-w-lg"
      >
        <form onSubmit={handleSubmit(handleCreateCategory)} className="space-y-4">
          <Textinput
            name="name"
            label="Category Name"
            placeholder="Enter category name"
            register={register}
            error={formErrors.name}
          />

          <div className="fromGroup">
            <label className="form-label">Status</label>
            <Select
              name="status"
              register={register}
              options={statusOptions}
              error={formErrors.status}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              text="Cancel"
              className="btn-outline-secondary hover:bg-slate-50 transition-all duration-200"
              onClick={handleCreateModalClose}
              type="button"
              disabled={createCategoryMutation.isPending}
            />
            <Button
              text="Create Category"
              type="submit"
              className="btn-primary shadow-md hover:shadow-lg transition-all duration-200"
              isLoading={createCategoryMutation.isPending}
              disabled={createCategoryMutation.isPending}
            />
          </div>
        </form>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        activeModal={isEditModalOpen}
        onClose={handleEditModalClose}
        title="Edit Category"
        className="max-w-lg"
      >
        <form onSubmit={handleSubmit(handleUpdateCategory)} className="space-y-4">
          <Textinput
            name="name"
            label="Category Name"
            placeholder="Enter category name"
            register={register}
            error={formErrors.name}
          />

          <div className="fromGroup">
            <label className="form-label">Status</label>
            <Select
              name="status"
              register={register}
              options={statusOptions}
              error={formErrors.status}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              text="Cancel"
              className="btn-outline-secondary hover:bg-slate-50 transition-all duration-200"
              onClick={handleEditModalClose}
              type="button"
              disabled={updateCategoryMutation.isPending}
            />
            <Button
              text="Update Category"
              type="submit"
              className="btn-primary shadow-md hover:shadow-lg transition-all duration-200"
              isLoading={updateCategoryMutation.isPending}
              disabled={updateCategoryMutation.isPending}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RolePlayCategory;
