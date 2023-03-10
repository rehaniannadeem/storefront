import Link from "@components/ui/link";
import Image from "next/image";
import Text from "@components/ui/text";
import { FaLink } from "react-icons/fa";
import { LinkProps } from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router';

interface Props {
  item: any;
  variant?: "rounded" | "circle";
  size?: "small" | "medium";
  effectActive?: boolean;
  href: LinkProps["href"];
}

const Card: React.FC<Props> = ({
  item,
  variant = "circle",
  size = "small",
  effectActive = false,
  href,
}) => {
  const { name, image } = item ?? {};
  const imageSize: any =
    (size === "small" && 180) || (size === "medium" && 198);

  const placeholderImage = "/icons/ignite-default.png";
  const { t } = useTranslation("common");
const {locale}=useRouter()


  return (
    <Link
      href={href}
      className="group flex justify-center text-center flex-col "
    >
      <div
        className={`relative inline-flex mb-3.5 md:mb-4 lg:mb-5 xl:mb-6 mx-auto ${
          variant === "rounded" ? "rounded-md" : "rounded-full"
        }`}
      >
        <div className="relative inline-flex items-center mb-3.5 md:mb-4 lg:mb-5 xl:mb-2 2xl:mb-6 3xl:mb-8 mx-auto :h-24">
          <Image
            src={image ?? placeholderImage}
            // src={"/icons/apple-icon-180.png"}
            alt={name || t("text-card-thumbnail")}
            width={imageSize}
            height={imageSize}
            quality={100}
            className={`object-contain  ${
              variant === "rounded" ? "rounded-md" : "rounded-full"
            }`}
          />
        </div>
        {effectActive === true && (
          <>
            <div
              className={`absolute top left bg-black w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-30 ${
                variant === "rounded" ? "rounded-md" : "rounded-full"
              }`}
            />
            <div className="absolute top left h-full w-full flex items-center justify-center">
              <FaLink className="text-white text-base sm:text-xl lg:text-2xl xl:text-3xl transform opacity-0 scale-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100 " />
            </div>
          </>
        )}
      </div>
      <Text variant="heading" className="capitalize">
      {locale==='ar' && item?.arabic_name ? item?.arabic_name : name}
       
      </Text>
    </Link>
  );
};

export default Card;
