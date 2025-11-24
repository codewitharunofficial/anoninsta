import React from "react";
import Tabs from "./Tabs";
import { useTabs } from "../context/TabContext";
import HighlightTray from "./HighlightTray";
import PageLoader from "./PageLoader";
import UserPost from "./UserPost";
import StoryCard from "./StoryCard";
import { useHighlight } from "../context/Highlights";
import HighlightStoryCard from "../Components/HighlightStoryCard";
import axios from "axios";

const ProfileData = ({
  fullName,
  profilePhoto,
  stories,
  userName,
  following,
  followers,
  bio,
  posts,
  highlights,
  isHighlightsLoading,
  isPostsLoading,
  posts_count,
  isPrivate,
  setIsPostsLoading,
  id,
  post_pagination_token,
  user,
  setUser,
}) => {
  const { activeTab, setActiveTab } = useTabs();
  const { media, isMediaLoading } = useHighlight();

  function formatCounts(count) {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
    if (count >= 1000) return (count / 1000).toFixed(1) + "K";
    return count;
  }

  async function loadMorePosts() {
    try {
      setIsPostsLoading(true);
      const { data } = await axios.post(`/api/posts/${id}/${post_pagination_token}`);
      setUser({
        ...user,
        posts: [...user.posts, ...data?.posts?.items],
        post_pagination_token: data?.token,
      });
      setIsPostsLoading(false);
    } catch (error) {
      console.log(error);
      setIsPostsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 py-10">

      {/* Profile Picture */}
      <div
        className={`border-4 ${stories?.length > 0 ? "border-pink-600" : "border-gray-200"
          } rounded-full p-1`}
      >
        <img
          src={profilePhoto}
          className="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover"
          alt="Profile"
        />
      </div>

      {/* Profile Info */}
      <div className="w-full mt-6">
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="text-white text-xl font-semibold">{fullName}</h3>

          <a
            href={`https://www.instagram.com/${userName}`}
            target="_blank"
            className="text-blue-200 underline underline-offset-2"
          >
            @{userName}
          </a>

          <div className="flex flex-row justify-center gap-10 mt-5 text-white text-lg">
            <div>Posts: {posts_count}</div>
            <div>Followers: {formatCounts(followers)}</div>
            <div>Following: {formatCounts(following)}</div>
          </div>

          {bio && <p className="text-white text-center mt-3">{bio}</p>}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 w-full">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* CONTENT SECTION */}
      <div className="mt-6 w-full flex flex-col items-center">

        {/* STORIES TAB */}
        {activeTab === "Stories" && (
          <div className="w-full flex flex-wrap justify-center gap-6">
            {stories?.length > 0 ? (
              stories.map((story, i) => <StoryCard key={i} story={story} />)
            ) : isPrivate ? (
              <div className="text-white p-4 border border-white rounded-md">
                The Account Is Private
              </div>
            ) : (
              <div className="text-white p-4 border border-white rounded-md">
                No Stories In The Last 24 Hours
              </div>
            )}
          </div>
        )}

        {/* POSTS TAB */}
        {activeTab === "Profile" && (
          <div className="w-full flex flex-col items-center">

            {isPostsLoading && posts.length === 0 && <PageLoader content="Posts" />}

            {!isPostsLoading && posts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                {posts.map((post, i) => (
                  <UserPost key={i} post={post} />
                ))}
              </div>
            )}

            {!isPostsLoading && posts.length === 0 && !isPrivate && (
              <div className="text-white p-4 border border-white rounded-md">
                No Posts Available
              </div>
            )}

            {!isPostsLoading && isPrivate && (
              <div className="text-white p-4 border border-white rounded-md">
                The Account Is Private
              </div>
            )}

            {/* Load More */}
            {posts.length > 0 && (
              <button
                onClick={() => loadMorePosts()}
                disabled={isPostsLoading}
                className={`mt-6 px-6 py-2 rounded-md text-white ${isPostsLoading ? "bg-gray-600" : "bg-blue-600"
                  }`}
              >
                {isPostsLoading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        )}

        {/* HIGHLIGHTS TAB */}
        {activeTab === "Highlights" && (
          <div className="w-full flex flex-col items-center">
            {isHighlightsLoading ? (
              <PageLoader content="Highlights..." />
            ) : (
              <>
                <div className="flex flex-row gap-6 overflow-x-auto py-3 w-full">
                  {highlights?.length > 0 ? (
                    highlights.map((highlight, i) => (
                      <HighlightTray key={i} highlight={highlight} />
                    ))
                  ) : isPrivate ? (
                    <div className="text-white p-4 border border-white rounded-md">
                      The Account Is Private
                    </div>
                  ) : (
                    <div className="text-white p-4 border border-white rounded-md">
                      No Highlights Available
                    </div>
                  )}
                </div>

                {/* Highlight Media */}
                <div className="w-full flex flex-wrap justify-center gap-6 mt-6">
                  {media.length > 0 ? (
                    media.map((m, i) => (
                      <HighlightStoryCard key={i} story={m} />
                    ))
                  ) : (
                    isMediaLoading && <PageLoader content="Highlight Media" />
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileData;
