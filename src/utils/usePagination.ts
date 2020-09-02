import { useState } from "react";

export default () => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  return {
    page,
    setTotalPages
  };
};
