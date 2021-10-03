import React, { useState, useCallback } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import getCampaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

export default function ContributeForm(props) {
  const [value, setValue] = useState("");
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
        await campaign.methods.contribute().send({
          from: accounts[0],
          value: web3.utils.toWei(value, "ether"),
        });
        router.replace(`/campaigns/${address}`);
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    },
    [value, address]
  );

  return (
    <Form onSubmit={onSubmit} error={Boolean(errorMessage)}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </Form.Field>
      <Message error header="Oops!" content={errorMessage} />
      <Button primary loading={loading}>
        Contribute!
      </Button>
    </Form>
  );
}
