import React, { useMemo, useState } from "react";
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
import Textarea from "@/components/ui/Textarea";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";

import { rolePlayUseCaseService } from "@/services/rolePlayUseCaseService";
import { rolePlayCategoryService } from "@/services/rolePlayCategoryService";

// Validation schema for use case form
const useCaseSchema = yup
  .object({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must not exceed 100 characters"),
    category_id: yup
      .number()
      .typeError("Category is required")
      .required("Category is required")
      .integer("Invalid category")
      .positive("Invalid category"),
    prompt: yup
      .string()
      .required("Prompt is required")
      .min(5, "Prompt must be at least 5 characters"),
    time: yup
      .string()
      .required("Time is required")
      .max(20, "Time must not exceed 20 characters"),
  })
  .required();

const RolePlayUseCases = () => {
  const queryClient = useQueryClient();

  // UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUseCase, setSelectedUseCase] = useState(null);

  // Fetch use cases
  const {
    data: useCasesResponse,
    isLoading: isUseCasesLoading,
    error: useCasesError,
  } = useQuery({
    queryKey: ["rolePlayUseCases"],
    queryFn: rolePlayUseCaseService.getUseCases,
  });

  const useCases = useCasesResponse?.data || [];

  // Fetch categories for select
  const {
    data: categoriesResponse,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["rolePlayCategories"],
    queryFn: rolePlayCategoryService.getCategories,
  });

  const categories = categoriesResponse?.data || [];
  const categoryOptions = useMemo(
    () => categories.map((c) => ({ value: c.id, label: c.name })),
    [categories]
  );

  // Form hook (shared for create and edit)
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(useCaseSchema),
    mode: "all",
    defaultValues: {
      name: "",
      category_id: "",
      prompt: "",
      time: "",
    },
  });

  // Mutations
  const createUseCaseMutation = useMutation({
    mutationFn: rolePlayUseCaseService.createUseCase,
    onSuccess: (response) => {
      toast.success(response.message || "Use case created successfully");
      setIsCreateModalOpen(false);
      reset();
      queryClient.invalidateQueries({ queryKey: ["rolePlayUseCases"] });
    },
    onError: (error) => {
      console.error("Error creating use case:", error);
      toast.error(
        error?.response?.data?.message || error?.message || "Failed to create use case"
      );
    },
  });

  const updateUseCaseMutation = useMutation({
    mutationFn: ({ id, data }) => rolePlayUseCaseService.updateUseCase(id, data),
    onSuccess: (response) => {
      toast.success(response.message || "Use case updated successfully");
      setIsEditModalOpen(false);
      setSelectedUseCase(null);
      reset();
      queryClient.invalidateQueries({ queryKey: ["rolePlayUseCases"] });
    },
    onError: (error) => {
      console.error("Error updating use case:", error);
      toast.error(
        error?.response?.data?.message || error?.message || "Failed to update use case"
      );
    },
  });

  const deleteUseCaseMutation = useMutation({
    mutationFn: rolePlayUseCaseService.deleteUseCase,
    onSuccess: (response) => {
      toast.success(response.message || "Use case deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["rolePlayUseCases"] });
    },
    onError: (error) => {
      console.error("Error deleting use case:", error);
      toast.error(
        error?.response?.data?.message || error?.message || "Failed to delete use case"
      );
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: rolePlayUseCaseService.toggleUseCaseStatus,
    onSuccess: (response, useCaseId) => {
      const u = useCases.find((uc) => uc.id === useCaseId);
      const statusText = u?.status === "active" ? "deactivated" : "activated";
      toast.success(response.message || `Use case ${statusText} successfully`);
      queryClient.invalidateQueries({ queryKey: ["rolePlayUseCases"] });
    },
    onError: (error) => {
      console.error("Error toggling status:", error);
      toast.error(
        error?.response?.data?.message || error?.message || "Failed to toggle status"
      );
    },
  });

  // Handlers
  const onCreate = (formData) => {
    const payload = { ...formData, category_id: Number(formData.category_id) };
    createUseCaseMutation.mutate(payload);
  };

  const onUpdate = (formData) => {
    if (!selectedUseCase) return;
    const payload = { ...formData, category_id: Number(formData.category_id) };
    updateUseCaseMutation.mutate({ id: selectedUseCase.id, data: payload });
  };

  const handleEdit = (useCase) => {
    setSelectedUseCase(useCase);
    setValue("name", useCase.name);
    setValue("category_id", useCase.category_id);
    setValue("prompt", useCase.prompt || "");
    setValue("time", useCase.time || "");
    setIsEditModalOpen(true);
  };

  const handleDelete = (useCase) => {
    Swal.fire({
      title: "Delete Use Case",
      text: `Are you sure you want to delete "${useCase.name}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      focusConfirm: false,
      customClass: {
        popup: "rounded-lg",
        title: "text-lg font-semibold",
        content: "text-sm text-slate-600",
        confirmButton: "rounded-lg px-4 py-2 font-medium",
        cancelButton: "rounded-lg px-4 py-2 font-medium",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUseCaseMutation.mutate(useCase.id);
      }
    });
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
    setSelectedUseCase(null);
    reset();
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedUseCase(null);
    reset();
  };

  const getStatusBadge = (status) =>
    status === "active" ? (
      <Badge label="Active" className="bg-success-500" />
    ) : (
      <Badge label="Inactive" className="bg-warning-500" />
    );

  // Filtering
  const filteredUseCases = useCases.filter((u) => {
    const hay = `${u.name} ${u?.category?.name ?? ""}`.toLowerCase();
    return hay.includes(searchTerm.toLowerCase());
  });


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Role Play Use Cases
          </h1>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-400">
            Manage role play use cases for your application
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button
            text="Add New Use Case"
            icon="heroicons-outline:plus"
            className="btn-primary shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            onClick={() => setIsCreateModalOpen(true)}
          />
        </div>
      </div>

      {/* Fetch errors */}
      {(useCasesError || categoriesError) && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            {useCasesError?.message || categoriesError?.message || "Failed to fetch data"}
          </span>
        </div>
      )}

      {/* Search */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex-1 max-w-md">
            <Textinput
              type="text"
              placeholder="Search use cases or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon="heroicons-outline:search"
            />
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
              <Icon icon="heroicons-outline:collection" className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {filteredUseCases.length}
                {searchTerm ? ` of ${useCases.length}` : ""} item
                {filteredUseCases.length === 1 ? "" : "s"}
              </span>
            </div>
            {searchTerm && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                <Icon icon="heroicons-outline:search" className="h-3 w-3 text-blue-500" />
                <span className="text-xs text-blue-600 dark:text-blue-400">Filtered</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card>
        {isUseCasesLoading ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  <th className="table-th w-12">#</th>
                  <th className="table-th">Name</th>
                  <th className="table-th">Category</th>
                  <th className="table-th w-28">Time</th>
                  <th className="table-th w-28">Status</th>
                  <th className="table-th w-32">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                {[...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="table-td">
                      <div className="animate-pulse bg-slate-200 dark:bg-slate-600 h-4 rounded" />
                    </td>
                    <td className="table-td">
                      <div className="animate-pulse bg-slate-200 dark:bg-slate-600 h-4 rounded" />
                    </td>
                    <td className="table-td">
                      <div className="animate-pulse bg-slate-200 dark:bg-slate-600 h-4 rounded" />
                    </td>
                    <td className="table-td">
                      <div className="animate-pulse bg-slate-200 dark:bg-slate-600 h-4 rounded w-16" />
                    </td>
                    <td className="table-td">
                      <div className="animate-pulse bg-slate-200 dark:bg-slate-600 h-6 w-16 rounded-full" />
                    </td>
                    <td className="table-td">
                      <div className="flex items-center space-x-1">
                        <div className="animate-pulse bg-slate-200 dark:bg-slate-600 h-8 w-8 rounded-lg" />
                        <div className="animate-pulse bg-slate-200 dark:bg-slate-600 h-8 w-8 rounded-lg" />
                        <div className="animate-pulse bg-slate-200 dark:bg-slate-600 h-8 w-8 rounded-lg" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : !filteredUseCases || filteredUseCases.length === 0 ? (
          <div className="text-center py-12">
            <Icon icon="heroicons-outline:folder-open" className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
              No use cases found
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Get started by creating a new use case.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  <th className="table-th w-12">#</th>
                  <th className="table-th">Name</th>
                  <th className="table-th">Category</th>
                  <th className="table-th">Prompt</th>
                  <th className="table-th w-28">Time</th>
                  <th className="table-th w-28">Status</th>
                  <th className="table-th w-32">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                {filteredUseCases.map((u, idx) => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                    <td className="table-td">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{idx + 1}</span>
                    </td>
                    <td className="table-td">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{u.name}</span>
                    </td>
                    <td className="table-td">
                      <span className="text-sm text-slate-700 dark:text-slate-300">{u?.category?.name || "-"}</span>
                    </td>
                    <td className="table-td">
                      <span className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{u.prompt}</span>
                    </td>
                    <td className="table-td">
                      <span className="text-sm text-slate-700 dark:text-slate-300">{u.time}</span>
                    </td>
                    <td className="table-td">{getStatusBadge(u.status)}</td>
                    <td className="table-td">
                      <div className="flex items-center space-x-1">
                        <div className="group relative">
                          <Button
                            icon="heroicons-outline:pencil"
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 border border-blue-200 hover:border-blue-300"
                            onClick={() => handleEdit(u)}
                          />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                            Edit Use Case
                          </div>
                        </div>
                        <div className="group relative">
                          <Button
                            icon={u.status === "active" ? "heroicons-outline:eye-slash" : "heroicons-outline:eye"}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 border ${
                              u.status === "active"
                                ? "bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700 border-amber-200 hover:border-amber-300"
                                : "bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 border-green-200 hover:border-green-300"
                            }`}
                            onClick={() => toggleStatusMutation.mutate(u.id)}
                          />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                            {u.status === "active" ? "Deactivate" : "Activate"}
                          </div>
                        </div>
                        <div className="group relative">
                          <Button
                            icon="heroicons-outline:trash"
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200 border border-red-200 hover:border-red-300"
                            onClick={() => handleDelete(u)}
                          />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                            Delete Use Case
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

      {/* Create Use Case Modal */}
      <Modal
        activeModal={isCreateModalOpen}
        onClose={handleCreateModalClose}
        title="Create New Use Case"
        className="max-w-2xl"
      >
        <form onSubmit={handleSubmit(onCreate)} className="space-y-4">
          <Textinput
            name="name"
            label="Name"
            placeholder="Enter use case name"
            register={register}
            error={formErrors.name}
          />

          <div className="fromGroup">
            <label className="form-label">Category</label>
            <Select
              name="category_id"
              register={register}
              options={categoryOptions}
              error={formErrors.category_id}
              disabled={isCategoriesLoading}
            />
          </div>

          <div className="fromGroup">
            <label className="form-label">Prompt</label>
            <Textarea
              name="prompt"
              register={register}
              placeholder="Enter the system prompt/instructions"
              rows={4}
              error={formErrors.prompt}
            />
          </div>

          <Textinput
            name="time"
            label="Time"
            placeholder="e.g. 20 min"
            register={register}
            error={formErrors.time}
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              text="Cancel"
              className="btn-outline-secondary hover:bg-slate-50 transition-all duration-200"
              onClick={handleCreateModalClose}
              type="button"
              disabled={createUseCaseMutation.isPending}
            />
            <Button
              text="Create Use Case"
              type="submit"
              className="btn-primary shadow-md hover:shadow-lg transition-all duration-200"
              isLoading={createUseCaseMutation.isPending}
              disabled={createUseCaseMutation.isPending}
            />
          </div>
        </form>
      </Modal>

      {/* Edit Use Case Modal */}
      <Modal
        activeModal={isEditModalOpen}
        onClose={handleEditModalClose}
        title="Edit Use Case"
        className="max-w-2xl"
      >
        <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
          <Textinput
            name="name"
            label="Name"
            placeholder="Enter use case name"
            register={register}
            error={formErrors.name}
          />

          <div className="fromGroup">
            <label className="form-label">Category</label>
            <Select
              name="category_id"
              register={register}
              options={categoryOptions}
              error={formErrors.category_id}
              disabled={isCategoriesLoading}
            />
          </div>

          <div className="fromGroup">
            <label className="form-label">Prompt</label>
            <Textarea
              name="prompt"
              register={register}
              placeholder="Enter the system prompt/instructions"
              rows={4}
              error={formErrors.prompt}
            />
          </div>

          <Textinput
            name="time"
            label="Time"
            placeholder="e.g. 20 min"
            register={register}
            error={formErrors.time}
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              text="Cancel"
              className="btn-outline-secondary hover:bg-slate-50 transition-all duration-200"
              onClick={handleEditModalClose}
              type="button"
              disabled={updateUseCaseMutation.isPending}
            />
            <Button
              text="Update Use Case"
              type="submit"
              className="btn-primary shadow-md hover:shadow-lg transition-all duration-200"
              isLoading={updateUseCaseMutation.isPending}
              disabled={updateUseCaseMutation.isPending}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RolePlayUseCases;