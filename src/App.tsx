import { Suspense } from 'react';
import CategoryList from '@components/category';
import Layout from '@components/common/layout';
import Flex from '@components/common/flex';
import CategoryLoader from './components/loader/category/loader';

function App() {
  return (
    <Layout>
      <Flex>
        <Flex.Row>
          <Suspense fallback={<CategoryLoader />}>
            <CategoryList />
          </Suspense>
        </Flex.Row>
      </Flex>
    </Layout>
  );
}

export default App;
