import React from "react";

import ListBooks from "./containers/ListBooks";
import AddBook from "./containers/AddBook";
import ViewBook from "./containers/ViewBook";

const routes = [
  { path: "/", render: () => <ListBooks /> },
  { path: "/add", title: "Add a Book", render: () => <AddBook /> },
  { path: "/book/:idx", title: "View a Book", render: () => <ViewBook /> }
];

export default routes;
