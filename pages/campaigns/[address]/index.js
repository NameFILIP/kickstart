import React from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import ContributeForm from "../../../components/ContributeForm";
import getCampaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";

function Cards(props) {
  const {
    minimumContribution,
    balance,
    requestsCount,
    approversCount,
    manager,
  } = props;
  const items = [
    {
      header: manager,
      meta: "Address of Manager",
      description: "The manager created this campaign and can create requests",
      style: { overflowWrap: "break-word" },
    },
    {
      header: minimumContribution,
      meta: "Minimum Contribution (wei)",
      description:
        "You must contribute at least this much wei to become an approver",
    },
    {
      header: requestsCount,
      meta: "Number of Requests",
      description:
        "A request tries to withdraw money from the contract. Requests must be approved by approvers",
    },
    {
      header: approversCount,
      meta: "Number of Approvers",
      description: "Number of people who have already donated to this campaign",
    },
    {
      header: web3.utils.fromWei(balance, "ether"),
      meta: "Campaign Balance (ether)",
      description:
        "The balance is how much money this campaign has left to spend",
    },
  ];
  return <Card.Group items={items} />;
}

export default function CampaignShow(props) {
  return (
    <Layout>
      <h3>Campaigns Show</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Cards {...props} />
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={props.address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${props.address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

CampaignShow.getInitialProps = async ({ query }) => {
  const campaign = getCampaign(query.address);
  const summary = await campaign.methods.getSummary().call();
  return {
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
    address: query.address,
  };
};
