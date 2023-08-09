import { Box, FormLabel, Input, Text } from "@chakra-ui/react";

export const labelStyle = {
  fontSize: "14px",
  color: "#4b5564",
  fontWeight: "500",
};

const inputStyle = {
  size: "md",
  fontSize: "16px",
  variant: "flushed",
  fontWeight: "500",
};

type FormInputPropType = {
  label?: string;
  placeholder: string;
  value: string;
  isError: boolean;
  errorMessage: string;
  onChange: (e: string) => void;
};

export const FormInput = ({
  label,
  placeholder,
  value,
  isError,
  errorMessage,
  onChange,
}: FormInputPropType) => {
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <FormLabel {...labelStyle} display={value ? "" : "none"}>
        {label}
      </FormLabel>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e: { target: { value: string; }; }) => onChange(e?.target?.value)}
        {...inputStyle}
      />
      {isError ? <Text color={"#E60050"}>{errorMessage}</Text> : ""}
    </Box>
  );
};
