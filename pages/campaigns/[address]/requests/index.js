import { Button, Table } from "semantic-ui-react";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import RequestRow from "../../../../components/RequestRow";
import getCampaign from "../../../../ethereum/campaign";

export default function RequestsIndex(props) {
  const { requests, address, requestsCount, approversCount } = props;
  const { Header, Row, HeaderCell, Body } = Table;
  return (
    <Layout>
      <h3>Requests</h3>
      <Link href={`/campaigns/${props.address}/requests/new`}>
        <a>
          <Button primary floated="right" style={{ marginBottom: 10 }}>
            Add Request
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {requests.map((request, index) => (
            <RequestRow
              id={index}
              request={request}
              key={index}
              address={address}
              approversCount={approversCount}
            />
          ))}
        </Body>
      </Table>
      <div>Found {requestsCount} requests.</div>
    </Layout>
  );
}

RequestsIndex.getInitialProps = async ({ query }) => {
  const campaign = getCampaign(query.address);
  const requestsCount = await campaign.methods.requestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();
  const ids = [];
  for (let i = 0; i < requestsCount; i++) {
    ids.push(i);
  }
  const requests = await Promise.all(
    ids.map((id) => campaign.methods.requests(id).call())
  );
  return {
    address: query.address,
    requests,
    requestsCount,
    approversCount,
  };
};
