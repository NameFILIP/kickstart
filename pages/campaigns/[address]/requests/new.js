import { useState, useCallback } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import getCampaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";

export default function RequestNew(props) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [recipient, setRecipient] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { address } = props;

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const campaign = getCampaign(address);

      setLoading(true);
      setErrorMessage("");
      try {
        const accounts = await web3.eth.getAccounts();
        await campaign.methods
          .createRequest(
            description,
            web3.utils.toWei(value, "ether"),
            recipient
          )
          .send({
            from: accounts[0],
          });
        router.push(`/campaigns/${address}/requests`);
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    },
    [address, description, value, recipient]
  );

  return (
    <Layout>
      <Link href={`/campaigns/${props.address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={Boolean(errorMessage)}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Value</label>
          <Input
            label="ether"
            labelPosition="right"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(event) => setRecipient(event.currentTarget.value)}
          />
        </Form.Field>

        <Message error header="Oops!" content={errorMessage} />

        <Button primary loading={loading}>
          Create!
        </Button>
      </Form>
    </Layout>
  );
}

RequestNew.getInitialProps = async ({ query }) => {
  // const campaign = getCampaign(query.address);
  // const summary = await campaign.methods.getSummary().call();
  return {
    address: query.address,
    //   minimumContribution: summary[0],
    //   balance: summary[1],
    //   requestsCount: summary[2],
    //   approversCount: summary[3],
    //   manager: summary[4],
    //   address: query.address,
  };
};
