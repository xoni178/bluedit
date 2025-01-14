import { createContext, useContext, useEffect, useState } from "react";

import debounce from "lodash/debounce";

const BlueditDataContext = createContext();

export const DataContext = ({ children }) => {
  const [paginateNow, SetPaginateNow] = useState(false);
  const [authUser, SetAuthUser] = useState(null);

  const getPageHeight = async () => {
    return window.document.body.clientHeight;
  };
  const handleScroll = debounce(() => {
    const position = window.pageYOffset;

    checkIfNeedPagination(position);
  }, 500);

  const checkIfNeedPagination = async (scrollPosition) => {
    const PageHeight = await getPageHeight();

    let pageScrollEdge = (7 / 10) * PageHeight;

    if (scrollPosition >= pageScrollEdge && !paginateNow) {
      SetPaginateNow(true);
    }
  };

  //add a sroll event listener so when we scroll we update scrollPosition
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //----------------------------------------------

  return (
    <BlueditDataContext.Provider
      value={{ paginateNow, SetPaginateNow, authUser, SetAuthUser }}
    >
      {children}
    </BlueditDataContext.Provider>
  );
};

export const useBlueditDataContext = () => useContext(BlueditDataContext);
