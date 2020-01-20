import * as React from "react";
import Layout, { ILayout } from "components/Layout/Layout";
import Sidebar from "./Sidebar";

export const LayoutContainer = (props: Omit<ILayout, "sidebar">) => <Layout sidebar={<Sidebar />} {...props} />;

export default LayoutContainer;
