import Layout from '@components/common/layout';
import ProductsGrid from '@components/product';
import Flex from './components/common/flex';
import Category from './components/category';

function App() {
  const { layoutStyle } = classNames;

  return (
    <Layout className={layoutStyle}>
      <Flex className="gap-5">
        <Category />
        <ProductsGrid />
      </Flex>
    </Layout>
  );
}

const classNames = {
  layoutStyle: 'px-10 md:px-20 max-w-[1280px] m-auto',
};

export default App;
