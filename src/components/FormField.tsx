import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

interface FormFieldProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
}

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  ...textInputProps
}: FormFieldProps<T>): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <View>
            <TextInput
              style={[styles.input, !!error && styles.inputError]}
              value={typeof value === 'number' ? String(value) : value ?? ''}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor="#999"
              {...textInputProps}
            />
            <Text style={styles.error} numberOfLines={1}>
              {error?.message ?? ''}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: SPACING.sm },
  label: { ...TYPOGRAPHY.subtitle, marginBottom: SPACING.xs, color: COLORS.text },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
  inputError: { borderColor: COLORS.danger },
  error: { 
    color: COLORS.danger, 
    fontSize: 12, 
    marginTop: 2, 
    minHeight: 16 
  },
});
