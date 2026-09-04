import { demoTransactions } from "../data/demoData";

export async function getTransactions() {
  await new Promise((resolve) => setTimeout(resolve, 450));
  return demoTransactions;
}
