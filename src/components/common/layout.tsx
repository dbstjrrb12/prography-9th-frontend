import { PropsWithChildren } from 'react';

import Image from '@components/common/image';

import cn from '@utils/cn';

import logoImage from '@assets/image/logo.png?url';

interface Props extends PropsWithChildren {
  className?: string;
}

const Layout = ({ className, children }: Props) => {
  return (
    <div className={cn('w-[100vw] px-20', className)}>
      <header className="w-full pt-12 pb-8 fixed bg-white z-10">
        <Image src={logoImage} alt="프로그라피 로고" width={134} height={48} lazy={false} />
      </header>
      <main className="pt-top-header">{children}</main>
    </div>
  );
};

export default Layout;
