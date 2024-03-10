import Link from "next/link";
import Image from "next/image";

type CategoryItemType = {
  href: string;
  title: string;
  imagePath: string;
};

export default function CategoryItem({
  title,
  imagePath,
  href,
}: CategoryItemType) {
  return (
    // max-my-380:w-full max-my-660:w-32 max-lg:w-40
    <Link className={"flex flex-col w-full px-4"} href={href}>
      {/* max-my-380:h-60 max-my-660:h-32 max-lg:h-40 */}
      <div
        className={
          "relative w-full max-my-350:h-52 max-my-500:h-40 h-52 bg-categoryBackground"
        }
      >
        <Image fill src={imagePath} alt={"Image of a category"} />
      </div>

      <p className={"text-center py-4"}>{title}</p>
    </Link>
  );
}
