import React from "react";
import { useQuery } from "react-apollo-hooks";
import { EXPLORE } from "./ExploreQueries";
import ExplorePresenter from "./ExplorePresenter";

const ExploreContainer = () => {
  const { data, loading } = useQuery(EXPLORE);
  return <ExplorePresenter data={data} loading={loading} />;
};

export default ExploreContainer;
