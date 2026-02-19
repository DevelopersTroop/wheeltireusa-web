// `span` is the CSS grid-area name for each banner slot.
// It is the only positional data we store — no width/height needed because
// the CSS drives all sizing via fixed row heights (desktop) and aspect-ratio
// (mobile).
export type BannerSpan =
  | "top-center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-center-left"
  | "bottom-center-right"
  | "bottom-right";

export interface PromoBanner {
  id: string;
  href: string;
  src: string;
  alt: string;
  span: BannerSpan;
}