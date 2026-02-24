"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { FiLayers } from "react-icons/fi";
import {
  useCreateValidationPipeline,
  ValidationPipelineInfoFragment,
} from "@/app-hooks/useValidationPipeline";
import { getFragmentData } from "@/graphql/gql/fragment-masking";

export type CreatePipelineModalProps = {
  isOpen: boolean;
  onClose: () => void;
  backtestTaskId: string;
  backtestTaskName?: string;
};

export function CreatePipelineModal({
  isOpen,
  onClose,
  backtestTaskId,
  backtestTaskName,
}: CreatePipelineModalProps) {
  const router = useRouter();

  const [name, setName] = useState(
    backtestTaskName ? `Validation - ${backtestTaskName}` : "",
  );

  const { createPipeline, loading: creating } = useCreateValidationPipeline();

  const handleCreate = async () => {
    const result = await createPipeline({
      variables: {
        input: {
          name,
          backtestTaskId,
        },
      },
    });

    if (result.data?.createValidationPipeline) {
      const pipeline = getFragmentData(
        ValidationPipelineInfoFragment,
        result.data.createValidationPipeline,
      );

      onClose();
      router.push(`/validation-pipelines/${pipeline.id}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalContent>
        <ModalHeader className="flex items-center gap-2">
          <FiLayers className="h-5 w-5" />
          Create Validation Pipeline
        </ModalHeader>

        <ModalBody className="flex flex-col gap-4">
          <Input
            label="Pipeline Name"
            placeholder="Enter pipeline name"
            value={name}
            onValueChange={setName}
            variant="bordered"
            isRequired
          />

          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-3">
            <span className="text-xs font-medium text-neutral-400">
              Backtest Task
            </span>
            <p className="text-sm text-white">
              {backtestTaskName || backtestTaskId.slice(0, 12) + "..."}
            </p>
          </div>

          <p className="text-xs text-neutral-400">
            The pipeline will be created with all backtest results as candidates.
            You will configure each validation step interactively.
          </p>
        </ModalBody>

        <ModalFooter>
          <Button variant="flat" onPress={onClose} isDisabled={creating}>
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={handleCreate}
            isLoading={creating}
            isDisabled={!name}
          >
            Create Pipeline
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
