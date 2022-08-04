/* eslint-disable @next/next/no-page-custom-font */
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import api from "../services/api";

import DataSubmissionForm from "../components/DataSubmissionForm";
import Container from "../components/Container";
import Image from "next/image";
import giftImage from "../public/gift.svg";
import { HeroContainer, HomeWrapper } from "../styles/PagesStyle/indexStyles";
import ServerBadge from "../components/ServerBadge";

interface VerifyStatusServerResponse {
  alive: boolean;
}

const Home: NextPage = () => {
  const [isServerRunning, setIsServerRunning] = useState<boolean | null>(null);

  // VERIFY THE SERVER STATUS
  function verifyServerStatus() {
    // API QUERY TO GET SERVER STATUS
    api
      .get<VerifyStatusServerResponse>("")
      .then((response) => {
        setIsServerRunning(response.data.alive);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // RUN ONE TIME PER RENDER TO GET THE SERVER STATUS
  useEffect(() => {
    verifyServerStatus();
  }, []);

  return (
    <HomeWrapper>
      <Head>
        <title>Doar computadores</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Container bg="primary" h="100vh" maxH="100vh">
        <HeroContainer>
          <ServerBadge isServerRunning={isServerRunning} />
          <div>
            <h1>Doação de computadores usados</h1>
            <h2>Possui um computador que por algum motivo não usa mais?</h2>
            <h2>Faça uma doação e torne alguem que precise feliz!</h2>
          </div>

          <Image src={giftImage} alt="a gift" layout="intrinsic" />
        </HeroContainer>
        <DataSubmissionForm />
      </Container>
    </HomeWrapper>
  );
};

export default Home;
