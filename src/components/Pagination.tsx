import styled from "styled-components";
import React from "react";

interface Props {
  page: number;
  pages: number;
  next: () => void;
  prev: () => void;
}

const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const Page = styled.div`
  border: none;
  color: #e3e3e3;
  font-size: 20px;
  padding: 8px;
  margin-left: 10px;
  margin-right: 10px;
`;

const Button = styled.button`
  border: none;
  color: #c2c2c2;
  font-size: 20px;
  user-select: none;
  outline: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
  background: rgba(0, 0, 0, 0.1);

  &:disabled {
    background: rgba(0, 0, 0, 0.1);
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export default ({ page, prev, next, pages }: Props) => {
  if (pages === 0) return null;
  return (
    <PaginationWrapper>
      <Button disabled={page == 0} onClick={prev}>
        Предыдущая
      </Button>
      <Page>
        {page + 1} / {pages}
      </Page>
      <Button disabled={page >= pages - 1} onClick={next}>
        Следующая
      </Button>
    </PaginationWrapper>
  );
};
