import cn from '@utils/cn';
import Image from '@components/common/image';
import Flex from '../common/flex';

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
    <Flex col className={cn(className)}>
      <Image src={url} lazy={lazy} className="flex-auto rounded-lg object-fill aspect-square" />
      <p className="">{title}</p>
    </Flex>
  );
};

export default ProductItem;
