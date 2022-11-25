import Head from "next/head";
import axios from "axios";
import { Video } from "../types";
import { NoResults, VideoCard } from "../components";
import { BASE_URL } from "../utils";

interface IProps {
  videos: Video[];
}

export default function Home({ videos }: IProps) {
  return (
    <div>
      <Head>
        <title>TikTik - Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/tiktik-icon.png" />
      </Head>

      <div className="flex flex-col gap-10 videos h-full">
        {videos.length ? (
          videos?.map((video: Video) => (
            <VideoCard post={video} key={video._id} isShowingOnHome />
          ))
        ) : (
          <NoResults text={`No Videos`} camera={true} account={false} comment={false} like={false}/>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  // to get all video
  let response = await axios.get(`${BASE_URL}/api/post`);
  // to get video for specific topix
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }

  return {
    props: { videos: response.data },
  };
};
