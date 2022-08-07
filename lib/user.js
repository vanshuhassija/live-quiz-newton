import { useQuery } from "@apollo/react-hooks";
import { Spinner } from "@chakra-ui/core";
import { Flex} from "@chakra-ui/react";
import { getCookies } from "cookies-next";
import Router, { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import Loader from "../components/Loader"
import AppContext from "../context/App";
import { USER } from "./queries";
const withAuth = (Component) => {
  const Auth = (props) => {
    // Login data added to props via redux-store (or use react context for example)
    const { userLoading, setUserLoading, setUser,user } = useContext(AppContext);
    const {
      loading,
      error,
      data: userData,
    } = useQuery(USER, {
      variables: { userId: getCookies("user-id")?.["user-id"] },
    });

    const router = useRouter();

    // If user is not logged in, return login component

    useEffect(() => {
      console.log("User Dats ia", userData, loading);
      if (userData?.users?.length) {
        setUserLoading(false);
        setUser(userData?.users?.[0])
      } else {
        if (!loading && !userData?.users?.length&&!user) {
          router.push("/");
        }
      }
    }, [loading]);

    if (userLoading) {
      return (
       <Loader/>
      );
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
