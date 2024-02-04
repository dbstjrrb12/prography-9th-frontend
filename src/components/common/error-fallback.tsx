import cn from '@utils/cn';
import type { FallbackProps } from 'react-error-boundary';

type Props = {
  className?: string;
  resetErrorBoundary: FallbackProps['resetErrorBoundary'];
};

const ErrorFallback = ({ resetErrorBoundary, className }: Props) => {
  return (
    <div
      className={cn(
        'w-full flex flex-col justify-center items-center space-y-2 bg-gray-100',
        className
      )}
    >
      <p className="text-center text-sm md:text-base">에러가 발생했습니다</p>
      <button
        onClick={resetErrorBoundary}
        className="bg-black text-white w-[90%] max-w-[250px] px-1 py-2 rounded text-xs md:text-sm"
      >
        다시 호출하기
      </button>
    </div>
  );
};

export default ErrorFallback;
