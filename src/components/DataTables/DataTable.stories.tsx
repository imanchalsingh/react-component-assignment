import type { Meta, StoryObj } from "@storybook/react-vite";
import DataTable, { type Column } from "./DataTable";
import { useState } from "react";

// Sample type
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
}

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

// Sample data
const users: User[] = [
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

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
  { key: "role", title: "Role", dataIndex: "role", sortable: true },
  { key: "status", title: "Status", dataIndex: "status", sortable: true },
  {
    key: "joinDate",
    title: "Join Date",
    dataIndex: "joinDate",
    sortable: true,
  },
];

export const Basic: Story = { args: { data: users, columns } };

export const Selectable: Story = {
  args: { data: users, columns, selectable: true },
};

export const Loading: Story = { args: { data: [], columns, loading: true } };

export const Empty: Story = { args: { data: [], columns } };

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<User[]>([]);
    return (
      <div>
        <DataTable
          data={users}
          columns={columns}
          selectable
          onRowSelect={setSelected}
        />
        {selected.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h3 className="font-medium">Selected Users:</h3>
            <ul className="list-disc list-inside mt-2">
              {selected.map((u) => (
                <li key={u.id}>
                  {u.name} ({u.email})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};
