import { SectionContainer } from "./SectionContainer";
import { GitHubIcon } from "@/components/icons/GitHubIcon";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  github?: string;
  twitter?: string;
}

const team: TeamMember[] = [
  {
    name: "Member One",
    role: "Founder & Lead Engineer",
    bio: "Systems engineer focused on DeFi infrastructure and algorithmic trading. Building verifiable execution layers for perpetual DEX protocols.",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Member Two",
    role: "Backend Engineer",
    bio: "Distributed systems and data pipeline architect. Specializing in multi-chain indexing and real-time analytics for on-chain protocols.",
    github: "https://github.com",
  },
  {
    name: "Member Three",
    role: "Smart Contract Engineer",
    bio: "Solidity developer focused on attestation protocols, on-chain verification, and minimal trust architectures across EVM chains.",
    github: "https://github.com",
  },
  {
    name: "Member Four",
    role: "Frontend Engineer",
    bio: "Building high-performance interfaces for complex trading data. Focused on real-time leaderboards and backtest visualization.",
    github: "https://github.com",
  },
];

export function TeamSection() {
  return (
    <SectionContainer id="team">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
          About Us
        </h2>
        <p className="max-w-2xl text-base text-neutral-600">
          We are a small team of infrastructure engineers building the analytics
          and verification layer for perpetual DEX trading. Our focus is
          reproducibility, transparency, and open-source tooling.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {team.map((member) => (
          <div
            key={member.name}
            className="rounded-xl border border-neutral-200 bg-neutral-50 p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-lg font-bold text-green-700">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <h3 className="mt-4 text-base font-semibold text-neutral-900">
              {member.name}
            </h3>
            <p className="text-sm font-medium text-green-600">{member.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {member.bio}
            </p>
            <div className="mt-4 flex items-center gap-3">
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 transition-colors hover:text-neutral-900"
                >
                  <GitHubIcon size={18} />
                </a>
              )}
              {member.twitter && (
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 transition-colors hover:text-neutral-900"
                >
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
