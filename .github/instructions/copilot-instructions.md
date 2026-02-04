---
applyTo: '**'
---
# Copilot Repository Guidelines

This document defines the rules and context Copilot must follow when generating or modifying code in this repository.

## Project Context

* The project is a **Next.js** application written in **TypeScript**.
* The application is inspired by **Postman**, but intentionally **leaner and simpler**.
* Core focus: **sending and analyzing API requests** only. Avoid scope creep beyond this goal.

## UI & Design System

* Use **shadcn/ui** for all UI components.
* Use **lucide-react** for icons.
* Do not introduce alternative UI libraries unless explicitly instructed.

## Code Quality Principles

* Prefer **pure functions** whenever possible.
* Write **clean, readable, and testable** code.
* Favor **small, composable units** of logic over large, monolithic implementations.
* Avoid deeply nested or hard-to-follow control flow.

## Architecture & Implementation Guidelines

* Use **kebab-case** for all file and folder names.

* Keep components focused on a **single responsibility**.

* Extract business logic into standalone functions or hooks.

* Avoid side effects in shared logic; isolate them at the edges (e.g., network calls, storage).

* Ensure functions and components are easy to unit test.

## Testing & Reliability

* Use **Jest** for unit and integration testing.
* Always consider **edge cases**.
* Never assume inputs, external responses, or return values are safe or well-formed.
* Validate, guard, and fail gracefully where appropriate.
* Whenever pure functions or testable units are introduced or modified, **always write corresponding tests**.
* Ensure tests **cover all expected cases and edge cases**.
* **Run all relevant tests** and confirm they pass before considering the task complete.

## Commit & PR Messages

* When asked to write a **commit message or pull request description**, always be **clear, concise, and human-readable**.
* The goal is to explain **what was implemented and why**, not to document low-level technical details.
* Assume the reader is a teammate reviewing changes, not the original author.

**Example**

> Add request history panel to API client
>
> This introduces a lightweight request history panel that shows recently sent API requests and their outcomes, making it easier to compare responses and debug issues without re-sending requests.

## General Expectations

* Copilot must **never delete files directly**; instead, request the deletion and clearly explain **why** it is necessary.
* Optimize for **clarity and maintainability** over cleverness.
* Follow idiomatic **TypeScript** and **Next.js** patterns.
* When in doubt, choose the simplest solution that satisfies the requirements.


This document defines the rules and context Copilot must follow when generating or modifying code in this repository.

## Project Context

* The project is a **Next.js** application written in **TypeScript**.
* The application is inspired by **Postman**, but intentionally **leaner and simpler**.
* Core focus: **sending and analyzing API requests** only. Avoid scope creep beyond this goal.

## UI & Design System

* Use **shadcn/ui** for all UI components.
* Use **lucide-react** for icons.
* Do not introduce alternative UI libraries unless explicitly instructed.

## Code Quality Principles

* Prefer **pure functions** whenever possible.
* Write **clean, readable, and testable** code.
* Favor **small, composable units** of logic over large, monolithic implementations.
* Avoid deeply nested or hard-to-follow control flow.

## Architecture & Implementation Guidelines

* Use **kebab-case** for all file and folder names.

* Keep components focused on a **single responsibility**.

* Extract business logic into standalone functions or hooks.

* Avoid side effects in shared logic; isolate them at the edges (e.g., network calls, storage).

* Ensure functions and components are easy to unit test.

## Testing & Reliability

* Use **Jest** for unit and integration testing.
* Always consider **edge cases**.
* Never assume inputs, external responses, or return values are safe or well-formed.
* Validate, guard, and fail gracefully where appropriate.

## General Expectations

* Optimize for **clarity and maintainability** over cleverness.
* Follow idiomatic **TypeScript** and **Next.js** patterns.
* When in doubt, choose the simplest solution that satisfies the requirements.
