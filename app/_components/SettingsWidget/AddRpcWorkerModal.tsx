"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Switch,
} from "@heroui/react";

import { StandardModal } from "@/components/modals/StandardModal";
import {
  CreateRpcEndpointsInput,
  RpcEndpointProvider,
  RpcEndpointTier,
} from "@/graphql/gql/graphql";
import { rpcChainName } from "./rpcChains";

const TOKEN_PROVIDERS: RpcEndpointProvider[] = [
  RpcEndpointProvider.Drpc,
  RpcEndpointProvider.Alchemy,
];

type AddRpcWorkerModalProps = {
  isOpen: boolean;
  isLoading: boolean;
  chains: number[];
  onOpenChange: (open: boolean) => void;
  onSubmit: (input: CreateRpcEndpointsInput) => Promise<boolean>;
};

export function AddRpcWorkerModal({
  isOpen,
  isLoading,
  chains,
  onOpenChange,
  onSubmit,
}: AddRpcWorkerModalProps) {
  const [provider, setProvider] = useState<RpcEndpointProvider>(
    RpcEndpointProvider.Drpc,
  );
  const [tier, setTier] = useState<RpcEndpointTier>(RpcEndpointTier.Free);
  const [chainIds, setChainIds] = useState<string[]>([]);
  const [token, setToken] = useState("");
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("");
  const [maxBlockRange, setMaxBlockRange] = useState("");
  const [verify, setVerify] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    setToken("");
    setUrl("");
    setLabel("");
    setMaxBlockRange("");
    setVerify(true);
  }, [isOpen]);

  const usesToken = TOKEN_PROVIDERS.includes(provider);
  const singleChain = !usesToken;
  const urlValid = /^https?:\/\/\S+$/i.test(url.trim());

  const error = (() => {
    if (chainIds.length === 0) return "Choose at least one chain.";
    if (singleChain && chainIds.length > 1)
      return "A URL belongs to one chain. Pick a single chain.";
    if (usesToken && !token.trim()) return "Enter the API token.";
    if (!usesToken && !urlValid) return "Enter a http(s) URL.";
    if (maxBlockRange && !(Number(maxBlockRange) > 0))
      return "Max block range must be a positive number.";
    return null;
  })();

  const submit = async () => {
    if (error) return;

    const ok = await onSubmit({
      provider,
      tier,
      chainIds: chainIds.map(Number),
      token: usesToken ? token.trim() : null,
      url: usesToken ? null : url.trim(),
      label: label.trim() || null,
      maxBlockRange: maxBlockRange ? Number(maxBlockRange) : null,
      verify,
    });

    if (ok) onOpenChange(false);
  };

  return (
    <StandardModal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
      <ModalHeader className="px-0 pb-0">Add RPC worker</ModalHeader>

      <RadioGroup
        label="Provider"
        orientation="horizontal"
        value={provider}
        onValueChange={(value) => setProvider(value as RpcEndpointProvider)}
      >
        <Radio value={RpcEndpointProvider.Drpc}>dRPC</Radio>
        <Radio value={RpcEndpointProvider.Alchemy}>Alchemy</Radio>
        <Radio value={RpcEndpointProvider.Public}>Public URL</Radio>
        <Radio value={RpcEndpointProvider.Custom}>Custom URL</Radio>
      </RadioGroup>

      <RadioGroup
        label="Plan"
        orientation="horizontal"
        value={tier}
        onValueChange={(value) => setTier(value as RpcEndpointTier)}
      >
        <Radio value={RpcEndpointTier.Free}>Free</Radio>
        <Radio value={RpcEndpointTier.Paid}>Paid</Radio>
      </RadioGroup>

      <CheckboxGroup
        label={usesToken ? "Chains (one worker per chain)" : "Chain"}
        orientation="horizontal"
        value={chainIds}
        onValueChange={setChainIds}
      >
        {chains.map((chainId) => (
          <Checkbox key={chainId} value={String(chainId)}>
            {rpcChainName(chainId)}
          </Checkbox>
        ))}
      </CheckboxGroup>

      {usesToken ? (
        <Input
          label="API token"
          type="password"
          autoComplete="off"
          description="The endpoint URL is built on the server. The token is stored in the database and only shown masked."
          value={token}
          onValueChange={setToken}
        />
      ) : (
        <Input
          label="RPC URL"
          placeholder="https://..."
          value={url}
          onValueChange={setUrl}
          isInvalid={!!url && !urlValid}
        />
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          label="Label (optional)"
          value={label}
          onValueChange={setLabel}
        />
        <Input
          label="Max block range (optional)"
          type="number"
          min={1}
          description={
            provider === RpcEndpointProvider.Drpc &&
            tier === RpcEndpointTier.Free
              ? "dRPC free defaults to 100."
              : "Leave empty to learn it from errors."
          }
          value={maxBlockRange}
          onValueChange={setMaxBlockRange}
        />
      </div>

      <Switch isSelected={verify} onValueChange={setVerify} size="sm">
        Check the endpoint answers on the selected chain before saving
      </Switch>

      {error ? <p className="text-default-500 text-xs">{error}</p> : null}

      <ModalFooter className="px-0 pt-2">
        <Button variant="light" onPress={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          color="primary"
          isLoading={isLoading}
          isDisabled={!!error}
          onPress={submit}
        >
          Add
        </Button>
      </ModalFooter>
    </StandardModal>
  );
}
