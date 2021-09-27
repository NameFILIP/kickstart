import React from "react";
import Head from "next/head";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import Header from "./Header.js";

export default function Layout({ children }) {
  return (
    <Container>
      <Head>
        <title>CrowdCoin</title>
      </Head>
      <Header />
      {children}
    </Container>
  );
}
