import React from "react";
import { View } from "react-native";
import { FormField } from "@/components/ui/auth/signin-form";
import PrimaryButton from "@/components/buttons/primary-button";
import { ThemedView } from "@/components/ThemedView";
import InputWithLabel from "@/components/form/InputWithLabel";
import { Colors } from "@/constants/Colors";

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
    constraint: "min. 8 karakter unik",
  },
  {
    name: "emailAddress",
    label: "Email",
    type: "emailAddress",
  },
];

const SignupForm = () => {
  const [payload, setPayload] = React.useState<Record<string, string>>({});

  const isFormValid = FORM_FIELD.every(
    (field) => payload[field.name] && payload[field.name].trim() !== "",
  );

  const handleInputChange = (name: string, value: string) => {
    setPayload((prev: Record<string, string>) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Payload:", payload);
  };

  return (
    <View style={{ width: "80%" }}>
      <ThemedView style={{ gap: 24, marginBottom: 45 }}>
        {FORM_FIELD.map((field: FormField) => (
          <InputWithLabel
            label={field.label}
            constraint={field.constraint}
            key={field.name}
            type={field.type}
            value={payload[field.name] || ""}
            onChangeText={(value: string): void =>
              handleInputChange(field.name, value)
            }
          />
        ))}
      </ThemedView>
      <PrimaryButton
        width={"100%"}
        text={"Daftar"}
        color={"#fff"}
        backgroundColor={
          (isFormValid ? Colors.primary.pMutedTeal : "#97B6BD") as string
        }
        onPress={handleSubmit}
        disabled={!isFormValid}
      />
    </View>
  );
};

export default SignupForm;
