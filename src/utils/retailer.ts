import { generateRandomHexColor } from ".";

export const getLabelColors = (labels: string[]) => {
  const labelColors = labels.reduce((acc, cur) => {
    acc[cur] = generateRandomHexColor();
    return acc;
  }, {} as { [name: string]: string });
  return labelColors;
};
