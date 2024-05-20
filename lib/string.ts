export const KbpsToMbpsString = (kbps: number): string => {
  return `${(kbps / 1000).toFixed(2)} Mbps`;
};
