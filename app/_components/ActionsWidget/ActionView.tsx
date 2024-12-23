import { ActionInfoFragment } from "@/graphql/gql/graphql";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { JSONTree } from "react-json-tree";
import { ActionSummary } from "./ActionSummary";

export type ActionViewProps = {
  action: ActionInfoFragment;
};

export function ActionView({ action }: ActionViewProps) {
  const args = JSON.parse(action.args);

  return (
    <Accordion isCompact variant="splitted">
      <AccordionItem key={action.id} title={<ActionSummary action={action} />}>
        <div className="border-t border-t-neutral-400/20 py-6">
          <JSONTree data={args} />
        </div>
      </AccordionItem>
    </Accordion>
  );
}
