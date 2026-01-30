export function getLayers() {
  const layers = Array.from(
    document.querySelectorAll<HTMLElement>('[data-layer]'),
  );

  return layers.sort((a, b) => {
    const aDepth = Number(a.dataset.layerDepth) || 0;
    const bDepth = Number(b.dataset.layerDepth) || 0;
    return aDepth - bDepth; // ascending
  });
}
