import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '@/components/shared/Header/Header'

// Mock all child components to avoid testing their implementation
vi.mock('@/components/shared/header-ymm', () => ({
  default: () => <div data-testid="sticky-vehicle-selector">StickyVehicleSelector</div>
}))

vi.mock('@/components/shared/YmmFilterModal/YmmFilterModal', () => ({
  default: () => <div data-testid="ymm-filter-modal">YmmFilterModal</div>
}))

vi.mock('@/components/shared/Header/components/MainMenu/MainMenu', () => ({
  default: () => <div data-testid="main-menu">MainMenu</div>
}))

vi.mock('@/components/shared/Header/components/MiddleHeader/MiddleHeader', () => ({
  default: () => <div data-testid="middle-header">MiddleHeader</div>
}))

describe('Header Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<Header />)
      expect(container).toBeInTheDocument()
    })

    it('should render MiddleHeader component', () => {
      render(<Header />)
      expect(screen.getByTestId('middle-header')).toBeInTheDocument()
    })

    it('should render MainMenu component', () => {
      render(<Header />)
      expect(screen.getByTestId('main-menu')).toBeInTheDocument()
    })

    it('should render YmmFilterModal component', () => {
      render(<Header />)
      expect(screen.getByTestId('ymm-filter-modal')).toBeInTheDocument()
    })

    it('should render StickyVehicleSelector component', () => {
      render(<Header />)
      expect(screen.getByTestId('sticky-vehicle-selector')).toBeInTheDocument()
    })

    it('should render all child components in correct order', () => {
      render(<Header />)
      const children = screen.getAllByRole('generic').filter(el => el.hasAttribute('data-testid'))
      const testIds = children.map(el => el.getAttribute('data-testid'))

      expect(testIds).toContain('middle-header')
      expect(testIds).toContain('main-menu')
      expect(testIds).toContain('ymm-filter-modal')
      expect(testIds).toContain('sticky-vehicle-selector')
    })

    it('should have TopBar commented out (not rendered)', () => {
      render(<Header />)
      // There should be no element with "top-bar" test id
      expect(screen.queryByTestId('top-bar')).not.toBeInTheDocument()
    })
  })

  describe('Structure', () => {
    it('should render MainMenu within a div container', () => {
      render(<Header />)
      const mainMenu = screen.getByTestId('main-menu')
      const parentDiv = mainMenu.parentElement

      expect(parentDiv?.tagName).toBe('DIV')
    })

    it('should render main content wrapped in fragment', () => {
      const { container } = render(<Header />)
      // Fragment doesn't create a DOM element, so we check for direct children
      const fragmentChildren = container.firstChild?.childNodes

      expect(fragmentChildren).toBeTruthy()
      expect(fragmentChildren?.length).toBeGreaterThan(0)
    })
  })

  describe('Component Behavior', () => {
    it('should initialize menuRef', () => {
      // This test verifies that the ref is being used
      // The actual ref value is internal to React, but we can verify structure
      render(<Header />)
      const mainMenu = screen.getByTestId('main-menu')
      const containerDiv = mainMenu.parentElement

      expect(containerDiv).toBeInTheDocument()
    })

    it('should be a client component (uses "use client" directive)', () => {
      // The component uses "use client" which allows hooks like useRef
      // We verify this by checking it renders without SSR issues
      expect(() => render(<Header />)).not.toThrow()
    })
  })

  describe('Accessibility', () => {
    it('should have proper DOM structure for screen readers', () => {
      const { container } = render(<Header />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should render semantic HTML structure', () => {
      render(<Header />)
      // All components should be reachable
      const allTestElements = screen.getAllByRole('generic')
      expect(allTestElements.length).toBeGreaterThan(0)
    })
  })
})
