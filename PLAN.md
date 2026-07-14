# FarmLens-app — Path to Real Hardware

The app already talks to a real HTTP node over the LAN (`ConnectionScreen` takes
any IP/port) — it has no built-in mock mode of its own. "Real hardware" is
gated almost entirely on `FarmLens-node` having a physical RPi4 + ESP32 node
running real sensors/AI instead of `SENSOR_MODE=mock` / `AI_MODE=mock` (see
`FarmLens-node/PLAN.md`). What's left on the app side:

## Done

- [x] Port default gap (`ARCHITECTURE.md`'s known follow-up): `connection_screen.dart`
  and `constants.dart` defaulted the port field to `80` (ESP32-era), even
  though the primary target has been the RPi node on port `8000` since the
  reorg. Fixed: added `FarmLensConstants.defaultDevicePort = '8000'` and
  pointed all three `'80'` literals in `connection_screen.dart` at it.

## Left to do

- [ ] **No API authentication.** `rpi/api.py` has none today, and this app has
  no auth header support. Both this app and `FarmLens-node` need it before a
  real field deployment (not just a lab bench) — track alongside
  `FarmLens-Platform/docs/ROADMAP.md`'s per-node API key design, since the
  same token scheme should work for both the local app→node link and the
  future node→Platform link.
- [ ] **Run the Integration Test Checklist (README.md) against a real RPi4
  node once one exists** (see `FarmLens-node/PLAN.md` §2–4) — it has only ever
  been run against `AI_MODE=mock`/`SENSOR_MODE=mock`. Particularly worth
  re-checking under real hardware: the 3-failed-poll "offline" detection
  timing, and camera snapshot latency on `/api/snapshot` once real
  `picamera2` frames (not mock) are flowing.
- [ ] **Dark mode** — `lib/screens/settings_screen.dart:22,406` are still TODO
  stubs (pre-existing, unrelated to hardware but the only other known gap in
  this repo per the project's TODO scan).
- [ ] Expand `test/widget_test.dart` — currently the only test in the repo.
