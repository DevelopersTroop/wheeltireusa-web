# StickyVehicleBar Component

## Overview

A sticky vehicle selection bar that appears at the top of the page when scrolling. It allows users to select their vehicle (Year/Make/Model/Trim/Drive) and navigate to either Tires or Wheels product categories based on their selection.

**Key Features:**

- Sticky header that appears when scrolling past the hero YMM section
- Desktop: Shows Tires/Wheels toggle on hover, compact dropdowns
- Mobile: Collapsible accordion-style interface
- Auto-opens subsequent dropdowns when previous selection is made
- Syncs with active garage vehicle on page load
- Persists selections to Redux garage state

---

## File Structure

```
StickyVehicleBar/
├── index.tsx                 # Main component entry point
├── CategoryToggle/           # Tires/Wheels category selector
│   └── index.tsx
├── VehicleDropdowns/         # YMM dropdown list component
│   └── index.tsx
├── GoButton/                 # Submit button component
│   └── index.tsx
├── DesktopView/              # Desktop layout composition
│   └── index.tsx
├── MobileView/               # Mobile layout composition
│   └── index.tsx
├── hooks/                    # Custom hooks
│   ├── index.ts
│   ├── useMobileDetection/
│   ├── useScrollVisibility/
│   ├── useAutoOpenDropdowns/
│   ├── useGarageSync/
│   └── useTrackedHandlers/
└── CLAUDE.md                 # This file
```

---

## Types & Interfaces

### Category

```typescript
type Category = "tire" | "wheels";
```

### YmmValues

```typescript
interface YmmValues {
  year?: string;
  make?: string;
  model?: string;
  trim?: string;
  drive?: string;
}
```

### YmmData

```typescript
interface YmmData {
  years: string[];
  makes: string[];
  models: string[];
  trims: string[];
  drives: string[];
}
```

### YmmLoading

```typescript
interface YmmLoading {
  isYearLoading: boolean;
  isMakeLoading: boolean;
  isModelLoading: boolean;
  isTrimLoading: boolean;
  isDriveLoading: boolean;
}
```

### YmmDisabled

```typescript
interface YmmDisabled {
  isYearDisabled: boolean;
  isMakeDisabled: boolean;
  isModelDisabled: boolean;
  isTrimDisabled: boolean;
  isDriveDisabled: boolean;
}
```

### YmmHandlers

```typescript
interface YmmHandlers {
  onYearChange: (value: string) => void;
  onMakeChange: (value: string) => void;
  onModelChange: (value: string) => void;
  onTrimChange: (value: string) => void;
  onDriveChange: (value: string) => void;
}
```

### DropdownState

```typescript
interface DropdownState {
  openMake: boolean;
  openModel: boolean;
  openTrim: boolean;
  openDrive: boolean;
}
```

---

## Custom Hooks

### `useMobileDetection(breakpoint?: number)`

Detects if the viewport is mobile-sized.

- **Param:** `breakpoint` - Max width for mobile (default: 767px)
- **Returns:** `boolean` - `true` if mobile viewport

### `useScrollVisibility(sentinelRef)`

Detects scroll visibility using Intersection Observer.

- **Param:** `sentinelRef` - Ref to sentinel element
- **Returns:** `boolean` - `true` when sentinel is not intersecting (scrolled past)

### `useAutoOpenDropdowns(loading, data, values)`

Manages auto-open state for dropdowns after manual user changes.

- **Params:**
  - `loading: YmmLoading` - Loading states for each dropdown
  - `data: YmmData` - Available options for each dropdown
  - `values: YmmValues` - Currently selected values
- **Returns:**
  - `dropdownState: DropdownState` - Open/closed state for each dropdown
  - `setOpenMake`, `setOpenModel`, `setOpenTrim`, `setOpenDrive` - Setters for manual control
  - `markManualChange` - Function to call when user makes a manual selection

**Auto-open Behavior:**

- Only triggers AFTER user makes first manual change
- Make dropdown opens when Year is selected and makes are loaded
- Model dropdown opens when Make is selected and models are loaded
- Trim dropdown opens when Model is selected and trims are loaded
- Drive dropdown opens when Trim is selected and drives are loaded

### `useGarageSync(activeGarageItem, currentValues, handlers)`

Syncs YMM values with active garage item on mount.

- **Params:**
  - `activeGarageItem` - The active garage vehicle (if any)
  - `currentValues` - Current YMM values (prevents overwriting user changes)
  - `handlers` - YMM change handlers
- **Behavior:** Fills in YMM values from garage on mount, but only if current values are empty

### `useTrackedHandlers(originalHandlers, markManualChange)`

Wraps handlers to track manual user changes.

- **Params:**
  - `originalHandlers` - Original YMM change handlers
  - `markManualChange` - Callback to invoke when user makes a change
- **Returns:** Wrapped handlers that call `markManualChange` before invoking original

---

## Sub-Components

### CategoryToggle

Renders Tires/Wheels toggle buttons.

**Props:**

```typescript
interface CategoryToggleProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
  variant?: "desktop" | "mobile";
}
```

**Variants:**

- **Desktop:** Hidden by default, animates in on hover with opacity + height transition
- **Mobile:** Always visible when parent is expanded

### VehicleDropdowns

Renders the list of YMM dropdowns.

**Props:**

```typescript
interface VehicleDropdownsProps {
  values: YmmValues;
  data: YmmData;
  loading: YmmLoading;
  disabled: YmmDisabled;
  handlers: YmmHandlers;
  dropdownState: DropdownState;
  onOpenChange: {
    make: (open: boolean) => void;
    model: (open: boolean) => void;
    trim: (open: boolean) => void;
    drive: (open: boolean) => void;
  };
  compact?: boolean;
}
```

**Behavior:**

- Dynamically shows Trim dropdown when trims are available
- Dynamically shows Drive dropdown when drives are available
- Filters out `__DEFAULT_MAKE__` from make options
- Handles `__DEFAULT_*` values for other dropdowns

### GoButton

Submit button component.

**Props:**

```typescript
interface GoButtonProps {
  onSubmit: () => void;
  disabled: boolean;
  variant?: "desktop" | "mobile";
}
```

**Variants:**

- **Desktop:** Compact height (`h-9`), inline with dropdowns
- **Mobile:** Full width, larger padding (`py-3`)

### DesktopView

Desktop layout composition.

**Props:**

```typescript
interface DesktopViewProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
  dropdownsProps: VehicleDropdownsProps;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
}
```

**Layout:**

- Two-line layout
- Line 1: Category toggle (hidden, shows on hover)
- Line 2: Dropdowns + GO button

### MobileView

Mobile layout composition.

**Props:**

```typescript
interface MobileViewProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
  isOpen: boolean;
  onToggle: () => void;
  dropdownsProps: VehicleDropdownsProps;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
}
```

**Layout:**

- Collapsible header with "SELECT VEHICLE" label
- When expanded: Category toggle, dropdowns (stacked), GO button (full width)

---

## State Management

### Local State

```typescript
const [category, setCategory] = useState<Category>("wheels");
const [isMobileOpen, setIsMobileOpen] = useState(false);
```

### Redux State

- `state.persisted.yearMakeModel.isHomeYmmInView` - Whether hero YMM is visible in viewport
- `state.persisted.yearMakeModel.garage` - Garage vehicles dictionary
- `state.persisted.yearMakeModel.activeGarageId` - Currently active garage vehicle ID

### Redux Actions

- `addToGarage(item)` - Adds vehicle to garage
- `submitYmm(item)` - Submits YMM selection

---

## Behavior Details

### Scroll Detection

- Uses Intersection Observer on a sentinel element (1px tall div)
- Bar appears when sentinel scrolls out of viewport AND hero YMM is not in view
- Condition: `isVisible && !isHomeYmmInView`

### Garage Sync Flow

1. Component mounts
2. If `activeGarageId` exists, retrieve from garage
3. If current YMM values are empty, fill from garage item
4. Skip if user has already made selections

### Auto-Open Flow

1. User makes first manual selection → `hasUserManuallyChangedRef.current = true`
2. Data loads for next dropdown
3. Auto-open effect detects data is ready
4. Opens next dropdown automatically
5. User can close manually - won't reopen until next selection

### Submission Flow

1. User clicks GO (or form auto-submits if enabled)
2. Creates `TYmmGarageItem` with current selections
3. Filters out `__DEFAULT_*` values
4. Dispatches `addToGarage` and `submitYmm`
5. Routes based on category:
   - Tires → `/collections/product-category/tires`
   - Wheels → `/collections/product-category/wheels`

---

## Dependencies

### External

- `react` - UI framework
- `lucide-react` - Icons (CarFront, ChevronDown)
- `next/navigation` - Router
- `@/redux/store` - Redux store hooks
- `@/redux/features/yearMakeModelSlice` - YMM state/actions
- `@/types/ymm` - YMM type definitions
- `@/lib/utils` - Utility functions (cn)
- `@/hooks/useYmm` - YMM hook for data fetching

### Internal

- `../YmmCustomSelect/YmmCustomSelect` - Reusable dropdown component

---

## Usage Example

```tsx
import StickyVehicleBar from "@/components/shared/StickyVehicleBar";

function Layout() {
  return (
    <>
      <HeroSection />
      <StickyVehicleBar />
      <PageContent />
    </>
  );
}
```

The component handles its own visibility based on scroll position - no props needed.

---

## Important Notes

1. **Sentinel Element:** The 1px sentinel div is CRITICAL for scroll detection. Do not remove.

2. **Default Values:** The YMM system uses `__DEFAULT_MAKE__`, `__DEFAULT_MODEL__`, `__DEFAULT_TRIM__`, `__DEFAULT_DRIVE__` as placeholders. These are filtered out before submission.

3. **Auto-Open Trigger:** Auto-open only works after the FIRST manual user change. Page refreshes with garage data do NOT trigger auto-open.

4. **Mobile Breakpoint:** Desktop/mobile split at 767px width.

5. **Z-Index:** Component uses `z-50` to stay above content.

6. **Group Hover:** Desktop uses Tailwind `group` pattern for hover animations on category toggle.

---

## Troubleshooting

### Dropdowns auto-open on page refresh

- **Cause:** `hasUserManuallyChangedRef` not being checked properly
- **Fix:** Ensure garage sync happens before auto-open effects run

### Make dropdown shows `__DEFAULT_MAKE__`

- **Cause:** Options not being filtered
- **Fix:** Ensure `.filter(m => m !== "__DEFAULT_MAKE__")` is applied to make options

### Mobile toggle not animating

- **Cause:** CSS transition not applied
- **Fix:** Check `ChevronDown` has `transition-transform` class

### Bar doesn't appear when scrolling

- **Cause:** Sentinel element not mounted or observer not set up
- **Fix:** Verify sentinel div exists and ref is attached
