# Specification

## Summary
**Goal:** Add a floating chatbot with keyword-based Q&A, a query submission form, lead capture fields on the calculator, and an admin panel to view all submissions for the Urban Thekedaar site.

**Planned changes:**
- Add a floating chatbot widget with keyword-based automated responses covering services, pricing, bookings, and FAQs; unanswered queries prompt the user to use the query form
- Add a query form (name, phone, email, service type dropdown, message) that validates inputs, submits to the backend, and shows a confirmation message
- Update the backend to store query submissions with a `submitQuery` method and an admin-only `getQueries` method, persisted across upgrades
- Add name and mobile number fields to the EstimateCalculator form; submit these alongside existing estimate inputs as a calculator lead to the backend
- Update the backend with a `submitCalculatorLead` method (stores name, mobile, project type, area, floors, quality tier, address) and an admin-only `getCalculatorLeads` method, persisted across upgrades
- Create an Admin Panel page with a hardcoded-credentials login screen (username + password stored as frontend constants); once logged in, display all query submissions and all calculator leads in separate tabs/sections with logout functionality

**User-visible outcome:** Visitors can interact with a chatbot for quick answers or submit a detailed query form; the calculator now captures contact info as a lead. Admins can log in to a dedicated panel to view all submitted queries and calculator leads in organized tables.
