import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import SeePostPresenter from "./SeePostPresenter";
import { TOGGLE_LIKE, ADD_COMMENT } from "../../Components/Post/PostQueries";
import { toast } from "react-toastify";
import useInput from "../../Hooks/useInput";

const SeePostContainer = ({
  post: {
    seeFullPost: {
      id,
      user,
      files,
      likeCount,
      isLiked,
      comments,
      caption,
      location,
      createdAt
    }
  }
}) => {
  // console.log("SeePostContainer: id:", id);
  // console.log("length", files.length);
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComments, setSelfComments] = useState([]);
  const [isOpenLikes, setIsOpenLikes] = useState(false);
  const comment = useInput("");

  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value }
  });

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });

  const handleIsOpen = () => {
    if (isOpenLikes) {
      setIsOpenLikes(false);
    } else {
      setIsOpenLikes(true);
    }
  };

  const slide = () => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setCurrentItem(0);
    } else {
      setCurrentItem(currentItem + 1);
    }
  };

  const onKeyPress = async (e) => {
    const { which } = e;
    // console.log(e);
    if (which === 13) {
      e.preventDefault();
      try {
        const {
          data: { addComment }
        } = await addCommentMutation();
        setSelfComments([...selfComments, addComment]);
        console.log(comment);
        comment.setValue("");
      } catch (error) {
        console.log(error);
        toast.error("일시적인 오류입니다. 다시 시도해 주세요.😂");
      }
    }
  };

  const toggleLike = () => {
    toggleLikeMutation();
    if (isLikedS === true) {
      setIsLiked(false);
      setLikeCount(likeCountS - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountS + 1);
    }
  };

  return (
    <SeePostPresenter
      id={id}
      user={user}
      files={files}
      likeCount={likeCountS}
      isLiked={isLikedS}
      comments={comments}
      caption={caption}
      location={location}
      createdAt={createdAt}
      newComment={comment}
      selfComments={selfComments}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      currentItem={currentItem}
      nextSlideFn={slide}
      onKeyPress={onKeyPress}
      toggleLike={toggleLike}
      isOpenLikes={isOpenLikes}
      handleIsOpen={handleIsOpen}
    />
  );
};

SeePostContainer.propTypes = {
  post: PropTypes.object.isRequired
};

export default SeePostContainer;
