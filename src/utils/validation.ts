import { ReactElement, ReactNode, isValidElement } from 'react';

const isReactElementWithName = (name: string) => {
  return (element: ReactNode): element is ReactElement => {
    return (
      isValidElement(element) &&
      typeof element.type === 'function' &&
      element.type.name === name
    );
  };
};

export { isReactElementWithName };
