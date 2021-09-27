import React, { useState, useCallback } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

export default function CampaignNew() {
  const [minimumContribution, setMinimumContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      setLoading(true);
      setErrorMessage("");
      try {
        const accounts = await web3.eth.getAccounts();
        await factory.methods
          .createCampaign(minimumContribution)
          .send({ from: accounts[0] });
        router.push("/");
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    },
    [minimumContribution]
  );
  return (
    <Layout>
      <h3>Create a Campaign</h3>

      <Form onSubmit={onSubmit} error={Boolean(errorMessage)}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={(event) =>
              setMinimumContribution(event.currentTarget.value)
            }
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
