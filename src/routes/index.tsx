import { createFileRoute } from "@tanstack/react-router";
import { usePashu } from "@/context/pashu-context";
import { FarmerHome } from "@/components/pashu/FarmerHome";
import { VetHome } from "@/components/pashu/VetHome";
import { GovHome } from "@/components/pashu/GovHome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PashuParvah — AI Livestock Disease Detection" },
      {
        name: "description",
        content:
          "AI-assisted livestock disease detection and health management for Indian farmers, veterinarians and government officials.",
      },
      { property: "og:title", content: "PashuParvah — AI Livestock Disease Detection" },
      {
        property: "og:description",
        content: "Report symptoms, get AI risk scores, and track outbreaks across villages.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { role } = usePashu();
  if (role === "vet") return <VetHome />;
  if (role === "gov") return <GovHome />;
  return <FarmerHome />;
}
