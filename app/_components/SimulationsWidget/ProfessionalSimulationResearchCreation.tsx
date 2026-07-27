"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Button, Card, CardBody, Textarea } from "@heroui/react";

import {
  getImportedConfigurationSimulationCount,
  parseImportedResearchConfiguration,
  SimulationCreationPanel,
} from "./SimulationCreationPanel";

type ParsedConfiguration = {
  text: string;
  title: string;
  simulationCount: number;
};

function parseProfessionalConfigurations(
  rawText: string,
): ParsedConfiguration[] {
  let value: unknown;

  try {
    value = JSON.parse(rawText);
  } catch {
    throw new Error("Configurations must be valid JSON");
  }

  const configurations = Array.isArray(value) ? value : [value];
  if (configurations.length === 0) {
    throw new Error(
      "Provide one configuration or a non-empty configuration array",
    );
  }

  return configurations.map((configuration, index) => {
    try {
      const parsed = parseImportedResearchConfiguration(
        JSON.stringify(configuration),
      );
      return {
        text: JSON.stringify(configuration),
        title: parsed.title,
        simulationCount: getImportedConfigurationSimulationCount(parsed),
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Invalid configuration";
      throw new Error(`Configuration ${index + 1}: ${message}`);
    }
  });
}

export function ProfessionalSimulationResearchCreation({
  sourceSimulationId,
}: {
  sourceSimulationId?: number;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [rawText, setRawText] = useState("");
  const [configurations, setConfigurations] = useState<ParsedConfiguration[]>(
    [],
  );
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"import" | "review" | "complete">("import");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [createdResearchIds, setCreatedResearchIds] = useState<number[]>([]);

  const validateConfigurations = () => {
    setError(null);
    try {
      const parsed = parseProfessionalConfigurations(rawText);
      setConfigurations(parsed);
    } catch (validationError) {
      setConfigurations([]);
      setError(
        validationError instanceof Error
          ? validationError.message
          : "Unable to validate configurations",
      );
    }
  };

  const startReview = () => {
    if (configurations.length === 0) {
      validateConfigurations();
      return;
    }
    setCurrentIndex(0);
    setCreatedResearchIds([]);
    setStep("review");
  };

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    try {
      setRawText(await file.text());
      setConfigurations([]);
      setError(null);
    } catch {
      setError("Unable to read the selected JSON file");
    }
  };

  const totalSimulations = configurations.reduce(
    (total, configuration) => total + configuration.simulationCount,
    0,
  );

  if (step === "complete") {
    return (
      <Card
        className="bg-content1 max-w-3xl border border-emerald-500/30"
        shadow="none"
      >
        <CardBody className="gap-4 p-6">
          <h1 className="text-xl font-bold text-white">
            Batch creation complete
          </h1>
          <p className="text-sm text-neutral-300">
            Created {createdResearchIds.length} simulation research
            {createdResearchIds.length === 1 ? "" : "es"}. Each can now be
            monitored independently.
          </p>
          <div className="flex flex-wrap gap-2">
            {createdResearchIds.map((id) => (
              <Button
                key={id}
                as={Link}
                href={`/simulations/research/${id}`}
                size="sm"
                variant="flat"
              >
                Research {id}
              </Button>
            ))}
            <Button as={Link} href="/simulations" color="primary" size="sm">
              View researches
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }

  if (step === "review") {
    const configuration = configurations[currentIndex];
    return (
      <div className="flex max-w-6xl flex-col gap-6">
        <Card
          className="border-primary-500/30 bg-content1 border"
          shadow="none"
        >
          <CardBody className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-primary-400 text-sm font-medium">
                Review {currentIndex + 1} of {configurations.length}
              </p>
              <h1 className="text-lg font-bold text-white">
                {configuration.title}
              </h1>
              <p className="text-sm text-neutral-400">
                {configuration.simulationCount} generated simulation
                {configuration.simulationCount === 1 ? "" : "s"} for this
                research.
              </p>
            </div>
            <Button variant="flat" onPress={() => setStep("import")}>
              Edit batch
            </Button>
          </CardBody>
        </Card>

        <SimulationCreationPanel
          key={`${currentIndex}-${configuration.text}`}
          compactHeading
          sourceSimulationId={sourceSimulationId}
          initialConfigurationText={configuration.text}
          hideConfigurationImporter
          onCreated={(researchId) => {
            setCreatedResearchIds((ids) => [...ids, researchId]);
            if (currentIndex + 1 === configurations.length) {
              setStep("complete");
              return;
            }
            setCurrentIndex((index) => index + 1);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex max-w-4xl flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Link
          className="text-primary-400 text-sm hover:underline"
          href={`/simulations/create${sourceSimulationId ? `?sourceSimulationId=${sourceSimulationId}` : ""}`}
        >
          Back to standard creation
        </Link>
        <h1 className="text-2xl font-bold text-white">
          Professional research creation
        </h1>
        <p className="text-sm text-neutral-400">
          Validate one research configuration or an ordered JSON array, then
          review and create each research in sequence.
        </p>
      </div>

      <Card className="border-default-200 bg-content1 border" shadow="none">
        <CardBody className="gap-4 p-5">
          <Textarea
            minRows={14}
            value={rawText}
            onValueChange={(value) => {
              setRawText(value);
              setConfigurations([]);
              setError(null);
            }}
            label="Research configuration or configuration array"
            placeholder={
              '[{"version": 2, "title": "First research", ...}, {"version": 2, "title": "Next research", ...}]'
            }
            isInvalid={Boolean(error)}
            errorMessage={error ?? undefined}
          />
          <input
            ref={fileInputRef}
            className="hidden"
            type="file"
            accept="application/json,.json"
            onChange={(event) => {
              void handleFile(event.target.files?.[0]);
              event.target.value = "";
            }}
          />
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="flat"
              onPress={() => fileInputRef.current?.click()}
            >
              Choose JSON file
            </Button>
            <Button
              size="sm"
              color="primary"
              isDisabled={!rawText.trim()}
              onPress={validateConfigurations}
            >
              Parse configurations
            </Button>
          </div>

          {configurations.length > 0 ? (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm text-neutral-200">
              <p className="font-semibold text-emerald-400">
                Ready to create {configurations.length} research
                {configurations.length === 1 ? "" : "es"} containing{" "}
                {totalSimulations} simulation{totalSimulations === 1 ? "" : "s"}
                .
              </p>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-neutral-400">
                {configurations.map((configuration, index) => (
                  <li key={`${configuration.title}-${index}`}>
                    {configuration.title} — {configuration.simulationCount}{" "}
                    simulation{configuration.simulationCount === 1 ? "" : "s"}
                  </li>
                ))}
              </ol>
              <Button className="mt-4" color="primary" onPress={startReview}>
                Confirm and review first research
              </Button>
            </div>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
}
