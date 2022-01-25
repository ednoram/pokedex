import Router from "next/router";
import { ParsedUrlQuery } from "querystring";

const setQueryParams = async (params: ParsedUrlQuery) => {
  await Router.push({ query: params }, undefined, {
    shallow: true,
  });
};

export default setQueryParams;
