import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TaskInput from "../components/TaskInput";

const meta: Meta<typeof TaskInput> = {
  title: "Pomogato/TaskInput", // aparece assim na barra lateral do Storybook
  component: TaskInput,
  tags: ["autodocs"], // gera documentação automática
};

export default meta;
type Story = StoryObj<typeof TaskInput>;

// História 1: campo vazio (estado inicial)
export const Vazio: Story = {
  args: {
    value: "",
    onChange: () => {},
  },
};

// História 2: campo com tarefa preenchida
export const ComTarefa: Story = {
  args: {
    value: "Estudar capítulo 3 de Matemática",
    onChange: () => {},
  },
};

// História 3: interativo — você consegue digitar no Storybook
export const Interativo: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return <TaskInput value={value} onChange={setValue} />;
  },
};
