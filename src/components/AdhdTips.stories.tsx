import type { Meta, StoryObj } from "@storybook/react";
import AdhdTips from "../components/AdhdTips";

const meta: Meta<typeof AdhdTips> = {
  title: "Pomogato/AdhdTips", // grupo Pomogato na barra lateral
  component: AdhdTips,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AdhdTips>;

// Exibe todas as dicas — componente não tem props, então só uma história basta
export const Default: Story = {};
