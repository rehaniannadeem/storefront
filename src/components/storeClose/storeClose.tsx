import Image from "next/image";
// import { IoHomeSharp } from "react-icons/io5";
import Text from "@components/ui/text";
// import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";
import closeStore from '../../../public/store-close.svg'
import 'reactjs-popup/dist/index.css';



const ErrorInformation = ({ business }: any) => {
    
    const { t } = useTranslation("common");
    
    return (
        <div className="border-t border-b border-gray-300 text-center px-16 py-16 sm:py-20 lg:py-24 xl:py-32 flex flex-col items-center justify-center">
            <div>
                <Text variant="mediumHeading">{business + " "}{t("currently-close")} </Text>
            </div>
            <div>
                <Image
                    src={closeStore}
                    alt={t("error-heading")}
                    width={200}
                    height={200}
                />

                <Text variant="mediumHeading">{t("close-message")}</Text>
                
               
            </div>
        </div>
    );
};

export default ErrorInformation;
