# Technical debt
This file contains everything that must be fixed/changed/done. We didn't do that before, due to the lack of time.
## Server
- CI/CD
- Add domain validation to activity
- Add delete note tests
- Change ":id" to ":\<model>Id" in all routes   
- DB migration?
## Client
- Define all initial reducers' states as interfaces
- Migrate actions and reducers to typescript
- Refactor EditLeadTabs
- Refactor styles (extract global)
- Remove redundant requests sending on loading leads
- Snapshot testing