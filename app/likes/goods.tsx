import { COLORS } from "@/public/styles/colors";
import { styled } from "styled-components";
import { IconBookmark } from "../components/icons";
import { ProductType } from "@/public/utils/types";
import Link from "next/link";
import { KRWLocaleString } from "@/public/utils/function";

interface GoodsProps {
  values: ProductType[];
}

const Goods: React.FC<GoodsProps> = ({ values }) => {
  return (
    <Grid>
      {values.map((value: ProductType, index: number) => (
        <Stuff
          key={index}
          href={`product/${value.id}`}>

          <ProductThumbnail>
            <ProductThumbnailImage
              src={value.thumbnail}
            />
            <ProductBookmark onClick={(event) => {
              event.stopPropagation();
              // handleBookmarkClick(item.id);
            }} >
              <IconBookmark
                color={value.isSaved ? COLORS.mainColor : COLORS.greyColor}
                width={undefined}
                height={16} />
            </ProductBookmark>
          </ProductThumbnail>
          <ProductTitle>
            {value.brandFK.name}
          </ProductTitle>
          <ProductPrice>
            {value.name}
          </ProductPrice>

        </Stuff>
      ))}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 한 줄에 3개의 열 */
  column-gap: 8px;
  row-gap: 20px;
`;

const Stuff = styled(Link)`
  cursor: pointer;
  position: relative;

  flex: 0 0 calc(50% - 12px);
  margin-bottom: 20px;
  

  @media (min-width: 768px) {
    flex: 0 0 calc(33.333% - 12px); 
  };
`;

const ProductThumbnail = styled.div`
  position: relative;
  margin-bottom: 8px;
`;


const ProductThumbnailImage = styled.img`
  width: 100%; 
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductBookmark = styled.div`
  position: absolute;
  bottom: 13px;
  right: 12px;
`;

const ProductTitle = styled.h3`
  word-break: break-all;
  white-space: normal;

  font-size: 14px;
  font-weight: 500;

  font-weight: 500;
  margin-bottom: 4px;
`;

const ProductPrice = styled.span`
  font-weight: 500;
  font-size: 14px;
`;


export default Goods;
