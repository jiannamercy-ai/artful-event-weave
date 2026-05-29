import { createFileRoute } from "@tanstack/react-router";
import { Legal } from "./privacy";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Service — Linchry Events" }, { name: "description", content: "Terms for engaging Linchry Events." }] }),
  component: () => <Legal title="Terms of Service" />,
});
