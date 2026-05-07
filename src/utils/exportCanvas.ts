export const saveAsWallpaper = (canvas: HTMLCanvasElement, mood: string) => {
  const link = document.createElement('a');
  link.download = `mood-universe-${mood}-${new Date().getTime()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};
