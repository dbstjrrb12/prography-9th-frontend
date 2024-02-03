import { ReactElement, ReactNode, isValidElement } from 'react';

const isReactElementWithName = <T>(name: string) => {
  return (element: ReactNode): element is ReactElement<T> => {
    return (
      isValidElement<T>(element) &&
      typeof element.type === 'function' &&
      element.type.name === name
    );
  };
};

export { isReactElementWithName };
