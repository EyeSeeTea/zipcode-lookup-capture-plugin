import { Address } from "../domain/entities/Address";
import { states } from "./states";

export async function fetchZipcodeLookup(
  zipcode: string
): Promise<Address | null> {
  const DHIS_URL =
    process.env.REACT_APP_DHIS2_BASE_URL ??
    window.localStorage.getItem("DHIS2_BASE_URL");
  const DHIS_ROUTE = "zipcode-lookup";
  const url = `${DHIS_URL}/api/routes/${DHIS_ROUTE}/run`;

  const payload = {
    datasets: ["us-address"],
    key: {
      type: "postal_code",
      value: zipcode,
    },
    country_iso: "USA",
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  const suggestions = data?.result?.suggestions;
  if (!suggestions || suggestions.length === 0) {
    console.warn("No suggestions found");
    return null;
  }

  const allSuggestions = suggestions.filter(
    (suggestion: any) => suggestion.postal_code?.primary === zipcode
  );
  if (allSuggestions.length === 0) {
    console.warn("No matching suggestion found");
    return null;
  }
  const firstSuggestion = allSuggestions[0];
  const locality = firstSuggestion?.locality;
  const stateCode = locality?.region?.code as keyof typeof states | undefined;
  const state = states[stateCode];
  // sometimes town is not available
  const city = (locality?.town ?? locality?.sub_region)?.name;
  return {
    city,
    state,
  };
}
