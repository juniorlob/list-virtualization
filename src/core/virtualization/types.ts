/**
 * Core type definitions for list virtualization.
 * These types represent the fundamental data structures used throughout the virtualization system.
 */

/**
 * Represents the range of visible items in the viewport.
 * Includes items in the viewport plus overscan buffer above and below.
 */
export interface VisibleRange {
  /** First visible item index (inclusive) */
  start: number;
  /** Last visible item index (inclusive) */
  end: number;
}

/**
 * Represents the calculated position of a list item.
 * Used for absolute positioning of items in the virtualized list.
 */
export interface ItemPosition {
  /** Absolute top position in pixels from the container top */
  top: number;
  /** Height of the item in pixels */
  height: number;
}

/**
 * Configuration options for virtualization behavior.
 */
export interface VirtualizationOptions {
  /** Height of the scrollable container in pixels */
  containerHeight: number;
  /** Number of items to render above and below the visible viewport (default: 3) */
  overscan?: number;
  /** Custom calculator instance for dependency injection */
  calculator?: IVirtualizationCalculator;
  /** Enable performance monitoring (default: false) */
  enablePerformanceMonitoring?: boolean;
}

/**
 * Result returned by the useVirtualization hook.
 */
export interface VirtualizationResult {
  /** Current visible range of items */
  visibleRange: VisibleRange;
  /** Total height of all items combined in pixels */
  totalHeight: number;
  /** Current performance metrics */
  metrics: PerformanceMetrics;
  /** Scroll event handler to attach to the container */
  onScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  /** Reference to the scroll container element */
  containerRef: React.RefObject<HTMLDivElement>;
}

/**
 * Performance metrics collected during virtualization.
 */
export interface PerformanceMetrics {
  /** Frames per second during scrolling */
  fps: number;
  /** JavaScript heap memory usage in megabytes */
  memoryUsage: number;
  /** Number of DOM nodes in the rendered list */
  domNodes: number;
  /** Last render time in milliseconds */
  renderTime: number;
}

/**
 * Interface for the virtualization calculator.
 * Defines pure calculation functions with no side effects.
 */
export interface IVirtualizationCalculator {
  /**
   * Calculate which items are visible in the viewport.
   *
   * @param scrollTop - Current vertical scroll position in pixels
   * @param containerHeight - Height of the scrollable container in pixels
   * @param itemCount - Total number of items in the list
   * @param itemHeight - Height of each item in pixels (fixed height)
   * @param overscan - Number of items to render above and below viewport
   * @returns The range of visible items including overscan
   */
  calculateVisibleRange(
    scrollTop: number,
    containerHeight: number,
    itemCount: number,
    itemHeight: number,
    overscan: number
  ): VisibleRange;

  /**
   * Calculate the absolute position of an item.
   *
   * @param index - Index of the item in the list
   * @param itemHeight - Height of the item in pixels
   * @returns The position information for the item
   */
  calculateItemPosition(
    index: number,
    itemHeight: number
  ): ItemPosition;

  /**
   * Calculate the total height of all items.
   *
   * @param itemCount - Total number of items in the list
   * @param itemHeight - Height of each item in pixels
   * @returns Total height in pixels
   */
  calculateTotalHeight(
    itemCount: number,
    itemHeight: number
  ): number;
}

/**
 * Interface for performance monitoring.
 * Defines methods for collecting and reporting performance metrics.
 */
export interface IPerformanceMonitor {
  /**
   * Start monitoring performance metrics.
   *
   * @param callback - Function to call with updated metrics
   */
  startMonitoring(callback: (metrics: PerformanceMetrics) => void): void;

  /**
   * Stop monitoring and clean up resources.
   */
  stopMonitoring(): void;

  /**
   * Get current performance metrics.
   *
   * @returns Current metrics snapshot
   */
  getMetrics(): PerformanceMetrics;
}
