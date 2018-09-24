# Technical debt
This file contains everything that must be fixed/changed/done. We didn't do that before, due to the lack of time.
## Server
- CI/CD
- Add domain validation to activity
- Add delete note tests
- Change ":id" to ":\<model>Id" in all routes   
- DB migration?
- Create const for lead status conditions
- Add searchResults endpoint tests for empty, 1 symbol, 10 words and non match query 
## Client
- Define all initial reducers' states as interfaces
- Migrate actions and reducers to typescript
- Refactor EditLeadTabs
- Refactor styles (extract global)
- Remove redundant requests sending on loading leads
- Snapshot testing
- Add tests for the lead card component on dashboard (client must see correct status icons)
- Use `connect()` instead of `dispatch()` directly from store in Activity.tsx
- Add tests for delete activity
- Rework settings reducer using `combineReducer`
- Rework filter(display current pipeline leads filter) and pipeline switcher
