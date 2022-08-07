import { useQuery } from "@apollo/react-hooks";
import { getCookies } from "cookies-next";
import { Router } from "next/router";
import React, { useEffect, useContext } from "react";
import AppContext from "../context/App";
import { USER } from "../lib/queries";

const User = ({ components }) => {
  const { setUser } = useContext(AppContext);
  const { loading, error, data } = useQuery(USER, {
    variables: { userId: getCookies("user-id")?.["user-ids"] },
  });

  

  return <>{components}</>;
};

export default User;
