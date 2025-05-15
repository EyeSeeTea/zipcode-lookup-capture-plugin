import { useMutation } from "@tanstack/react-query";
import { PluginField, SetFieldValueProps } from "../Plugin.types";
import { fetchZipcodeLookup } from "../data/fetchZipcodeLookup";
import { type Message } from "../domain/entities/Message";
import i18n from "@dhis2/d2-i18n";
import React from "react";

type Props = {
  setFieldValue: (values: SetFieldValueProps) => void;
};

export const useZipCodeLookup = ({ setFieldValue }: Props) => {
  const [message, setMessage] = React.useState<Message | null>(null);
  const setValidValue = (fieldId: PluginField, value: string) => {
    setFieldValue({
      fieldId,
      value,
      options: {
        valid: true,
        touched: true,
      },
    });
  };

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
        setValidValue("city", " ");
        setValidValue("state", " ");
        // TODO: setting empty strings is not updating the values in the form
        setValidValue("city", "");
        setValidValue("state", "");
        return;
      }
      const { city, state } = data;
      setValidValue("city", city);
      setValidValue("state", state);
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
