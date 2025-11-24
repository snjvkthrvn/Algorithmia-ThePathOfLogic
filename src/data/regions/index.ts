/**
 * ALGORITHMIA: THE PATH OF LOGIC
 * Main export for all region data
 */

// Export types
export * from '../types';

// Export Prologue
export * from './prologue';

// Export Array Plains
export * from './arrayplains';

// Export Twin Rivers
export * from './twinrivers';

// Region registry for easy lookup
import { prologueConfig } from './prologue';
import { arrayPlainsConfig } from './arrayplains';
import { twinRiversConfig } from './twinrivers';

export const ALL_REGIONS = {
  prologue: prologueConfig,
  arrayplains: arrayPlainsConfig,
  twinrivers: twinRiversConfig
} as const;

export type RegionId = keyof typeof ALL_REGIONS;
