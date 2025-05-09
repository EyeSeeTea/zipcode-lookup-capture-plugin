import { useMutation } from "@tanstack/react-query";
import { SetFieldValueProps } from "../Plugin.types";
import { fetchZipcodeLookup } from "../data/fetchZipcodeLookup";
import { type Message } from "../domain/entities/Message";
import i18n from "@dhis2/d2-i18n";
import React from "react";

type Props = {
  setFieldValue: (values: SetFieldValueProps) => void;
};

export const useZipCodeLookup = ({ setFieldValue }: Props) => {
  const [message, setMessage] = React.useState<Message | null>(null);
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ zipCode }: { zipCode: string }) =>
      fetchZipcodeLookup(zipCode),
    onMutate: () => {
      setMessage(null);
    },
    onSuccess: (data) => {
      if (!data) {
        setMessage({
          type: "warning",
          text: i18n.t(
            "No address information could be found for the provided ZIP code"
          ),
        });
        return;
      }
      const { city, state } = data;
      setFieldValue({
        fieldId: "city",
        value: city,
        options: {
          valid: true,
          touched: true,
        },
      });
      setFieldValue({
        fieldId: "state",
        value: state,
        options: {
          valid: true,
          touched: true,
        },
      });
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
      setMessage({
        type: "error",
        text: i18n.t("An error occurred while fetching address information"),
      });
    },
  });

  return {
    search: (zipCode: string) => mutate({ zipCode }),
    isLoading,
    message,
  };
};
