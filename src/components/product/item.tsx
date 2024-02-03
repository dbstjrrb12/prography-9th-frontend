import Flex from '@components/common/flex';
import Image from '@components/common/image';

type Props = {
  title: string;
  media: {
    url: string;
    lazy?: boolean;
  };
  className?: string;
};

const ProductItem = ({ title, media: { url, lazy }, className }: Props) => {
  return (
    <Flex className={className}>
      <Flex.Col>
        <Image src={url} lazy={lazy} className="flex-auto rounded-lg" />
        <p className="">{title}</p>
      </Flex.Col>
    </Flex>
  );
};

export default ProductItem;
