import { ActionInfoFragment } from "@/graphql/gql/graphql";
import { Accordion, AccordionItem } from "@heroui/react";
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import { ActionSummary } from "./ActionSummary";
import { bigIntSafeJsonParse, bigIntSafeJsonStringify } from "@/utils";

export type ActionViewProps = {
  action: ActionInfoFragment;
};

export function ActionView({ action }: ActionViewProps) {
  const args = JSON.parse(
    bigIntSafeJsonStringify(bigIntSafeJsonParse(action.args)),
  );

  return (
    <Accordion isCompact variant="splitted">
      <AccordionItem key={action.id} title={<ActionSummary action={action} />}>
        <div className="border-t border-t-neutral-400/20 py-6">
          <JsonView
            data={args}
            shouldExpandNode={allExpanded}
            style={defaultStyles}
          />
        </div>
      </AccordionItem>
    </Accordion>
  );
}
