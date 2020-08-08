#!/bin/sh


npx ts-cleaner --watch & npx tsc-watch --onSuccess "scripts/start.sh"