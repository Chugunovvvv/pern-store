import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../main";
import { Pagination } from "react-bootstrap";

const Pages = observer(() => {
  const { device } = useContext(Context);
  console.log(device.totalCount);
  const pageCount = Math.ceil(device.totalCount / device.limit);
  console.log(pageCount);
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  console.log(pages);
  // const pages = [1, 2, 3, 4, 5];
  if (pages.length === 0) {
    return null; // или верните заглушку
  }
  return (
    <Pagination className="mt-3">
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={device.page === page}
          onClick={() => device.setPage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default Pages;
