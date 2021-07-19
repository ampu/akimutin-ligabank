const Viewport = {
  TABLET: 768,
  MIN_DESKTOP: 1024,
};

export const MediaQuery = {
  TABLET: `(min-width: ${Viewport.TABLET}px) and (max-width: ${Viewport.MIN_DESKTOP - 1}px)`,
  TABLET_MOBILE: `(max-width: ${Viewport.MIN_DESKTOP - 1}px)`,
  MOBILE: `(max-width: ${Viewport.TABLET - 1}px)`,
};
