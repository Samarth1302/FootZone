import { useState, useEffect, useRef } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
import { useRouter } from "next/router";
import { HiPencilSquare } from "react-icons/hi2";
import { IoTrashBin } from "react-icons/io5";

const Comment = ({ user, dark }) => {
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const pageIdentifier = router.pathname;
  const [show, setShow] = useState(true);
  const [showDropdown, setShowDropdown] = useState(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [newEditText, setNewEditText] = useState("");
  const [editComment, setEditComment] = useState(null);
  const [replyInput, setReplyInput] = useState(null);
  const [newReplyText, setNewReplyText] = useState("");
  const replyInputRef = useRef(null);
  const commentInputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    let nonShow = ["/signup", "/login", "/security", "/privacy","/shop"];
    if (nonShow.includes(router.pathname)) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [router]);

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "short",
      year:
        new Date(dateString).getFullYear() !== new Date().getFullYear()
          ? "numeric"
          : undefined,
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };
  useEffect(() => {
    const fetchComments = async () => {
      const token = JSON.parse(localStorage.getItem("myUser"));
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/comm/comments?page=${pageIdentifier}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setComments(data);
        const commentsWithReplies = await Promise.all(
          data.map(async (comment) => {
            const repliesData = await fetchReplies(comment._id);
            return { ...comment, replies: repliesData };
          })
        );
        setComments(commentsWithReplies);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [pageIdentifier]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const sanitizedComment = DOMPurify.sanitize(newCommentText);
    if (sanitizedComment.length > 300) {
      return toast.error("Comment length exceeds the limit (300 characters).", {
        icon: "😬",
        id: "comm",
      });
    }
    if (!user.user_id) {
      return toast.error("Users need to login to comment", {
        id: "notloggedin",
      });
    }
    const token = JSON.parse(localStorage.getItem("myUser"));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/comm/comments`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            pageIdentifier: pageIdentifier,
            text: sanitizedComment,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        return toast.error(data.error, {
          id: "customerr",
        });
      }
      setComments([...comments, data]);
      setNewCommentText("");
    } catch (error) {
      toast.error(error, {
        id: "commsub",
      });
    }
  };
  const toggleDropdown = (commentId) => {
    setShowDropdown((prev) => (prev === commentId ? null : commentId));
  };

  const closeDropdown = () => {
    setShowDropdown(null);
  };

  const handleDropdownClick = (commentId, event) => {
    event.stopPropagation();
    toggleDropdown(commentId);
  };
  const handleEditClick = (commentId, currentText) => {
    setEditComment(commentId);
    setNewEditText(currentText);
    closeDropdown();
  };
  const handleEditSubmit = async (commentId) => {
    const sanitizedEditText = DOMPurify.sanitize(newEditText);
    if (sanitizedEditText.length > 300) {
      return toast.error("Comment length exceeds the limit (300 characters).", {
        icon: "😬",
        duration: 4000,
        id: "comm",
      });
    }
    const token = JSON.parse(localStorage.getItem("myUser"));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/comm/editComm/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            text: sanitizedEditText,
          }),
        }
      );
      const data = await response.json();
      setComments(comments.map(comment => {
        if (comment._id === commentId) {
          return {
            ...data,
            replies: comment.replies 
          };
        }
        return comment;
      }));
      setNewEditText("");
      setEditComment(null);
    } catch (error) {
      toast.error("Failed to edit comment. Please try again later.", {
        id: "editfail",
      });
      console.error(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown]);

  const handleDeleteClick = async (commentId) => {
    const token = JSON.parse(localStorage.getItem("myUser"));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/comm//delComm/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      toast.success(data.message, {
        id: "delsucc",
      });
      const updatedComments = comments.filter(
        (comment) => comment._id !== commentId
      );
      setComments(updatedComments);
    } catch (error) {
      toast.error("Failed to edit comment. Please try again later.", {
        id: "faildel",
      });
      console.error(error);
    }
    closeDropdown();
  };

  const fetchReplies = async (commentId) => {
    try {
      const token = JSON.parse(localStorage.getItem("myUser"));
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/comm/getReplies/${commentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch replies:", error);
      throw new Error("Failed to fetch replies");
    }
  };

  const handleToggleReplyInput = (commentId) => {
    setReplyInput(commentId);
  };
  const handleCancelReply = () => {
    setReplyInput(null);
    setNewReplyText("");
  };

  const handleReplySubmit = async (commentId) => {
    const sanitizedReply = DOMPurify.sanitize(newReplyText);
    if (sanitizedReply.length > 300) {
      return toast.error("Reply length exceeds the limit (300 characters).", {
        icon: "😬",
        id: "reply",
      });
    }
    if (!user.user_id) {
      return toast.error("Users need to login to reply", {
        id: "notloggedin",
      });
    }
    const token = JSON.parse(localStorage.getItem("myUser"));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/comm/replies/${commentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            text: sanitizedReply,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        return toast.error(data.error, {
          id: "creperr",
        });
      }
      const updatedReplies = await fetchReplies(commentId);
      const updatedComments = comments.map((comment) => {
        if (comment._id === commentId) {
          return { ...comment, replies: updatedReplies };
        }
        return comment;
      });
      setComments(updatedComments);
      setNewReplyText("");
      setReplyInput(null);
    } catch (error) {
      toast.error(error, {
        id: "replysub",
      });
    }
  };

  const handleDeleteReply = async (replyId) => {
    const token = JSON.parse(localStorage.getItem("myUser"));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/comm/delReply/${replyId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      toast.success(data.message, {
        id: "delsucc",
      });
      const updatedComments = comments.map((comment) => ({
        ...comment,
        replies: comment.replies.filter((reply) => reply._id !== replyId),
      }));
      setComments(updatedComments);
    } catch (error) {
      toast.error("Failed to delete reply. Please try again later.", {
        id: "faildel",
      });
      console.error(error);
    }
  };

  return (
    <>
      {show && (
        <div className={`${dark ? "dark" : ""} `}>
          <hr className="border-slate-700" />
          <section className="bg-white dark:bg-gray-900  py-8 lg:py-16 antialiased">
            <div className="md:max-w-xl lg:max-w-5xl mx-auto px-4">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-base md:text-2xl font-bold text-gray-900 dark:text-white">
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
                    rows="4"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="px-0 w-full text-base text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-950 px-3 py-2 mb-8 rounded-md text-xs md:text-sm hover:bg-blue-900  focus:bg-white dark:focus:bg-slate-900 focus:border-2 focus:border-blue-950 focus:text-blue-950 dark:focus:text-white font-medium text-white"
                >
                  Post comment
                </button>
              </form>
              {comments &&
                comments.map((comment) => (
                  <article
                    key={comment._id}
                    className={`p-3 my-3 mx-6 md:mx-1 text-base bg-slate-100 dark:bg-slate-950 rounded-lg `}
                  >
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-blue-400 dark:text-blue-200 font-semibold">
                          <FaRegUserCircle />
                          <span className="ml-3 tracking-wider text-sm text-blue-400 dark:text-blue-200 ">
                            {comment.username}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 ml-2">
                          <time dateTime={comment.createdAt}>
                            {formatDate(comment.createdAt)}
                          </time>
                        </p>
                      </div>
                      {comment.userId === user.user_id && (
                        <div className="relative inline-block">
                          <button
                            className="inline-flex items-center p-1 text-sm font-medium text-center text-gray-800 dark:text-gray-200 bg-slate-100 rounded-lg hover:bg-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-400 dark:bg-gray-950 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            type="button"
                            onClick={(e) => {
                              handleDropdownClick(comment._id, e);
                            }}
                          >
                            <svg
                              className="w-4 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 16 3"
                            >
                              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                            </svg>
                          </button>
                          {showDropdown === comment._id && (
                            <div
                              ref={dropdownRef}
                              className="absolute md:left-4 w-14 md:w-20 origin-top-right focus:outline-none bg-blue-100 rounded-md shadow-lg dark:bg-gray-800 z-10"
                            >
                              <button
                                className="flex w-full items-center rounded-md hover:bg-blue-200 dark:hover:bg-gray-700"
                                onClick={() => {
                                  handleEditClick(comment._id, comment.text);
                                }}
                              >
                                <HiPencilSquare className="dark:text-white pl-2 text-base hidden md:block md:text-xl" />
                                <p className="ml-2 py-2 text-xs md:text-sm text-gray-800 text-left dark:text-gray-200">
                                  Edit
                                </p>
                              </button>
                              <button
                                className="flex w-full items-center rounded-md hover:bg-blue-200 dark:hover:bg-gray-700"
                                onClick={() => {
                                  handleDeleteClick(comment._id);
                                }}
                              >
                                <IoTrashBin className="dark:text-white pl-2 text-base hidden md:block md:text-xl" />
                                <p className="ml-2  py-2 text-xs md:text-sm rounded-md text-left text-gray-800 dark:text-gray-200">
                                  Delete
                                </p>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </footer>
                    {editComment === comment._id ? (
                      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <textarea
                          id="comment"
                          rows="3"
                          value={newEditText || comment.text}
                          onChange={(e) => setNewEditText(e.target.value)}
                          className="px-0 w-full text-base mb-2 text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:bg-gray-800"
                          ref={(textarea) => {
                            commentInputRef.current = textarea;
                          }}
                          required
                        ></textarea>
                        <button
                          type="button"
                          className="bg-blue-950 px-2 py-1 mr-2 rounded-md text-xs md:text-sm hover:bg-blue-900  focus:bg-white dark:focus:bg-slate-900 focus:border-2 focus:border-blue-950 focus:text-blue-950 dark:focus:text-white font-medium text-white"
                          onClick={() => {
                            setEditComment(null);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="bg-blue-950 px-2 py-1 rounded-md text-xs md:text-sm hover:bg-blue-900  focus:bg-white dark:focus:bg-slate-900 focus:border-2 focus:border-blue-950 focus:text-blue-950 dark:focus:text-white font-medium text-white"
                          onClick={() => {
                            handleEditSubmit(comment._id);
                          }}
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        className="px-7 text-gray-900 dark:text-white text-wrap"
                        style={{ overflowWrap: "break-word" }}
                      >
                        {comment.text}
                      </p>
                    )}
                    <div className="flex items-center mt-4 space-x-4">
                      <button
                        type="button"
                        className="flex items-center text-sm text-blue-400 cursor-pointer hover:underline underline-offset-1 dark:text-blue-200 font-medium"
                        onClick={() => {
                          handleToggleReplyInput(comment._id);
                        }}
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
                      <p className="dark:text-gray-500 ">
                        {comment.replies.length === 1
                          ? `${comment.replies.length} reply`
                          : `${comment.replies.length} replies`}
                      </p>
                    </div>
                    {replyInput === comment._id && (
                      <div className="py-2 px-4 my-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <textarea
                          id="reply"
                          rows="2"
                          value={newReplyText}
                          onChange={(e) => setNewReplyText(e.target.value)}
                          className="px-0 w-full text-base mb-2 text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:bg-gray-800"
                          placeholder="Write a reply..."
                          ref={replyInputRef}
                          required
                        ></textarea>
                        <div className="flex">
                          <button
                            type="button"
                            className="bg-blue-950 px-2 py-1 mr-2 rounded-md text-xs md:text-sm hover:bg-blue-900 focus:bg-white dark:focus:bg-slate-900 focus:border-2 focus:border-blue-950 focus:text-blue-950 dark:focus:text-white font-medium text-white"
                            onClick={() => handleCancelReply()}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="bg-blue-950 px-2 py-1 rounded-md text-xs md:text-sm hover:bg-blue-900 focus:bg-white dark:focus:bg-slate-900 focus:border-2 focus:border-blue-950 focus:text-blue-950 dark:focus:text-white font-medium text-white"
                            onClick={() => handleReplySubmit(comment._id)}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    )}

                    {comment.replies &&
                      comment.replies.map((reply) => (
                        <div key={reply._id} className="ml-8 mt-4 mb-4">
                          <hr className="my-4 dark:border-slate-800"/>
                          <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <p className="inline-flex items-center mr-3 text-sm text-blue-400 dark:text-blue-200 font-semibold">
                                <FaRegUserCircle />
                                <span className="ml-3 tracking-wider text-sm text-blue-400 dark:text-blue-200 ">
                                  {reply.username}
                                </span>
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-500 ml-2">
                                <time dateTime={reply.createdAt}>
                                  {formatDate(reply.createdAt)}
                                </time>
                              </p>
                            </div>
                            {reply.userId === user.user_id && (
                              <div className="relative flex flex-row space-x-6">
                                <IoTrashBin
                                  className="dark:text-white text-sm md:text-base lg:text-lg block cursor-pointer"
                                  onClick={() => {
                                    handleDeleteReply(reply._id);
                                  }}
                                />
                              </div>
                            )}
                          </footer>
                          <p
                            className="px-7 text-gray-900 dark:text-white text-wrap"
                            style={{ overflowWrap: "break-word" }}
                          >
                            {reply.text}
                          </p>
                          
                        </div>
                      ))}
                  </article>
                ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Comment;
