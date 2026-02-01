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

export function isLayerPaused(element: HTMLElement) {
  const layerDepth = parseInt(element.dataset.layerDepth || '0', 10);

  const nextHigherLayer = document.querySelector<HTMLElement>(
    `[data-layer-depth="${layerDepth + 1}"]`,
  );

  if (nextHigherLayer) return true;

  return false;
}
