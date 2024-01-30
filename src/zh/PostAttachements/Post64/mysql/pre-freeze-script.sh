#!/bin/bash

source config.sh

echo "$(date -Ins) ---------------------------------------------------------------------" >> "$FREEZE_LOGFILE"
echo "$(date -Ins) - Pre-freeze script started." >> "$FREEZE_LOGFILE"

echo "$(date -Ins) - Deleting freeze lock file..." >> "$FREEZE_LOGFILE"
rm -f "$FREEZE_LOCKFILE"

echo "$(date -Ins) - Starting MySQL freeze session..." >> "$FREEZE_LOGFILE"
mysql \
  --defaults-extra-file=/root/.my.cnf \
  --execute="FLUSH TABLES WITH READ LOCK; SYSTEM touch \"$FREEZE_LOCKFILE\"; SYSTEM echo \"\$(date -Ins) - Freeze lock aquired.\" >> \"$FREEZE_LOGFILE\"; SYSTEM sleep $FREEZE_SNAPSHOT_TIMEOUT; SYSTEM echo \"\$(date -Ins) - Freeze session terminated.\" >> \"$FREEZE_LOGFILE\";" \
  1>/dev/null 2>/dev/null &

FREEZE_SESSION_PID=$!
echo "$(date -Ins) - Started MySQL freeze session, PID is $FREEZE_SESSION_PID..." >> "$FREEZE_LOGFILE"

attempts=0
while [ ! -f "$FREEZE_LOCKFILE" ]; do

  if ! ps -p $FREEZE_SESSION_PID 1>/dev/null; then
    echo "$(date -Ins) - Seems like MySQL freeze statement failed. Aborted." >> "$FREEZE_LOGFILE"
    exit 1
  fi

  sleep 1s
  attempts=$((attempts+1))

  if [ $attempts -gt $FREEZE_MYSQL_TIMEOUT ]; then
    echo "$(date -Ins) - MySQL cannot freeze in suitable time. Aborting..." >> "$FREEZE_LOGFILE"
    kill $FREEZE_SESSION_PID
    exit 2
  fi

  echo "$(date -Ins) - Waiting for MySQL to freeze tables. Making try $attempts..." >> "$FREEZE_LOGFILE"

done

echo $FREEZE_SESSION_PID > "$FREEZE_LOCKFILE"
echo "$(date -Ins) - Freeze successful." >> "$FREEZE_LOGFILE"
