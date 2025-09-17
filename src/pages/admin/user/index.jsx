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
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";

import { userService } from "@/services/userService";

// Minimal validation for edit form (adjust fields as your API supports)
const userSchema = yup
  .object({
    name: yup.string().required("Name is required").min(2).max(100),
    email: yup.string().email("Invalid email").required("Email is required"),
    status: yup.string().oneOf(["active", "inactive"]).required(),
  })
  .required();

const Users = () => {
  const queryClient = useQueryClient();

  // UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users
  const {
    data: usersResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: () => userService.getUsers(),
  });

  const users = usersResponse?.data || [];

  // Edit form
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(userSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      status: "active",
    },
  });

  // Mutations
  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }) => userService.updateUser(id, data),
    onSuccess: (response) => {
      toast.success(response.message || "User updated successfully");
      setIsEditModalOpen(false);
      setSelectedUser(null);
      reset();
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      toast.error(
        error?.response?.data?.message || error?.message || "Failed to update user"
      );
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: (response) => {
      toast.success(response.message || "User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
      toast.error(
        error?.response?.data?.message || error?.message || "Failed to delete user"
      );
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: userService.toggleUserStatus,
    onSuccess: (response, userId) => {
      const u = users.find((x) => x.id === userId);
      const statusText = u?.status === "active" ? "deactivated" : "activated";
      toast.success(response.message || `User ${statusText} successfully`);
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
    onError: (error) => {
      console.error("Error toggling user status:", error);
      toast.error(
        error?.response?.data?.message || error?.message || "Failed to toggle status"
      );
    },
  });

  // Handlers
  const handleEdit = (user) => {
    setSelectedUser(user);
    setValue("name", user.name || "");
    setValue("email", user.email || "");
    setValue("status", user.status || "active");
    setIsEditModalOpen(true);
  };

  const handleUpdate = (data) => {
    if (!selectedUser) return;
    updateUserMutation.mutate({ id: selectedUser.id, data });
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: "Delete User",
      text: `Are you sure you want to delete "${user.name}"? This action cannot be undone.`,
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
        deleteUserMutation.mutate(user.id);
      }
    });
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
    reset();
  };

  const getStatusBadge = (status) =>
    status === "active" ? (
      <Badge label="Active" className="bg-success-500" />
    ) : (
      <Badge label="Inactive" className="bg-warning-500" />
    );

  // Filter
  const filteredUsers = (users || []).filter((u) => {
    const hay = `${u.name ?? ""} ${u.email ?? ""}`.toLowerCase();
    return hay.includes(searchTerm.toLowerCase());
  });

  const statusOptions = useMemo(
    () => [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
    []
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Users
          </h1>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-400">
            Manage application users
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error.message || "Failed to fetch users"}</span>
        </div>
      )}

      {/* Search */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex-1 max-w-md">
            <Textinput
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon="heroicons-outline:search"
            />
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
              <Icon icon="heroicons-outline:collection" className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {filteredUsers.length}
                {searchTerm ? ` of ${users.length}` : ""} user{filteredUsers.length === 1 ? "" : "s"}
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
        {isLoading ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  <th className="table-th w-12">#</th>
                  <th className="table-th">Name</th>
                  <th className="table-th">Email</th>
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
        ) : !filteredUsers || filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <Icon icon="heroicons-outline:users" className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">No users found</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Try adjusting your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  <th className="table-th w-12">#</th>
                  <th className="table-th">Name</th>
                  <th className="table-th">Email</th>
                  <th className="table-th w-28">Status</th>
                  <th className="table-th w-32">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                {filteredUsers.map((u, idx) => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                    <td className="table-td">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{idx + 1}</span>
                    </td>
                    <td className="table-td">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{u.name}</span>
                    </td>
                    <td className="table-td">
                      <span className="text-sm text-slate-700 dark:text-slate-300">{u.email}</span>
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
                            Edit User
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
                            Delete User
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

      {/* Edit User Modal */}
      <Modal
        activeModal={isEditModalOpen}
        onClose={handleModalClose}
        title="Edit User"
        className="max-w-lg"
      >
        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
          <Textinput
            name="name"
            label="Name"
            placeholder="Enter full name"
            register={register}
            error={formErrors.name}
          />

          <Textinput
            name="email"
            label="Email"
            placeholder="Enter email"
            register={register}
            error={formErrors.email}
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

          <div className="flex justify-end space-x-3 pt-2">
            <Button
              text="Cancel"
              className="btn-outline-secondary"
              onClick={handleModalClose}
              type="button"
              disabled={updateUserMutation.isPending}
            />
            <Button
              text="Update User"
              type="submit"
              className="btn-primary"
              isLoading={updateUserMutation.isPending}
              disabled={updateUserMutation.isPending}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Users;