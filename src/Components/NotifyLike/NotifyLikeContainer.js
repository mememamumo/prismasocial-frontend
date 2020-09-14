import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useMutation, useQuery } from "react-apollo-hooks";
import { SEE_LIKE, READ_LIKE } from "./NotifyLikeQueries";
import NotifyLikePresenter from "./NotifyLikePresenter";

export default withRouter(({ history, toggleButton }) => {
  const { data, loading, refetch } = useQuery(SEE_LIKE);
  // console.log("notiCon", data);
  const [readLikeMutation] = useMutation(READ_LIKE);

  const handleClick = async (likeId, postId) => {
    try {
      await readLikeMutation({
        refetchQueries: () => [
          {
            query: SEE_LIKE
          }
        ],
        variables: {
          likeId
        }
      });
      history.push(`/post/${postId}`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <NotifyLikePresenter
      data={data}
      loading={loading}
      toggleButton={toggleButton}
      handleClick={handleClick}
    />
  );
});
