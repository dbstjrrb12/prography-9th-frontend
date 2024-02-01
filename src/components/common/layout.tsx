import { PropsWithChildren } from 'react';

import Image from '@components/common/image';

import cn from '@utils/cn';

import logoImage from '@public/logo.png';

interface Props extends PropsWithChildren {
  className?: string;
}

const Layout = ({ className, children }: Props) => {
  return (
    <div className={cn('w-[100vw] px-20', className)}>
      <header className="w-full pt-12 pb-8">
        <Image
          src={logoImage}
          alt="프로그라피 로고"
          width={134}
          height={48}
          lazy={false}
        />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
