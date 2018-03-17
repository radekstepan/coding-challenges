import React from "react";

import ListBooks from "./containers/ListBooks";
import AddBook from "./containers/AddBook";
import ViewBook from "./containers/ViewBook";

const routes = [
  { path: "/", action: () => <ListBooks /> },
  { path: "/add", title: "Add a Book", action: () => <AddBook /> },
  { path: "/view/:id", title: "View a Book", action: () => <ViewBook /> },
];

export default routes;
