import { Address } from "../domain/entities/Address";

// alternative implementation example using zippopotam.us API

export async function fetchZipcodeLookupZippo(
  zipcode: string
): Promise<Address | null> {
  const url = `https://api.zippopotam.us/us/${zipcode}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  const place = data?.places?.[0];
  if (!place) {
    console.warn("No suggestions found");
    return null;
  }
  return {
    city: place["place name"],
    state: place.state,
  };
}
