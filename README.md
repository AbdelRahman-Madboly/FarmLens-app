# FarmLens App

Edge AI crop health monitoring — Flutter companion app for a FarmLens field node.

**Suez Canal University · Faculty of Engineering · IC EISIS 2026**
Abdel Rahman M. El-Saied · Mohamed Elsayed

---

## Current status

The app talks to whatever node is running the FarmLens REST API (see [API Contract](#api-contract) below) — it does not care whether that node is a Raspberry Pi or an ESP32, since the IP/port are entered manually on the Connection screen. Today the primary target is the **Raspberry Pi node** (see `FarmLens-node` repo), which serves the API on port `8000` and self-generates mock sensor readings until real ESP32 sensor hardware exists.

> The Connection screen's port field currently pre-fills `80` (a holdover from an earlier ESP32-only phase). Until that default is updated in code, enter port `8000` manually when connecting to an RPi node. This is tracked as a follow-up, not yet fixed — see `ARCHITECTURE.md`.

## Setup

1. Install Flutter SDK (>=3.3.0)
2. Clone this repository
3. Run `flutter pub get`
4. Make sure the phone and the FarmLens node (Raspberry Pi) are on the same WiFi network/LAN
5. Run `flutter run`
6. Enter the node's IP address (find it on the Pi with `hostname -I`)
7. Enter port `8000` for a Raspberry Pi node (or `80` for the legacy ESP32 mock server)
8. Tap **Connect**

### Optional: develop without any hardware

`tool/mock-esp32-server.js` is a standalone Node.js HTTP server that fakes the FarmLens REST API on port 80, useful for UI work when no RPi or ESP32 is reachable:

```
node tool/mock-esp32-server.js
```

Then connect the app to `localhost` (or your machine's LAN IP) on port `80`.

---

## File Structure

```
lib/
├── main.dart               — App entry point, MultiProvider setup
├── theme.dart              — FarmLensColors + farmLensTheme()
├── constants.dart          — default IP, poll interval, timeout, pref keys
├── router.dart             — GoRouter: splash / connect / main / log/:id
├── utils/
│   └── formatters.dart     — formatDetectionClass, isDisease, ccombinedColor, timeAgo
├── models/
│   ├── live_data.dart      — LiveData.fromJson(), LiveData.empty()
│   ├── cycle_log.dart      — CycleLog.fromJson(), CycleLog.fromLiveData()
│   ├── node_status.dart    — NodeStatus.fromJson()
│   └── fusion_settings.dart — FusionSettings.fromJson(), toJson(), defaults()
├── services/
│   └── api_service.dart    — getStatus, getLive, getLogs, getSettings, postSettings
├── providers/
│   ├── settings_provider.dart    — deviceBaseUrl, fusionSettings, SharedPrefs
│   ├── connection_provider.dart  — DeviceConnectionState, connect(), disconnect()
│   ├── live_provider.dart        — polling loop, alerts list, unreadAlertCount
│   └── log_provider.dart         — cycles list, loadLogs(), addCycle()
└── screens/
    ├── splash_screen.dart        — 1s logo splash → redirect
    ├── connection_screen.dart    — IP/port form, recent IPs, connect flow
    ├── main_shell.dart           — IndexedStack + custom bottom nav
    ├── dashboard_screen.dart     — live gauge, sensor cards, detection, alert banner
    ├── alerts_screen.dart        — alert feed with red-border cards
    ├── log_screen.dart           — traceability log, shimmer, export, pull-to-refresh
    ├── log_detail_screen.dart    — full cycle detail, ETRACE badge
    └── settings_screen.dart      — sliders, crop chips, test connection, about

tool/
└── mock-esp32-server.js    — standalone dev-only mock API server (no hardware needed)
```

---

## API Contract

The connected node must serve these endpoints at `http://{ip}:{port}`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/status` | Node health check — call on connect |
| GET | `/api/live` | Live sensor + detection data — polled every 5s |
| GET | `/api/logs?limit=50` | Traceability log entries |
| GET | `/api/settings` | Current fusion weights |
| POST | `/api/settings` | Update fusion weights |

This contract is the shared source of truth with the `FarmLens-node` repo — its `rpi/api.py` implements these same endpoints. If either side changes the contract, update both READMEs together.

---

## Integration Test Checklist

Run these steps manually before any release build.

- [ ] App launches with splash screen (logo + spinner, ~1 second)
- [ ] App connects to the node at its LAN IP and chosen port
- [ ] Status screen shows the node's `node_id` and `mode`
- [ ] Dashboard shows live moisture_pct and water_pct values
- [ ] Values update every 5 seconds
- [ ] Ccombined gauge animates smoothly on value change
- [ ] Gauge color shifts: green (<0.4) → amber (0.4–0.65) → red (>0.65)
- [ ] Alert banner appears when `ccombined > theta` (default 0.5)
- [ ] Alert SnackBar fires at top of screen on new alert cycle
- [ ] Alerts tab shows alert history with red left-border cards
- [ ] Alert badge count shows on bottom nav Alerts tab
- [ ] Log tab loads cycle history with shimmer while loading
- [ ] Pull-to-refresh on Log tab reloads from device
- [ ] Export button triggers share sheet with JSON data
- [ ] Tap any log row → navigates to Log Detail screen
- [ ] Log Detail shows Detection / Sensors / Fusion / Traceability sections
- [ ] ETRACE badge visible at bottom of Log Detail
- [ ] Settings sliders post to the node (`POST /api/settings`)
- [ ] Changing theta to 0.1 → alert fires on dashboard
- [ ] Restoring theta to 0.5 → alert clears
- [ ] Node goes offline → app shows "Node offline" after 3 failed polls
- [ ] Node comes back → app recovers and resumes polling automatically
- [ ] "Test" button in Settings shows "Connected ✓" SnackBar

---

## Design System

| Token | Value |
|-------|-------|
| Primary green | `#1D9E75` |
| Amber / Watch | `#BA7517` |
| Alert / Red | `#E24B4A` |
| Background | `#F5F5F0` |
| Card | `#FFFFFF` |
| Text primary | `#1A1A1A` |
| Text secondary | `#6B7280` |
| Border | `#E8E8E4` |

Ccombined color rule: `< 0.4` green · `0.4–0.65` amber · `> 0.65` red

---

## Related repos

- `FarmLens-node` — Raspberry Pi edge server (this app's primary backend) + ESP32 sensor firmware
- `FarmLens-Platform` — future cloud aggregator for multiple field nodes (not yet in use)

See `ARCHITECTURE.md` for how this app fits into the overall system and a list of known follow-up work.
