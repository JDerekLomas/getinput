#!/usr/bin/env bash
# Publish getinput-page to npm using NPM_TOKEN from the environment.
# Run via:  secret-lover run -- ./publish.sh
set -euo pipefail

if [[ -z "${NPM_TOKEN:-}" ]]; then
  echo "NPM_TOKEN not set. Run with: secret-lover run -- ./publish.sh" >&2
  exit 1
fi

cd "$(dirname "$0")"

TMPRC=$(mktemp)
trap "rm -f $TMPRC" EXIT
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > "$TMPRC"

npm publish --access public --userconfig "$TMPRC"
