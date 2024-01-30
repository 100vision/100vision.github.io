#!/bin/bash

source config.sh

echo "$(date -Ins) - Post-thaw script started." >> "$FREEZE_LOGFILE"

FREEZE_SESSION_PID=$(cat "$FREEZE_LOCKFILE")

echo "$(date -Ins) - Terminating freeze session. PID is $FREEZE_SESSION_PID." >> "$FREEZE_LOGFILE"
pkill -9 -P $FREEZE_SESSION_PID

echo "$(date -Ins) - Deleting freeze lock file..." >> "$FREEZE_LOGFILE"
rm -f "$FREEZE_LOCKFILE"

echo "$(date -Ins) - Unfreeze successful." >> "$FREEZE_LOGFILE"
