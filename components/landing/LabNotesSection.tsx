import { SectionContainer } from "./SectionContainer";

export function LabNotesSection() {
  return (
    <SectionContainer id="lab-notes">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
          Lab Notes
        </h2>
        <p className="max-w-2xl text-base text-neutral-600">
          Weekly observations from building in the open.
        </p>
      </div>

      <div className="mt-12 rounded-xl border border-dashed border-neutral-300 p-8 text-center md:p-12">
        <p className="text-sm text-neutral-500">
          First entry publishing soon. Follow the repository for updates.
        </p>
      </div>
    </SectionContainer>
  );
}
