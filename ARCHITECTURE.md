# Architecture

## System overview

```
┌──────────────┐        WiFi/LAN, REST         ┌──────────────────┐        UART (future)      ┌──────────────┐
│  FarmLens    │ <────────────────────────────> │  FarmLens-node   │ <────────────────────────> │  ESP32       │
│  app (this   │   GET /api/status, /api/live,   │  (Raspberry Pi)  │   sensor readings          │  sensor      │
│  repo)       │   GET/POST /api/settings,       │  rpi/ FastAPI    │                            │  firmware    │
│              │   GET /api/logs                 │  server          │                            │  (dormant    │
└──────────────┘                                 └──────────────────┘                            │  until       │
                                                                                                     hardware     │
                                                                                                     exists)      │
                                                                                                    └──────────────┘
```

Later, once multiple real field RPi nodes exist, each RPi also reports up to `FarmLens-Platform` (a cloud aggregator, currently just a scaffold). This app never talks to the Platform directly today — it only talks to a single node on the local network.

## Data flow inside this app

```
ApiService (services/api_service.dart)
      │  HTTP calls to {baseUrl}/api/*
      ▼
ConnectionProvider ── owns DeviceConnectionState, current baseUrl
      │
      ▼
LiveProvider ── polls /api/live every 5s (FarmLensConstants.pollIntervalSeconds),
      │          tracks alerts + unreadAlertCount
      ▼
Screens (Dashboard, Alerts, Log, Settings) ── consume providers via `provider` package
```

`LogProvider` separately loads `/api/logs` on demand (Log tab) rather than polling continuously.

## Connection state machine

`ConnectionProvider` / `LiveProvider` track: `disconnected → connecting → connected → (poll failures) → offline → reconnected`. Offline is declared after 3 consecutive failed polls (see Integration Test Checklist in README). Reconnection is automatic — the poll loop keeps retrying rather than requiring the user to manually reconnect.

## Known follow-up work (not yet done — intentionally left as-is during the repo reorg)

- `lib/constants.dart` and `lib/screens/connection_screen.dart` still default the port field to `80` (ESP32-era default). The app works fine against an RPi node today, but the user must manually type `8000`. Update `FarmLensConstants` to add a `defaultDevicePort` and change the two `'80'` defaults in `connection_screen.dart` to `8000`.
- No authentication on the node API yet — matches the current state of `FarmLens-node`'s `rpi/api.py`. `FarmLens-Platform`'s roadmap already anticipates per-node API keys; this app will need an auth header once that lands.
- `test/widget_test.dart` is the only test — worth expanding once the app is under active iteration again.
