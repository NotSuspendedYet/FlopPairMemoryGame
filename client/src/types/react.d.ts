declare module 'react' {
  export interface ReactNode {}
  
  // Add ReactElement interface with generic parameters for better typing
  export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: any;
  }
  
  // Add JSXElementConstructor interface
  export interface JSXElementConstructor<P> {
    (props: P): ReactElement<any, any> | null;
  }

  // Fix FC definition to properly handle JSX.Element
  export interface FC<P = {}> {
    (props: P): ReactElement<P> | null;
    displayName?: string;
    defaultProps?: Partial<P>;
    propTypes?: any;
  }

  // Add missing React exports
  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function createContext<T>(defaultValue: T): React.Context<T>;
  export function useContext<T>(context: React.Context<T>): T;
  
  export interface Context<T> {
    Provider: Provider<T>;
    Consumer: Consumer<T>;
  }
  export interface Provider<T> {
    new (props: { value: T; children?: ReactNode }): ReactElement;
  }
  export interface Consumer<T> {
    new (props: { children: (value: T) => ReactNode }): ReactElement;
  }
  
  // Add StrictMode
  export const StrictMode: React.FC<{ children?: ReactNode }>;
  
  // Add event types
  export interface ChangeEvent<T = Element> {
    target: T & {
      value: string;
      name: string;
      checked?: boolean;
    };
    currentTarget: T & {
      value: string;
      name: string;
      checked?: boolean;
    };
    preventDefault(): void;
    stopPropagation(): void;
  }
  
  export interface FormEvent<T = Element> {
    target: T;
    currentTarget: T;
    preventDefault(): void;
    stopPropagation(): void;
  }
}

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface Element extends React.ReactElement {}
  }
  export function jsx(type: any, props: any): JSX.Element;
  export function jsxs(type: any, props: any): JSX.Element;
} 