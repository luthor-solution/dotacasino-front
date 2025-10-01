import { Suspense } from "react";
import Component from "./Component.client";

const Signup = () => {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
};

export default Signup;
