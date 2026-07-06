import {
  ASSET_SIZES,
  CCAAS_PLATFORMS,
  CORE_PLATFORMS,
  CRM_PLATFORMS,
  CUSTOMER_FACING_EMPLOYEES,
  DATA_ENVIRONMENTS,
  INSTITUTION_TYPES,
  RESPONDENT_ROLES,
} from "./constants";

function findLabel<T extends { value: string; label: string }>(
  options: readonly T[],
  value: string
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

export function formatInstitutionType(value: string): string {
  return findLabel(INSTITUTION_TYPES, value);
}

export function formatAssetSize(value: string): string {
  return findLabel(ASSET_SIZES, value);
}

export function formatCustomerFacingEmployees(value: string | null | undefined): string {
  if (!value) return "—";
  return findLabel(CUSTOMER_FACING_EMPLOYEES, value);
}

export function formatRespondentRole(value: string | null | undefined): string {
  if (!value) return "—";
  return findLabel(RESPONDENT_ROLES, value);
}

export function formatCcaasPlatform(value: string): string {
  return findLabel(CCAAS_PLATFORMS, value);
}

export function formatCrmPlatform(value: string): string {
  return findLabel(CRM_PLATFORMS, value);
}

export function formatCorePlatform(value: string): string {
  return findLabel(CORE_PLATFORMS, value);
}

export function formatDataEnvironment(value: string): string {
  return findLabel(DATA_ENVIRONMENTS, value);
}
