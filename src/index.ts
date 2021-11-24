export function createCanvas(width: number, height: number) {
  const canvas = document.createElement('canvas');
  canvas.style.display = 'block';
  canvas.width = width;
  canvas.height = height;
  globalThis.context = canvas.getContext('2d')!;
}

