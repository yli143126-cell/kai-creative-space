# 李煜 Kai · 创意空间

Buildless HTML/CSS/JavaScript portfolio. Serve `dist/` with any static HTTP server.

- Sixteen entries: one interactive theatre, three internship collections and one independently completed classroom design project, five Taihu Stone paintings, five Wuyuan landscape studies, and one AI poster/video series. Painting detail navigation stays within its series.
- Sphere coordinates use real 3D rotation and perspective projection, with accessible DOM image buttons.
- Drag and wheel rotation, inertial motion, automatic rotation toggle, category filtering, grid view, native accessible dialogs, full project galleries, video and biography.
- No invented contact details, artwork dates, dimensions or project awards.
- Source assets are unchanged; website images and video are optimized copies.

Edit project content in `dist/app.js`, biography in `dist/index.html`, and appearance in `dist/style.css`.

Internship collections: Tomorrow City (published), campaign/event visuals (China Housing and Jinmao explicitly labeled proposals; CR Land has no unconfirmed publication status), and six editorial banners. All 15 supplied internship images are included without cropping. Edit `sections`, `items`, and `coverStack` in `dist/app.js` to add or reorder material.


## Interactive theatre

The `unsent-score` entry links to the user-selected live theatre at https://unsent-score-theatre.quiet-frog-0944.chatgpt.site. It opens in a new tab and switches off portfolio ambient music before navigation; visitors can explicitly turn it back on when returning. No theatre source or deployment is changed by this integration.

The three optimized scene images come from theatre saved version 1, source commit `cfebc940cb58acfef95ce3841e4ba3d9e5926a31`, selected after the user's historical rollback. The destination is a live URL, not an immutable version URL: future theatre publications will change the experience it opens. Update `experienceUrl` in `dist/app.js` if a separate fixed showcase deployment is created later.
