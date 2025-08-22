import React, { useState } from "react";
import InputField from "./components/InputFields/InputField";
import DataTable, { type Column } from "./components/DataTables/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  status?: string;
  joinDate?: string;
}

// ✅ Sample data rows
const sampleData: User[] = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    role: "User",
    status: "inactive",
    joinDate: "2023-02-20",
  },
  {
    id: 3,
    name: "Charlie",
    email: "charlie@example.com",
    role: "Editor",
    status: "active",
    joinDate: "2023-03-10",
  },
];

// ✅ Columns configuration
const columns: Column<User>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
  { key: "role", title: "Role", dataIndex: "role" },
  { key: "status", title: "Status", dataIndex: "status" },
  { key: "joinDate", title: "Join Date", dataIndex: "joinDate" },
];

const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  return (
    <div className="p-6 flex flex-col gap-8 max-w-3xl mx-auto">
      {/* 🔹 InputField Demo */}
      <section className="p-4 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">InputField Demo</h2>
        <InputField
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          helperText="This is a reusable input field"
          variant="outlined"
          size="md"
        />
        <p className="mt-2 text-gray-600">Current value: {username}</p>
      </section>

      {/* 🔹 DataTable Demo */}
      <section className="p-4 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">DataTable Demo</h2>
        <DataTable<User>
          data={sampleData}
          columns={columns}
          selectable
          onRowSelect={(rows) => setSelectedUsers(rows)}
        />
        {selectedUsers.length > 0 && (
          <p className="mt-3 text-red-600 font-medium">
            Selected Users: {selectedUsers.map((u) => u.name).join(", ")}
          </p>
        )}
      </section>
    </div>
  );
};

export default App;
