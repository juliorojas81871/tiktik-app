import React from "react";
import { NoResults } from "./";
import useAuthStore from "../store/authStore";

const Comments = () => {
  const comments = [];
  const { allUsers, userProfile }: any = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 mt-4 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[457px]">
        {comments?.length > 0 ? (
          <div>videos</div>
        ) : (
          <div>
            <NoResults
              text="No Comments Yet! Be First to do add the comment."
              camera={true}
            />
          </div>
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0  pb-6 px-2 md:px-10 ">
          <form className="flex gap-4">
            <input
              value=""
              onChange={() => {}}
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
              placeholder="Add comment.."
            />
            <button className="text-md text-gray-400 " onClick={() => {}}>
              Comment
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
