/**
 * Core virtualization module.
 *
 * This module provides pure calculation functions and type definitions
 * for implementing efficient list virtualization. All functions are pure
 * with no side effects, making them easily testable and reusable.
 *
 * @module core/virtualization
 */

// Export all types and interfaces
export type {
  VisibleRange,
  ItemPosition,
  VirtualizationOptions,
  VirtualizationResult,
  PerformanceMetrics,
  IVirtualizationCalculator,
  IPerformanceMonitor,
} from './types';

// Export calculator implementation
export { VirtualizationCalculator } from './calculator';
