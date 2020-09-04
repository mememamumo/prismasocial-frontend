import React from "react";
import { withRouter } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import { SEE_POST } from "./SeePostQueries";
import SeePostContainer from "./SeePostContainer";
import Loader from "../../Components/Loader";

const SeePostIndex = withRouter(
  ({
    match: {
      params: { postId }
    }
  }) => {
    const { data, loading } = useQuery(SEE_POST, {
      variables: { id: postId }
    });
    if (loading) {
      return (
        <>
          <Loader />
        </>
      );
    } else {
      return <SeePostContainer post={data} />;
    }
  }
);

export default SeePostIndex;
