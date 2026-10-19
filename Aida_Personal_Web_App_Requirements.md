# Personal Web App Requirements

## 01  Purpose and product scope

Prepared for Aïda Garba  •  Version 1  •  October 18 2026

Build a private web app that helps me capture what is on my mind, understand what matters today, and take a manageable next step. It should bring school, tennis, learning, projects and everyday life into one place while making it easy to return after a busy or difficult week.

### What I need the app to solve

- Tasks, deadlines, ideas and personal responsibilities are spread across different places and can be forgotten.
- A long list does not tell me what to start, how long it may take, or how it fits around classes and practice.
- When I stop a task, I need a clear reminder of where I was and what to do next.
- My plans must leave room for meals, maintenance, rest and changes in energy. A missed day should be easy to recover from.

### Product principles

Capture first and organize later. Show a small, useful daily view. Let me set priorities, with assignments first and protected Python study time. Keep the wider plan available without putting every responsibility on the home screen. Use a supportive tone and quiet reminders.

### How to use this document

The feature requirements preserve the needs already discussed. Items introduced as proposed defaults or implementation requirements are recommendations for making those features work. The build phases are a proposed sequence; they do not remove features from the full vision. Open product decisions appear on the final page.

### Scope

The first release is for my own use across phone, iPad and laptop. The app supports organization and learning; it does not need medical assessment features. The name, branding, exact schedule and software stack remain configurable or undecided.

### Document map

Pages 2–4 describe navigation, tasks and planning. Pages 5–8 cover school, career, content and personal life. Pages 9–10 define AI behavior and app foundations. Pages 11–12 set build priorities, acceptance checks and decisions.

## 02  Navigation and the daily experience

Use customizable spaces for different parts of my life. A space contains related tasks, notes, uploads, goals and check-ins. The same task appears in its space and in the daily plan without being copied.

### Proposed main navigation

| Destination | What I should find |
| --- | --- |
| Today | A short daily plan, next commitment, priority tasks and a quick capture button. |
| Inbox | Unsorted brain dumps, ideas, reminders and AI sorting suggestions. |
| Calendar | Daily and weekly views combining fixed commitments and flexible tasks. |
| Spaces | Courses, learning, tennis, projects, content and personal life dashboards. |
| Review | Sunday reset, daily learning recap and progress review. |
| Settings | Schedule rules, reminders, appearance, privacy and exports. |

### Today page

- Show the date, the next fixed commitment and a short list of chosen priorities. Proposed default: up to three main tasks, with the rest available under Show more.
- Each task card shows a clear action, its space, deadline if present, estimated time and next step. Offer Start, Complete, Reschedule and Break down.
- Keep quick capture visible. Include a small hydration action and optional routine reminders; let me hide or rearrange cards.
- Offer a simple low-energy view that shows essential commitments and one manageable action. It must not delete the rest of the plan.

### Returning after an interruption

When I reopen the app, show my last active task, the saved stopping point and the next step. After several days away, offer a brief review of missed items and upcoming deadlines. Do not flood the screen with every missed reminder.

### Customization

I can create, rename, reorder, archive and restore spaces; choose which cards appear; and keep unused spaces hidden. An archived space retains its records. Global search should find tasks, notes, courses, projects and saved links.

## 03  Brain dump and task management

### Capture flow

I can enter a short thought or a long mixed brain dump without choosing a category first. Save the original text immediately. AI can suggest separate tasks, notes or ideas and their likely spaces. I can review and edit the suggestion before it becomes my organized plan.

Example input: “Finish my analytics assignment, practice Python, buy detergent and call my family.” The app suggests four items in School, Learning, Shopping and Relationships. It asks for missing dates only when they are needed for scheduling; it does not invent deadlines.

### Task information

| Field | Required behavior |
| --- | --- |
| Title and next step | A short action title; an optional concrete starting action. |
| Space and project | Link to a course, project or life area; Inbox is allowed. |
| Dates | Separate the actual deadline from the planned work date or time. |
| Planning details | Optional duration, priority, energy level and dependencies. |
| Status | Inbox, planned, in progress, waiting, completed or canceled. |
| Supporting context | Notes, subtasks, files, links and a stopping point. |
| Recurrence | Optional repeating rule and reminders; each occurrence is tracked. |

### Everyday actions

- Create, edit, complete, reopen, duplicate, move, archive and delete a task. Offer undo for reversible mistakes.
- Break large work into subtasks and keep the parent task visible. Completing a subtask must not automatically complete unfinished work.
- Filter by space, deadline, priority and status. Show Today, This week, Upcoming and Unscheduled views.
- Keep an overdue task’s original deadline visible. Rescheduling a work session changes the plan, not the deadline.

### Completion and recurrence

Completed tasks leave the active list and remain searchable. Skipping one recurring occurrence does not delete the series. Editing a recurring item offers a choice between this occurrence and future occurrences. Repeated AI sorting must not create duplicate tasks from the same accepted suggestion.

## 04  Calendar and realistic planning

### Fixed commitments first

Let me enter recurring classes, tennis practice, matches, work, tutoring, gym sessions, events and personal appointments. Each commitment has a date or recurrence, start and end time, location if useful, and optional travel or preparation time. Support semester start and end dates and one-day exceptions.

My schedule has changed before, so exact class and practice times must be entered or confirmed during setup. Old schedule information must not be activated automatically. Tennis must be explicitly included in the setup checklist.

### Planning rules

- Build around fixed commitments, then priorities, flexible work, maintenance and rest. Honor sleep and unavailable periods.
- Prioritize assignments and upcoming deadlines while protecting the Python time I choose. If they conflict, show the tradeoff and let me decide.
- Use task duration and available time to propose realistic blocks. Include configurable buffers and avoid packing every free minute.
- Show an overload message when the work cannot fit. Offer smaller steps, a reduced plan or another available time instead of silently double-booking.
- Allow manual changes and locked blocks. AI should preserve those choices when proposing a new plan.

### Missed work and changes

If I miss a study session or practice runs late, I can select what changed and ask for a revised plan. The app proposes new slots for unfinished work, explains any deadline risk and lets me accept or edit the changes. It must not silently move a class, match or other fixed appointment.

### Sunday reset

The reset walks me through unfinished tasks, next week’s classes and tennis, deadlines, personal maintenance and main goals. I can choose weekly priorities, protect learning blocks and decide what to postpone. End with a short weekly overview. Save progress so I can pause and return.

### Reminders

Support configurable lead times, quiet hours, snooze and per-category preferences. Group routine reminders when possible. The in-app reminder list is always available; external notifications require an enabled channel and permission. Show whether a notification is scheduled, blocked or unavailable. Use the current timezone and preserve the intended local time for recurring commitments.

## 05  Courses and learning support

### A dashboard for each course

Each course contains assignments, deadlines, study materials, notes, upcoming study sessions and progress. Course names are editable each semester. Include dedicated support for Python and Predictive Analytics, with additional spaces for current courses such as Business Analytics and Systems Analysis and Design.

- An assignment includes the instructor’s instructions, due date and time, deliverable format, submission link if available, and a checklist of requirements.
- Keep completion and submission separate. “Finished working” does not mean “submitted.” Let me record submission myself and attach a receipt or note.
- Upload study material and assignment instructions. Show file processing status, preserve the original, and allow corrections to extracted information.

### AI study help

From an assignment or lesson, AI can explain the task in simple language, propose a sequence of smaller steps, estimate effort and suggest study sessions. I can change the breakdown before adding it to my plan. An estimate must be labeled as an estimate.

When answering from uploaded material, AI should identify the file and page or section where available. If text is unreadable or a deadline is missing, it should say so and request that specific information. Extracted due dates remain suggestions until I confirm them.

### Protected skill practice

Provide learning spaces for Python, SQL, Power BI and other skills I choose. Each space can hold learning goals, resources, practice exercises and project milestones. Python sessions receive the protected time I set. Track practice through completed sessions and notes, with manual correction available.

### Picking up where I stopped

At the end of a session, let me save what I worked on, what I understood, what confused me and the next action. When I return, show that note alongside the relevant file or resource. A focus timer is an optional enhancement; the stopping note is part of the core workflow.

### Five sentence daily learning recap

Generate exactly five sentences based on the learning notes and sessions I recorded. Cover the topic, main idea, practice, difficulty and next step when enough information exists. Let me edit and save the result. If there is no learning record, invite a short check-in instead of inventing what I learned.

## 06  Projects career and conferences

### Projects dashboard

Give every project a goal, status, next milestone, tasks, notes, links, files and a short next-action summary. Proposed starting categories are school projects, client or campus work and portfolio projects. Current examples can include the digital timesheet, Shalom Recovery AI, Evida, ISA website and data analysis work; I choose which projects are active.

- Connect project tasks to the calendar and Today view. Keep project deadlines distinct from individual work sessions.
- Save project decisions and links to designs, repositories or websites. Record who or what I am waiting for when work is blocked.
- Support simple milestone progress based on completed items; show the basis for any percentage rather than an unexplained score.

### Portfolio and professional preparation

Maintain a portfolio checklist with case studies, project screenshots, problem statements, my contribution, results, resume changes and profile updates. Store relevant files or links. Each improvement becomes a task with a next step, rather than remaining a vague goal such as “fix portfolio.”

### Internship applications

Keep a manual application tracker with company, role, internship period, location, link, deadline, stage, next action and notes. Suggested stages are Interested, Applying, Submitted, Assessment, Interview and Closed. These are proposed labels that I can edit.

- Track assessments and follow-ups as dated tasks. Record work authorization or eligibility questions as notes that need verification; the app should not guess answers.
- Attach the resume or cover letter used for a specific application. Avoid overwriting earlier versions without a deliberate action.

### Conferences and events

An event space holds dates, location, registration or travel details, preparation tasks and follow-up notes. Support events such as AfroTech and HBCU career activities when I add them. Preparation can include my pitch, resume, portfolio and a list of people or organizations I want to meet.

### Useful connections

A conference preparation task can link to a portfolio milestone and appear once in the daily plan. A networking note can create a personal follow-up reminder. Sending messages or submitting applications is outside the initial scope; the app helps me prepare and remember.

## 07  Content creation and ideas

### A home for creative work

Create a content space for Im’s Adventures, personal posts and other accounts or organizations I choose to manage. Separate personal and organization content so ideas, drafts and deadlines stay clear. Let me capture an idea quickly even when I do not know where it belongs yet.

### Content item information

- Save the title or topic, series or account, intended audience, platform, format and language.
- Keep the hook, story outline, script or voiceover, caption, reference links and asset checklist together.
- Track production stage. Proposed stages: Idea, Outline, Draft, Filming, Editing, Ready and Published.
- Record a target publishing date separately from filming and editing sessions. Each production step can become a task.
- Attach files or links to footage, graphics and editing projects. Keep draft text recoverable when it changes.

### Planning and creative support

Show a simple list or board of ideas and a weekly content calendar. Allow grouping by series or theme. AI can help turn a selected idea into a hook, outline or production checklist while preserving the experience and facts I provide.

Example: an Im’s Adventures episode can hold the story idea, opening hook, voiceover, footage needed and caption. The planner can schedule filming and editing around assignments and tennis rather than treating the publication date as the only task.

### Control over AI writing

Let me request short, clear drafts in English or French and revise them. AI must distinguish my recorded experience from its suggested wording. It should not invent achievements, personal events, quotes or audience results. Publishing remains a manual action in the initial version.

### Ideas beyond social media

A saved idea may later become a project, content item, note or learning topic. Moving it should retain its original text and links. A random topic picker or integration with a separate topic app is optional future scope; it is not required to organize the current content workflow.

### Progress without pressure

Show what is ready, what is blocked and the next production action. A missed posting date can be rescheduled without creating duplicate tasks or a growing wall of overdue alerts. Platform analytics and automatic publishing can wait until the basic workflow is useful.

## 08  Personal life and wellbeing routines

### Tennis and movement

Include practices, matches, gym sessions and recovery time in the calendar. A tennis space holds training goals, short practice notes, confidence reflections and upcoming events. I can record what went well, what needs practice and a focus for the next session. Avoid turning every session into a numerical performance score.

### Cleaning hygiene and shopping

Use editable routine lists for room cleaning, laundry, personal care and shopping. Tasks can repeat on a schedule I choose. A shopping list supports Needed soon, Can wait and Optional priorities, with an estimated cost and a purchased status. Link purchases to finance records only when I choose to record them there.

### Finances

Start with manual income, expenses, bills, subscriptions, money owed and savings goals. Show upcoming due dates and a simple monthly overview. Enter current amounts during setup; do not populate old balances or financial details from previous conversations.

- Each entry includes amount, currency, date, category and an optional note. A recurring bill has a due rule and payment status.
- Label expected income separately from money already received. Available-to-budget amounts must state which confirmed balances and planned bills they use.
- A reminder does not mark a bill paid. Let me record payments, correct entries and review the calculation behind totals. Bank connections are future scope.

### Relationships

Keep optional reminders to call friends or family, important dates and brief personal notes. I decide who appears and how often I want a reminder. Completing a call can record the date and an optional next follow-up; the app does not contact anyone automatically.

### Hydration and simple check ins

Provide a one-tap “I drank water” action with an editable serving size, daily total and undo. Targets and reminder frequency are user settings. Optional energy or mood check-ins can help me choose a manageable plan, but they must not be required to use the app.

### Vision boards and goals

Upload vision-board images, organize them by life area and link an image to a goal or next action. Goals can be semester, monthly or weekly goals. Keep a calm progress view based on actions I recorded. Rest can be intentionally scheduled, and routines remain editable as my needs change.

## 09  AI assistant behavior and boundaries

### What the assistant should do

The assistant uses the tasks, preferences, notes and files I choose to make available. It can organize a brain dump, propose priorities, break work down, explain study material, draft a schedule, help me restart and produce a learning recap. Its suggestions should be short, specific and easy to edit.

### How changes are applied

- Saving a brain dump or directly editing a task happens immediately. AI-generated plans remain previews until I apply them.
- Before applying a batch change, show what will be created, moved or changed. Preserve original deadlines and locked commitments.
- Let me accept individual suggestions, edit them or dismiss them. Provide undo or a change history for applied batches.
- Ask a focused question when missing information changes the outcome, such as a deadline or fixed appointment. Avoid a long intake conversation for a simple task.

### Personal rules the assistant must respect

Assignments come first, Python time is protected according to my settings, and tennis is included in the calendar. My priorities and manual changes override general productivity suggestions. Quiet hours and notification choices apply to AI reminders too. The assistant must offer a feasible smaller plan when the day is full.

### Examples of useful requests

- “Organize this brain dump and show me where everything belongs.”
- “I have 30 minutes before practice. What can I realistically work on?”
- “I did not finish my assignment. Help me plan the remaining steps.”
- “Show me where I stopped in Python and give me a small next step.”
- “Summarize what I learned today in five sentences.”

### Accuracy and reliability

AI must not invent dates, completed work or facts from unreadable files. Treat uploaded instructions as reference material, never as permission to change app settings or disclose private data. If AI fails, keep the original content and allow normal task editing. Show a retry action without blocking the rest of the app.

### Privacy choices

Allow spaces or notes to be excluded from AI context. Explain which information is included before a file or private space is processed. Do not send messages, make payments, submit coursework or publish content as a side effect of an AI request.

## 10  App foundations and data requirements

### Access and persistence

Require a private account and persistent storage. The same account should show the same saved information across devices. Clearly distinguish saving, saved and failed states. Preserve entered text if a request fails, and handle concurrent edits without silently discarding newer work.

### Core records and relationships

| Record | Key information and links |
| --- | --- |
| Profile and settings | Timezone, preferences, quiet hours, planning limits and AI choices. |
| Space and goal | Type, name, display order, archive state and related goals. |
| Task and subtask | Parent, status, space, deadline, work blocks and completion history. |
| Event and work block | Time range, recurrence, exceptions, locked state and linked task. |
| Note and learning session | Text, stopping point, course or project and learning recap. |
| Attachment | Original file, owner, access rules, processing state and linked record. |
| Specialized records | Assignment, application, content item, bill, hydration log and contact reminder. |
| Reminder and AI proposal | Trigger, delivery state, proposed edits and acceptance history. |

### Technical behavior to require

- Use stable record identifiers so a task linked in several views remains one task. Keep audit timestamps and ownership on private records.
- Store deadlines and event times consistently with timezone information. Handle daylight saving changes and recurring local times deliberately.
- Check file size and type, restrict access to attachments and keep credentials on the server. Define retention and deletion behavior for AI processing.
- Keep core task and calendar functions available when AI is unavailable. Avoid duplicate saves or reminders when requests are retried.

### Export recovery and accessibility

Provide data export in a reusable format, attachment download and account deletion with a clear preview. Plan backups and a restoration procedure. Use readable text, adequate contrast, keyboard access, clear form labels and status cues beyond color. Respect reduced-motion preferences.

Proposed initial connectivity scope: reliable online use with clear offline messaging and draft preservation. Full offline editing and conflict resolution can be added later. Confirm external notification support on the devices selected for launch before relying on it.

## 11  Build phases and acceptance checks

Build a complete daily loop first: capture, choose a next action, schedule it, work, record progress and return. Keep the full requirements visible while sequencing implementation to avoid an oversized first release.

### Proposed release sequence

| Phase | Included outcome |
| --- | --- |
| 1  Daily foundation | Private account; Today; Inbox; spaces; tasks; recurring commitments including tennis; day and week views; manual scheduling; in-app reminders; restart notes; Sunday reset. |
| 2  Assisted learning | AI sorting and task breakdown; course dashboards; assignments and uploads; protected Python planning; reviewed schedule suggestions; five-sentence recaps; hydration and basic vision boards. |
| 3  Whole life workflows | Project and portfolio tracking; applications and conferences; content workflow; manual finances; cleaning and shopping routines; relationships; more dashboard customization. |
| 4  Optional expansion | External calendar sync, additional notification channels, offline editing and selected integrations after the core workflow is reliable. |

### Core acceptance checks

- Capture a mixed brain dump, close the page and return: the original text is saved. Accept one AI suggestion twice: it creates only one organized item.
- Create a class and tennis practice, then plan a task: occupied and locked time stays protected. If the task will not fit, the app explains the conflict.
- Move an assignment work session: the submission deadline remains unchanged. Mark the work complete: submission remains a separate state.
- Miss a recurring routine: only that occurrence is skipped or rescheduled. Future occurrences remain intact.
- Stop a Python session and return: the last stopping note and next step are visible. Generate a recap: it has five sentences and uses recorded learning.
- Dismiss or snooze a reminder: it respects quiet hours and does not create repeated duplicates. A blocked notification channel is clearly shown.
- Fail an AI or save request: input remains recoverable. A second account cannot read the first account’s tasks or attachments.

Also verify the selected launch devices, keyboard navigation, timezone changes, deleted records, empty dashboards and oversized or unreadable uploads before release.

## 12  Setup decisions and launch definition

### First time setup

Keep onboarding short and resumable. Ask for timezone, the current semester, recurring classes and tennis commitments, protected Python time, reminder preferences and the spaces I want visible. Let me skip optional information. Finish with one captured task and a simple Today plan.

### Proposed interface direction

Use a calm, customizable card layout with a clear next action and generous spacing. Keep long lists collapsible. On a phone, prioritize capture and Today; on iPad and laptop, give the calendar and spaces more room. Color and typography are open choices. Do not automatically reuse the palette of a different project.

### Decisions to make before implementation

| Decision | Proposed starting point |
| --- | --- |
| Name and visual identity | Choose an app name, palette and typography before detailed screens. |
| Launch devices | Responsive phone, iPad and laptop use; test the browsers I select. |
| Schedule and availability | Enter the current schedule, tennis times, rest windows and buffers. |
| Notification channels | Start with in-app reminders; choose external channels after device checks. |
| AI access and budget | Choose a provider, monthly spending limit and what data it can process. |
| Files and integrations | Choose upload formats and limits; begin with manual entry and file uploads. |
| Initial spaces | School, Learning, Tennis and Life; show other spaces as I need them. |

### What success looks like

I can capture a thought quickly, see a manageable plan, know my next commitment and restart a task without reconstructing everything from memory. School deadlines and tennis remain visible, Python has protected time, and unfinished work can be rescheduled realistically.

For early testing, review practical questions each week: Did I use the app to choose a next action? Could I find where I stopped? Were reminders useful? Did the plan leave enough room? Use my answers to simplify the product before adding more features.

### Ready for the first build

The first build is ready to begin when the daily navigation, task fields, current schedule and Phase 1 scope are chosen. Treat the other features in this document as the planned product backlog. Do not preload sample personal amounts, expired deadlines or old appointments as current data.

