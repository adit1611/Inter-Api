import React, { useEffect, useState } from "react";
import axios from "axios";
import EditUserForm from "./EditUserForm"; // Edit form for editing user details
import NewUserForm from "./NewUserForm";  // New form for adding user details

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // State to track the user being edited
  const [addingUser, setAddingUser] = useState(false);  // State to track if a new user is being added

  // Fetch users from the API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Handle delete user function
  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(() => setUsers(users.filter((user) => user.id !== userId)))
        .catch((error) => console.error("Error deleting user:", error));
    }
  };

  // Handle edit user (open edit form)
  const handleEdit = (user) => {
    setEditingUser(user); // Set the selected user for editing
  };

  // Handle update user
  const handleUpdateUser = (updatedUser) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser)
      .then((response) => {
        setUsers(users.map((user) => (user.id === updatedUser.id ? response.data : user)));
        setEditingUser(null); // Close the edit form
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  // Handle add new user
  const handleAddUser = (newUser) => {
    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setAddingUser(false); // Close the add new user form
      })
      .catch((error) => console.error("Error adding user:", error));
  };

  return (
    <div className="container mx-auto py-8 px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-6">Users List</h2>

      {/* Add New User Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 sm:px-4 rounded shadow-md transition duration-300 ease-in-out"
          onClick={() => setAddingUser(true)} // Open add user form
        >
          Add New User
        </button>
      </div>

      {/* Render the user table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-purple-200 dark:bg-purple-600 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-blue-400 text-white dark:text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg leading-normal">
              <th className="py-2 px-2 sm:py-3 sm:px-4 text-left">Name</th>
              <th className="py-2 px-2 sm:py-3 sm:px-4 text-left">Email</th>
              <th className="py-2 px-2 sm:py-3 sm:px-4 text-left">Phone</th>
              <th className="py-2 px-2 sm:py-3 sm:px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b border-gray-200 dark:border-gray-700 hover:bg-sky-500 dark:hover:bg-sky-600 ${
                  index % 2 === 0 ? "bg-[#16a085] dark:bg-purple-800" : "bg-white dark:bg-gray-800"
                }`}
              >
                <td className="py-2 px-2 sm:py-3 sm:px-4 text-left whitespace-nowrap">{user.name}</td>
                <td className="py-2 px-2 sm:py-3 sm:px-4 text-left">{user.email}</td>
                <td className="py-2 px-2 sm:py-3 sm:px-4 text-left">{user.phone}</td>
                <td className="py-2 px-2 sm:py-3 sm:px-4">
                  <button
                    className="text-violet-800 dark:text-rose-600 hover:underline hover:text-blue-700 dark:hover:text-blue-500 transition duration-200"
                    onClick={() => handleEdit(user)} // Call handleEdit with the selected user
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 dark:text-red-300 hover:underline hover:text-red-700 dark:hover:text-red-500 transition duration-200 ml-4"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render the edit form if a user is being edited */}
      {editingUser && (
        <EditUserForm
          user={editingUser}
          onUpdateUser={handleUpdateUser} // Pass the update function to the form
          onCancel={() => setEditingUser(null)} // Handle cancel
        />
      )}

      {/* Render the add new user form if adding a new user */}
      {addingUser && (
        <NewUserForm
          onAddUser={handleAddUser}  // Pass the add user function to the form
          onCancel={() => setAddingUser(false)} // Handle cancel
        />
      )}
    </div>
  );
};

export default UserList;
