import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "../i18n/i18n";
import { Private } from "../scenes/Layout/Private/Private";
import { Public } from "../scenes/Layout/Public/Public";

// import { useHistory } from "react-router-dom";
export const App = () => {
  const { authentication } = useSelector((state) => state.auth);

  return (
    <>
      {!authentication && <Public />}
      {authentication && <Private />}
    </>
  );
};
