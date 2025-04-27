/**
 * This file provides simplified type aliases to fix TypeScript errors
 * related to React component types
 */

import { ReactElement, FC } from 'react';

/**
 * Use this type to annotate React component return values
 * instead of JSX.Element or React.ReactElement
 */
export type ReactComponent = any;

/**
 * Use this type to annotate React functional components
 * instead of React.FC
 */
export type Component<P = {}> = (props: P) => ReactComponent; 