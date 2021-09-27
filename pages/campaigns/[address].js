import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

export default function CampaignShow() {
  const router = useRouter();
  const { address } = router.query;
  return (
    <Layout>
      <h3>Campaigns Show</h3>
      {address}
    </Layout>
  );
}
