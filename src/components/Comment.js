import { useState, useEffect } from "react";

const Comment = ({ pageIdentifier, user, dark }) => {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments/page/${pageIdentifier}`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [pageIdentifier]);

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.user_id,
          pageIdentifier,
          text: newCommentText,
        }),
      });
      const data = await response.json();
      setComments([...comments, data]);
      setNewCommentText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${dark ? "dark" : ""} `}>
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <hr className="my-8" />
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
              Fan Discussion ({comments.length})
            </h1>
          </div>
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows="6"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              type=""
              className="bg-blue-950 px-3 py-2 rounded-md text-xs md:text-sm hover:bg-blue-900  focus:bg-white dark:focus:bg-slate-900 focus:border-2 focus:border-blue-950 focus:text-blue-950 dark:focus:text-white font-medium text-white"
            >
              Post comment
            </button>
          </form>
          {comments.map((comment, index) => (
            <article
              key={index}
              className={`p-6 ${
                index !== 0 ? "mb-3 ml-6 lg:ml-12" : ""
              } text-base bg-white rounded-lg ${
                index === comments.length - 1
                  ? "border-t border-gray-200 dark:border-gray-700"
                  : ""
              } dark:bg-gray-900`}
            >
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="./user.avif"
                    />
                    {comment.userName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time pubdate dateTime={comment.createdAt}>
                      {comment.createdAt}
                    </time>
                  </p>
                </div>
                <button
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  type="button"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                  <span className="sr-only">Comment settings</span>
                </button>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">{comment.text}</p>
              <div className="flex items-center mt-4 space-x-4">
                <button
                  type="button"
                  className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                >
                  <svg
                    className="mr-1.5 w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                    />
                  </svg>
                  Reply
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Comment;
