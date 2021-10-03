import { useCallback } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import getCampaign from "../ethereum/campaign";

export default function RequestRow(props) {
  const { Row, Cell } = Table;
  const { id, request, approversCount, address } = props;

  const readyToFinalize = request.approvalCount > approversCount / 2;

  const onApprove = useCallback(async () => {
    const accounts = await web3.eth.getAccounts();
    const campaign = getCampaign(address);
    await campaign.methods.approveRequest(id).send({
      from: accounts[0],
    });
  }, [id, address]);

  const onFinalize = useCallback(async () => {
    const accounts = await web3.eth.getAccounts();
    const campaign = getCampaign(address);
    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0],
    });
  }, [id, address]);
  return (
    <Row
      disabled={request.complete}
      positive={readyToFinalize && !request.complete}
    >
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>
        {request.approvalCount}/{approversCount}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button color="green" basic onClick={onApprove}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button color="teal" basic onClick={onFinalize}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
}
