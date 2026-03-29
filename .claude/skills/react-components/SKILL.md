---
name: react-components
description: Best practices for React components in this codebase. Use whenever creating, editing, refactoring, or reviewing any React component, hook, or Redux-connected UI — including folder structure, naming, state management, API handling, performance, imports, and styling. Always consult before generating component or hook code.
---

# React Component Guidelines

The code examples are given in minified way. But at the time of implementation, don't write minify code.

## Structure

```
/MyComponent
├── MyComponent.tsx          # Rendering only
├── hooks/useMyComponent.ts  # All business logic
└── components/SubComponent/SubComponent.tsx
```

- Folder = PascalCase component name; hooks in `hooks/`; nested components in `components/`

## Separation of Concerns

Components render only. All logic, state, and handlers go in custom hooks.

```tsx
// ✅ const { user, isLoading, error } = useUserCard();
// ❌ useEffect(() => { fetch('/api/user')... }, []) inside component
```

## API — Redux + Saga Only

Never call APIs from components or hooks. Dispatch Redux actions; Saga handles async.
**Flow:** `Component → Hook → dispatch(action) → Saga → API → Store → Component`

```ts
const fetchUser = useCallback((id: string) => dispatch(fetchUserAction(id)), [dispatch]);
```

## Naming

| Item | Convention |
|---|---|
| Components, Types | PascalCase (`UserCard`, `UserProps`) |
| Hooks | `use`-prefixed camelCase (`useUserCard`) |
| Variables, functions | camelCase (`isLoading`, `handleSubmit`) |

## Type Safety

Always type props/state. Avoid `any`.

```tsx
interface UserCardProps { userId: string; onSelect: (id: string) => void; }
```

## State Management

- Local `useState`: UI-only (open/close, active tab)
- Redux: shared/global state and all server data
- Never duplicate Redux store data into local state

## Performance

```tsx
export default React.memo(UserCard);                                    // pure components
const sorted = useMemo(() => items.sort(byDate), [items]);              // expensive values
const handleClick = useCallback((id) => dispatch(...), [dispatch]);     // stable callbacks
// ❌ <Button onClick={() => handleClick(id)} />  — avoid inline functions in JSX
```

## Error & Loading States

Always handle all three explicitly:

```tsx
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorBanner message={error.message} />;
return <DataView data={data} />;
```

## Styling — shadcn/ui + Tailwind

- Use shadcn/ui components + Tailwind classes only; no inline styles
- Consult context7 shadcn docs for up-to-date component APIs

```tsx
// ✅ <Button className="w-full mt-4" variant="outline">Submit</Button>
// ❌ <button style={{ width: '100%' }}>Submit</button>
```

## Imports

- Absolute imports/aliases only — no `../../..` chains
- Lazy-load route-level or heavy components with `React.lazy` + `Suspense`

```tsx
import { UserCard } from '@/components/UserCard/UserCard';
const Dashboard = React.lazy(() => import('@/pages/Dashboard/Dashboard'));
```

## Reusability & Docs

- Extract UI used in 2+ places to `/components/shared/` (no domain-specific logic)
- Comments explain **why**, not just what — for components, hooks, and Redux flows

## Testing

- Hooks: unit-tested via `renderHook` independently
- Components: snapshot/integration with minimal mocking
- Sagas: tested via Saga middleware; avoid coupling render to store shape

## Pre-submit Checklist

- [ ] Own named folder; hooks in `hooks/`; children in `components/`
- [ ] No logic/API calls in component — only in hook
- [ ] APIs dispatched via Redux actions only
- [ ] All props/state explicitly typed
- [ ] Loading, success, error states handled
- [ ] shadcn/ui + Tailwind only, no inline styles
- [ ] Absolute imports; lazy load where needed
- [ ] memo/useMemo/useCallback applied appropriately
- [ ] Comments explain *why*; reusable UI is shared
