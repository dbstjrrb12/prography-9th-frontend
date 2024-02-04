import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { PropsWithChildren, ReactElement } from 'react';

import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary as ReactErroBoundary } from 'react-error-boundary';

type Props = PropsWithChildren<{
  fallbackRender: (props: FallbackProps) => ReactElement;
}>;

const QueryErrorBoundary = ({ fallbackRender, children }: Props) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErroBoundary onReset={reset} fallbackRender={fallbackRender}>
          {children}
        </ReactErroBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default QueryErrorBoundary;
