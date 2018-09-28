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
- Add tests for the lead autocomplete component on add activity (it should return correct lead id for new Activity)
- Use `connect()` instead of `dispatch()` directly from store in Activity.tsx
- Add tests for delete activity
- Rework settings reducer using `combineReducer`
- Extract domain users dropdown from AddContact/AddOrganization
- Fix styles on search panel (styles for tabs is unused now)
- Rename a lot of components for correct reusability and remove them from lead module
- Remove dublication of properties in model interfaces in client/src/models
