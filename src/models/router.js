import toRegex from "path-to-regexp";

import routes from "../routes";
import history from "../history";

const ROOT_TITLE = "HelpScout Book Store";

const matchURI = (path, uri) => {
  const keys = [];
  const pattern = toRegex(path, keys);
  const match = pattern.exec(uri);
  if (!match) return null;

  const params = Object.create(null);
  for (let i = 1; i < match.length; i++) {
    params[keys[i - 1].name] = match[i] !== undefined ? match[i] : undefined;
  }
  return params;
};

const resolve = pathname => {
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    const params = matchURI(route.path, pathname);
    if (!params) continue;
    return [i, params, route.title, getQueryParams()];
  }
  throw new Error("Not found");
};

const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const obj = {};
  for (const [key, val] of params.entries()) {
    obj[key] = val;
  }
  return obj;
}

const router = {
  state: { route: '' },
  reducers: {
    route(state, pathname) {
      const [route, params, title, search] = resolve(pathname);
      document.title = title ? [ROOT_TITLE, title].join(' - ') : ROOT_TITLE;
      return {...state, route, params, search};
    }
  },
  effects: {
    navigate(pathname, state) {
      history.push(pathname);
    }
  }
};

export default router;
