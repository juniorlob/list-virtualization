/**
 * Unit tests for core virtualization types.
 * Verifies that all types are properly exported and can be used.
 */

import { describe, it, expect } from 'vitest';
import type {
  VisibleRange,
  ItemPosition,
  VirtualizationOptions,
  VirtualizationResult,
  PerformanceMetrics,
  IVirtualizationCalculator,
  IPerformanceMonitor,
} from '../../../src/core/virtualization';

describe('Core Virtualization Types', () => {
  describe('Type Exports', () => {
    it('should export VisibleRange type', () => {
      const range: VisibleRange = { start: 0, end: 10 };
      expect(range.start).toBe(0);
      expect(range.end).toBe(10);
    });

    it('should export ItemPosition type', () => {
      const position: ItemPosition = { top: 100, height: 50 };
      expect(position.top).toBe(100);
      expect(position.height).toBe(50);
    });

    it('should export PerformanceMetrics type', () => {
      const metrics: PerformanceMetrics = {
        fps: 60,
        memoryUsage: 50,
        domNodes: 100,
        renderTime: 16,
      };
      expect(metrics.fps).toBe(60);
      expect(metrics.memoryUsage).toBe(50);
      expect(metrics.domNodes).toBe(100);
      expect(metrics.renderTime).toBe(16);
    });

    it('should export VirtualizationOptions type', () => {
      const options: VirtualizationOptions = {
        containerHeight: 600,
        overscan: 3,
        enablePerformanceMonitoring: true,
      };
      expect(options.containerHeight).toBe(600);
      expect(options.overscan).toBe(3);
      expect(options.enablePerformanceMonitoring).toBe(true);
    });
  });

  describe('Interface Contracts', () => {
    it('should define IVirtualizationCalculator interface', () => {
      // Mock implementation to verify interface contract
      const mockCalculator: IVirtualizationCalculator = {
        calculateVisibleRange: (scrollTop, containerHeight, itemCount, itemHeight, overscan) => {
          return { start: 0, end: 10 };
        },
        calculateItemPosition: (index, itemHeight) => {
          return { top: index * itemHeight, height: itemHeight };
        },
        calculateTotalHeight: (itemCount, itemHeight) => {
          return itemCount * itemHeight;
        },
      };

      expect(mockCalculator.calculateVisibleRange(0, 600, 100, 50, 3)).toEqual({
        start: 0,
        end: 10,
      });
      expect(mockCalculator.calculateItemPosition(5, 50)).toEqual({
        top: 250,
        height: 50,
      });
      expect(mockCalculator.calculateTotalHeight(100, 50)).toBe(5000);
    });

    it('should define IPerformanceMonitor interface', () => {
      // Mock implementation to verify interface contract
      const mockMonitor: IPerformanceMonitor = {
        startMonitoring: (callback) => {
          // Mock implementation
        },
        stopMonitoring: () => {
          // Mock implementation
        },
        getMetrics: () => {
          return {
            fps: 60,
            memoryUsage: 50,
            domNodes: 100,
            renderTime: 16,
          };
        },
      };

      const metrics = mockMonitor.getMetrics();
      expect(metrics.fps).toBe(60);
      expect(metrics.memoryUsage).toBe(50);
      expect(metrics.domNodes).toBe(100);
      expect(metrics.renderTime).toBe(16);
    });
  });

  describe('Type Safety', () => {
    it('should enforce VisibleRange structure', () => {
      const range: VisibleRange = { start: 0, end: 10 };

      // TypeScript will catch these at compile time
      expect(typeof range.start).toBe('number');
      expect(typeof range.end).toBe('number');
    });

    it('should enforce ItemPosition structure', () => {
      const position: ItemPosition = { top: 100, height: 50 };

      expect(typeof position.top).toBe('number');
      expect(typeof position.height).toBe('number');
    });

    it('should enforce PerformanceMetrics structure', () => {
      const metrics: PerformanceMetrics = {
        fps: 60,
        memoryUsage: 50,
        domNodes: 100,
        renderTime: 16,
      };

      expect(typeof metrics.fps).toBe('number');
      expect(typeof metrics.memoryUsage).toBe('number');
      expect(typeof metrics.domNodes).toBe('number');
      expect(typeof metrics.renderTime).toBe('number');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty visible range', () => {
      const emptyRange: VisibleRange = { start: 0, end: -1 };
      expect(emptyRange.start).toBe(0);
      expect(emptyRange.end).toBe(-1);
      expect(emptyRange.end - emptyRange.start + 1).toBe(0);
    });

    it('should handle zero values in metrics', () => {
      const zeroMetrics: PerformanceMetrics = {
        fps: 0,
        memoryUsage: 0,
        domNodes: 0,
        renderTime: 0,
      };
      expect(zeroMetrics.fps).toBe(0);
      expect(zeroMetrics.memoryUsage).toBe(0);
      expect(zeroMetrics.domNodes).toBe(0);
      expect(zeroMetrics.renderTime).toBe(0);
    });

    it('should handle single item range', () => {
      const singleRange: VisibleRange = { start: 0, end: 0 };
      expect(singleRange.start).toBe(0);
      expect(singleRange.end).toBe(0);
      expect(singleRange.end - singleRange.start + 1).toBe(1);
    });
  });
});
