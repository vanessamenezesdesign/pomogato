import type { Meta, StoryObj } from "@storybook/react";
import Timer from "../components/Timer";

const meta: Meta<typeof Timer> = {
  title: "Pomogato/Timer", // grupo Pomogato na barra lateral
  component: Timer,
  tags: ["autodocs"],
  // Timer não recebe props externas — controla tudo internamente
  // então as histórias mostram o componente completo em diferentes contextos
  parameters: {
    // ocupa a tela inteira no Storybook para ficar igual ao app
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Timer>;

// Timer completo — estado inicial do app
export const Default: Story = {};
