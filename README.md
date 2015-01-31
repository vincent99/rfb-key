rfb-key
=======

Sends a single keypress (with optional modifier) to a VNC server.

Install:
```bash
  npm install -g rfb-key
```

For example to send Ctrl-D and toggle mute on a Google Hangout, hypothetically:
```bash
  rfb-key --host office-tv --pass secret --key d --modifier ctrl
```
