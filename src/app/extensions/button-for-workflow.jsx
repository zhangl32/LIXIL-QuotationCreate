import React, { useState } from "react";
import {
  Button,
  Flex,
  hubspot,
  logger
} from "@hubspot/ui-extensions";

// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <Extension
    context={context}
    runServerless={runServerlessFunction}
    sendAlert={actions.addAlert}
  />
));

// Define the Extension component, taking in runServerless, context, & sendAlert as props
const Extension = ({ context, runServerless, sendAlert }) => {
  const [text, setText] = useState("");

  // Call serverless function to execute with parameters.
  // The `createQuotation` function name is configured inside `serverless.json`
  const handleClick = async () => {
    const dealId = context.crm.objectId; 
    {console.log('dealId:' + dealId);}
    const { response } = await runServerless({ name: "createQuotation", parameters: { dealId: dealId } });
    {console.log(response);}
    const message = response.status ? response.meesage : "error";
    sendAlert({ message: message });
  };

  return (
    <>
    <Flex
      direction={'row'}
      justify={'center'}>
        <Button type="submit"
        variant="primary"
        onClick={handleClick}>
          Create Quotation
        </Button>
      </Flex>
    </>
  );
};
