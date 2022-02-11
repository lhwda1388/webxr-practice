declare module "*.glsl" {
  const source: string;
  export default source;
}

declare global {
  interface Window {
    clientWidth: number;
    offsetWidth: number;
  }
}
