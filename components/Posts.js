import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import Moment from "react-moment";

// const posts = [
//   {
//     id: "123",
//     profileImg: "https://dummyimage.com/450x350/000/fff.jpg",
//     username: "viknedus",
//     image: "https://dummyimage.com/450x350/000/fff.jpg",
//     caption: "in god we trust",
//   },
//   {
//     id: "124",
//     profileImg: "https://dummyimage.com/450x350/000/fff.jpg",
//     username: "username",
//     image: "https://dummyimage.com/450x350/000/fff.jpg",
//     caption: "in god we trust",
//   },
// ];

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [db]);

  // Cleaner useEffect code from the above
  // useEffect(
  //   () =>
  //     onSnapshot(
  //       query(collection(db, "posts"), orderBy("timestamp", "desc")),
  //       (snapshot) => {
  //         setPosts(snapshot.docs);
  //       }
  //     ),
  //   [db]
  // );

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userImg={post.data().profileImg}
          username={post.data().username}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
}

// Post function

function Post({ id, userImg, username, img, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasliked, setHasliked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db, id]);

  useEffect(
    () =>
      setHasliked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (hasliked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    // adds comment to the database
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt=""
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      <img src={img} alt="" className="object-cover w-full" />

      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          {hasliked ? (
            <HeartIconFilled
              className="h-7 cursor-pointer hover:scale-125 transition-all duration-150 ease-out text-red-500"
              onClick={likePost}
            />
          ) : (
            <HeartIcon
              className="h-7 cursor-pointer hover:scale-125 transition-all duration-150 ease-out"
              onClick={likePost}
            />
          )}

          <ChatIcon className="h-7 cursor-pointer hover:scale-125 transition-all duration-150 ease-out" />
          <PaperAirplaneIcon className="rotate-45 h-7 cursor-pointer hover:scale-125 transition-all duration-150 ease-out" />
        </div>
        <BookmarkIcon className="h-7 cursor-pointer hover:scale-125 transition-all duration-150 ease-out" />
      </div>

      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>

      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                src={comment.data().userImage}
                alt=""
                className="h-7 rounded-full"
              />
              <p className="text-sm flex-1">
                <span className="font-bold ">{comment.data().username} </span>
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
