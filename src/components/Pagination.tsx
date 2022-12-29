import _ from "lodash";
import { useContext } from "react";
import { Context } from "src/pages/_app";

interface Props {
  items: any;
  pageSize: any;
  currentPage: any;
  onPageChange: Function;
}

const Pagination: React.FC<Props> = ({
  items,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const pageCount = items / pageSize;
  if (Math.ceil(pageCount) === 1) return null;
  const pages = _.range(1, pageCount + 1);
  const { domain }: any = useContext(Context);

  return (
    <>
      <nav className="flex">
        <ul>
          {pages?.map((page, index) => (
            <li
              className="inline-flex mt-2 ml-1"
              key={index}
              style={
                page == currentPage
                  ? {
                      backgroundColor: domain.theme_color,
                      color: "white",
                    }
                  : {
                      backgroundColor: "white",
                      color: "black",
                    }
              }
            >
              <a
                style={{ cursor: "pointer" }}
                onClick={() => onPageChange(page)}
                className={
                  "relative inline-flex items-center rounded-md border hover:bg-gray-400 border-gray-300  px-4 py-2 text-sm font-medium   "
                }
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
