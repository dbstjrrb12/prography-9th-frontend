import { Suspense } from 'react';
import CategoryList from '@components/category';
import Layout from '@components/common/layout';
import CategoryLoader from '@components/loader/category/loader';
import ProductsGrid from '@components/product';
import Flex from './components/common/flex';

function App() {
  const { layoutStyle, categoryStyle } = classNames;

  return (
    <Layout className={layoutStyle}>
      <Flex className="gap-5">
        <div className="flex-auto">
          <div className="h-[calc(100vh-150px)] overflow-hidden">
            <Suspense fallback={<CategoryLoader />}>
              <CategoryList className={categoryStyle} />
            </Suspense>
          </div>
        </div>

        <ProductsGrid />
      </Flex>
    </Layout>
  );
}

const classNames = {
  layoutStyle: 'px-10 md:px-20 max-w-[1280px] m-auto',
  categoryStyle: 'h-full pt-1 overflow-scroll',
};

export default App;
