import Link from "next/link";
import { useRouter } from "next/router";
import { NextPage } from 'next';
import { topics } from "../utils/constants";

const Discover: NextPage = () => {
    const router = useRouter();
  // use data insise the url to fins out what topic is being click
  const { topic } = router.query;

  const activeTopicStyle =
    "xl:border-2 hover:bg-primary dark:hover:bg-gray-800 xl:border-[#F51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#F51997]";
  const topicStyle =
    "xl:border-2 hover:bg-primary dark:hover:bg-gray-800 xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black";

  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6">
      <p className="text-gray-500 dark:text-gray-300 font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap">
        {topics?.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div
              className={topic === item.name ? activeTopicStyle : topicStyle}
            >
              <span className="font-bold text-2xl xl:text-md dark:text-white">
                {item.icon}
              </span>
              <span
                className={`font-medium text-md hidden xl:block capitalize dark:text-white`}
              >
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
