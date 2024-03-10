import BestSellerItem, { BestSellerItemType } from "./best-seller-item";

type GridColsType = {
  bestSellers: BestSellerItemType[];
};

export default function GridThreeCols({ bestSellers }: GridColsType) {
  return (
    <div
      className={"grid max-my-450:grid-cols-1 max-lg:grid-cols-2 grid-cols-3"}
    >
      {bestSellers.map((item, index) => {
        return (
          <BestSellerItem
            key={index}
            href={item.href}
            title={item.title}
            price={item.price}
            images={item.images}
          />
        );
      })}
    </div>
  );
}
