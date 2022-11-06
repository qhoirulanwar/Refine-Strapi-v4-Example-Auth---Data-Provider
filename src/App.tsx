import React from "react";

import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  ReadyPage,
  ErrorComponent,
  AuthPage,
} from "@pankod/refine-antd";

import "@pankod/refine-antd/dist/styles.min.css";
import routerProvider from "@pankod/refine-react-router-v6";
import { DataProvider } from "@pankod/refine-strapi-v4";
import {
  Title,
  Header,
  Sider,
  Footer,
  Layout,
  OffLayoutArea,
} from "components/layout";
import { authProvider, axiosInstance } from "./authProvider";
import { API_URL } from "./constants";
import { PostCreate, PostEdit, PostList } from "pages/posts";
import { CategoryCreate, CategoryEdit, CategoryList } from "pages/categories";
import { UsersList } from "pages/users";

function App() {
  return (
    <Refine
      notificationProvider={notificationProvider}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      authProvider={authProvider}
      LoginPage={AuthPage}
      Title={Title}
      Header={Header}
      Sider={Sider}
      Footer={Footer}
      Layout={Layout}
      OffLayoutArea={OffLayoutArea}
      dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          list: PostList,
          create: PostCreate,
          edit: PostEdit,
        },
        {
          name: "categories",
          list: CategoryList,
          create: CategoryCreate,
          edit: CategoryEdit,
        },
        {
          name: "users",
          list: UsersList,
        },
      ]}
    />
  );
}

export default App;
