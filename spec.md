# Urban Thekedaar

## Current State
EstimateCalculator shows a form with contact, project, and location fields. On submit it calls backend calculateEstimate which stores the lead and returns cost + text breakdown. Results screen shows only total cost.

## Requested Changes (Diff)

### Add
- Full AI Construction Estimator: inputs (plot size, built-up area/floor, floors, city, construction type, name, mobile). Results slide-in panel: total built-up area, cost range (min-max), material BOQ table, project timeline by stage, payment milestone plan, Start Project CTA.

### Modify
- EstimateCalculator.tsx: completely rewrite with new inputs and rich results panel. All BOQ/timeline/milestones computed client-side. Backend call used for lead storage only.

### Remove
- Old location sub-fields (street, house no, postal code). Quality tier toggles replaced with construction type dropdown.

## Implementation Plan
1. Rewrite EstimateCalculator.tsx with 7 inputs + slide-in results dashboard
2. Keep useCalculateEstimate for backend lead storage (adapt params)
3. All rich calculations done in component from user inputs
