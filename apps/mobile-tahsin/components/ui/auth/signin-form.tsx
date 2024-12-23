import React from "react";
import { ThemedView } from "@/components/ThemedView";
import InputWithLabel from "@/components/form/InputWithLabel";
import { TextInputProps, View } from "react-native";
import PrimaryButton from "@/components/buttons/primary-button";
import { Colors } from "@/constants/Colors";
import ErrorLabel from "@/components/form/error-label";

export type FormField = {
  label: string;
  name: string;
  type: TextInputProps["textContentType"];
  constraint?: string;
};

const FORM_FIELD: FormField[] = [
  {
    name: "username",
    label: "Username",
    type: "username",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
];

const SigninForm = () => {
  const [error, setError] = React.useState<Error | null>(null);
  const [payload, setPayload] = React.useState<Record<string, string>>({});

  const isFormValid = FORM_FIELD.every(
    (field) => payload[field.name] && payload[field.name].trim() !== "",
  );

  const handleInputChange = (name: string, value: string) => {
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!payload.username || !payload.password) {
      setError(new Error("Username atau password tidak boleh kosong"));
      return;
    }

    setError(null);
    console.log("Payload submitted:", payload);
  };

  return (
    <View style={{ width: "80%" }}>
      <ThemedView style={{ gap: 24 }}>
        {FORM_FIELD.map((field) => (
          <InputWithLabel
            label={field.label}
            key={field.name}
            type={field.type}
            value={payload[field.name] || ""}
            onChangeText={(value: string): void =>
              handleInputChange(field.name, value)
            }
          />
        ))}
      </ThemedView>
      {error ? (
        <ErrorLabel error={error.message} />
      ) : (
        <View style={{ height: 45 }} />
      )}
      <PrimaryButton
        width={"100%"}
        text={"Masuk"}
        color={"#fff"}
        backgroundColor={
          (isFormValid ? Colors.primary.pMutedTeal : "#97B6BD") as string
        }
        onPress={handleSubmit} // Trigger submission logic
      />
    </View>
  );
};

export default SigninForm;
