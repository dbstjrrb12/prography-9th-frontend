import { Suspense } from 'react';
import CategoryList from '@components/category';
import Layout from '@components/common/layout';
import Flex from '@components/common/flex';
import CategoryLoader from '@components/loader/category/loader';
import ProductsGrid from '@components/product';

function App() {
  const { layoutStyle, categoryStyle } = classNames;

  return (
    <Layout className={layoutStyle}>
      <Flex className="flex gap-5">
        <Flex.Row>
          <div className="flex-auto">
            <div className="h-[calc(100vh-150px)] overflow-hidden">
              <Suspense fallback={<CategoryLoader />}>
                <CategoryList className={categoryStyle} />
              </Suspense>
            </div>
          </div>

          <ProductsGrid />
        </Flex.Row>
      </Flex>
    </Layout>
  );
}

const classNames = {
  layoutStyle: 'px-10 md:px-20 max-w-[1280px] m-auto',
  categoryStyle: 'h-full pt-1 overflow-scroll',
};

export default App;
