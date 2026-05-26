import type { Meta, StoryObj } from "@storybook/react";
import CatAvatar from "../components/CatAvatar";

const meta: Meta<typeof CatAvatar> = {
  title: "Pomogato/CatAvatar", // grupo Pomogato na barra lateral
  component: CatAvatar,
  tags: ["autodocs"],
  // define os controles que aparecem no painel inferior do Storybook
  argTypes: {
    mood: {
      control: "select",
      options: ["idle", "focus", "break", "sleep"],
      description: "Estado de humor do gato",
    },
    isRunning: {
      control: "boolean",
      description: "Se o timer está rodando",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CatAvatar>;

// Gato esperando — estado inicial do app
export const Idle: Story = {
  args: { mood: "idle", isRunning: false },
};

// Gato focado com timer rodando
export const Focando: Story = {
  args: { mood: "focus", isRunning: true },
};

// Gato em pausa
export const EmPausa: Story = {
  args: { mood: "break", isRunning: false },
};

// Gato dormindo após sessão longa
export const Dormindo: Story = {
  args: { mood: "sleep", isRunning: false },
};
