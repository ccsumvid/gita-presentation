#!/usr/bin/env bash
# release.sh — Build and publish a GitHub release with DMG + EXE assets
# Usage: ./scripts/release.sh [version]
# If version is omitted, reads from package.json
set -euo pipefail

VERSION="${1:-$(node -p "require('./package.json').version")}"
TAG="v${VERSION}"
DIST="dist"

echo "==> Releasing ${TAG}"

# Ensure working tree is clean
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "ERROR: Uncommitted changes. Commit or stash before releasing."
  exit 1
fi

# Ensure tag exists
if ! git rev-parse "${TAG}" >/dev/null 2>&1; then
  echo "ERROR: Tag ${TAG} does not exist. Create it first (git tag ${TAG})."
  exit 1
fi

# Clean previous build output
rm -rf "${DIST}"

# Build macOS (DMG) and Windows (EXE)
echo "==> Building macOS + Windows..."
npm run build

# Collect assets
DMG_ARM=$(find "${DIST}" -name "*.dmg" | grep "arm64" | head -1)
DMG_X64=$(find "${DIST}" -name "*.dmg" | grep -v "arm64" | head -1)
EXE=$(find "${DIST}" -name "*.exe" | head -1)

ASSETS=()
[ -n "${DMG_ARM}" ] && ASSETS+=("${DMG_ARM}")
[ -n "${DMG_X64}" ] && ASSETS+=("${DMG_X64}")
[ -n "${EXE}" ]     && ASSETS+=("${EXE}")

if [ ${#ASSETS[@]} -eq 0 ]; then
  echo "ERROR: No build artifacts found in ${DIST}/"
  exit 1
fi

echo "==> Assets to upload:"
for f in "${ASSETS[@]}"; do echo "    $f"; done

# Upload assets to the existing GitHub release
echo "==> Uploading to GitHub release ${TAG}..."
gh release upload "${TAG}" "${ASSETS[@]}" --clobber

echo ""
echo "==> Done: https://github.com/$(gh repo view --json nameWithOwner -q .nameWithOwner)/releases/tag/${TAG}"
