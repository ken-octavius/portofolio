function getNavbarEl() {
  return document.querySelector('header');
}

export function getNavbarBottom() {
  const nav = getNavbarEl();
  return nav ? nav.getBoundingClientRect().bottom : 0;
}

export function isPointerOverNavbar(clientX, clientY) {
  const nav = getNavbarEl();
  if (!nav) return clientY < 0;
  const rect = nav.getBoundingClientRect();
  return (
    clientY >= rect.top &&
    clientY <= rect.bottom &&
    clientX >= rect.left &&
    clientX <= rect.right
  );
}

export function isPointerInsidePlayArea(clientX, clientY, playEl) {
  if (!playEl) return false;
  const rect = playEl.getBoundingClientRect();
  const top = Math.max(rect.top, getNavbarBottom());
  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= top &&
    clientY <= rect.bottom
  );
}

export function isPointerInsideSection(clientX, clientY, sectionId) {
  const section = document.querySelector(sectionId);
  if (!section) return false;
  const rect = section.getBoundingClientRect();
  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  );
}

/**
 * Hitung rentang translate3d agar kartu tetap di dalam play area,
 * dan tidak masuk ke belakang navbar.
 */
export function getDragTranslateBounds({
  startPosX,
  startPosY,
  cardRect,
  areaRect,
  extraLeft = 0,
  extraRight = 0,
  extraTop = 0,
  extraBottom = 0,
}) {
  const topLimit = Math.max(areaRect.top, getNavbarBottom()) + extraTop;
  const minX = startPosX - (cardRect.left - areaRect.left - extraLeft);
  const maxX = startPosX + (areaRect.right - cardRect.right - extraRight);
  const minY = startPosY - (cardRect.top - topLimit);
  const maxY = startPosY + (areaRect.bottom - cardRect.bottom - extraBottom);

  return {
    minX: Math.min(minX, maxX),
    maxX: Math.max(minX, maxX),
    minY: Math.min(minY, maxY),
    maxY: Math.max(minY, maxY),
  };
}

export function clampTranslate(x, y, bounds) {
  return {
    x: Math.max(bounds.minX, Math.min(bounds.maxX, x)),
    y: Math.max(bounds.minY, Math.min(bounds.maxY, y)),
  };
}
