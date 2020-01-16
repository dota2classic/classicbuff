import * as React from "react";

import HelloWorld from "components/HelloWorld/HelloWorld";

export default () => (
  <>
    <h1>My page</h1>
    <HelloWorld />

    <style jsx>{`
      h1 {
        color: red;
      }
    `}</style>
  </>
);
