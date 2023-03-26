"use client"; // this is a client component

import Image from "next/image";
//import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../chakra/theme";
import Layout from "@/components/Layout/Layout";
import { RecoilRoot } from "recoil";

//const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          <div>Hello</div>
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}
