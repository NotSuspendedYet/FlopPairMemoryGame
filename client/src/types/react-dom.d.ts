declare module 'react-dom/client' {
  import { ReactNode } from 'react';
  
  export interface Root {
    render(element: ReactNode): void;
    unmount(): void;
  }
  
  export function createRoot(container: HTMLElement): Root;
}

declare module 'react-dom' {
  import { ReactNode } from 'react';
  
  export function render(element: ReactNode, container: HTMLElement): void;
  export function unmountComponentAtNode(container: HTMLElement): boolean;
} 