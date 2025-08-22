import type { Meta, StoryObj } from "@storybook/react-vite";
import InputField from "./InputField";
import { useState } from "react";
import { useArgs } from "storybook/internal/preview-api";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Playground: Story = {
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();

    return (
      <InputField
        {...args}
        value={value}
        onChange={(e) => updateArgs({ value: e.target.value })}
      />
    );
  },
  args: {
    type: "text",
    label: "Username",
    placeholder: "Enter your username",
    value: "",
    helperText: "Please enter your username",
  },
};

export const WithValue: Story = {
  args: {
    label: "Email",
    value: "john.doe@example.com",
    placeholder: "Enter your email",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    value: "invalid-email",
    error: "Please enter a valid email address",
    invalid: true,
  },
};

export const Disabled: Story = {
  args: { label: "Disabled Field", value: "Cannot edit this", disabled: true },
};

export const Loading: Story = {
  args: { label: "Loading Field", value: "Loading content...", loading: true },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    value: "secret123",
    placeholder: "Enter your password",
  },
};

export const FilledVariant: Story = {
  args: {
    label: "Filled Input",
    variant: "filled",
    value: "",
    placeholder: "This is a filled input",
  },
};

export const GhostVariant: Story = {
  args: {
    label: "Ghost Input",
    variant: "ghost",
    value: "",
    placeholder: "This is a ghost input",
  },
};

export const SmallSize: Story = {
  args: {
    label: "Small Input",
    size: "sm",
    value: "",
    placeholder: "Small input field",
  },
};
export const LargeSize: Story = {
  args: {
    label: "Large Input",
    size: "lg",
    value: "",
    placeholder: "Large input field",
  },
};

// Interactive example
const InteractiveInput = () => {
  const [value, setValue] = useState("");
  return (
    <InputField
      label="Interactive Input"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type something..."
      helperText="This input is interactive"
      size="md"
    />
  );
};

export const InteractiveExample: Story = { render: () => <InteractiveInput /> };
