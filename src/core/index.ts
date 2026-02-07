/**
 * Core module exports.
 *
 * This module contains pure business logic with zero external dependencies.
 * All functions are pure with no side effects, making them easily testable.
 *
 * @module core
 */

// Export virtualization types and interfaces
export type {
  VisibleRange,
  ItemPosition,
  VirtualizationOptions,
  VirtualizationResult,
  PerformanceMetrics,
  IVirtualizationCalculator,
  IPerformanceMonitor,
} from './virtualization';
