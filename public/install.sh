#!/bin/sh
# =============================================================================
# PLACEHOLDER — NOT THE REAL brw INSTALLER
#
# This file is served at https://brw.donworks.co.uk/install.sh and is the only
# thing behind the site's primary install command. The real installer is being
# written in the brw repository (Don-Works/brw) and MUST replace this file
# byte-for-byte before brw-site is deployed.
#
# To replace it:   cp <brw>/scripts/install.sh brw-site/public/install.sh
#
# Until then this script refuses to install anything and points at the signed
# release artifacts instead, so that a reader who pipes the URL into `sh`
# before the swap gets a clear instruction rather than a partial install.
# =============================================================================

set -eu

RELEASES="https://github.com/Don-Works/brw/releases/latest"

printf '%s\n' \
  "brw install.sh — placeholder" \
  "" \
  "The one-line installer has not been published yet. Nothing was installed" \
  "and nothing was written to your machine." \
  "" \
  "Install brw from a release artifact instead:" \
  "" \
  "  ${RELEASES}" \
  "" \
  "  macOS    brw_<version>_macos_universal.pkg" \
  "  Linux    brw_<version>_linux_<arch>.deb  or  .rpm" \
  "  Windows  brw_<version>_windows_<arch>.msi" \
  "" \
  "Verify what you downloaded:" \
  "" \
  "  shasum -a 256 -c SHA256SUMS.txt" \
  "  gh attestation verify <artifact> --repo Don-Works/brw" \
  "" \
  "Docs: https://github.com/Don-Works/brw/blob/main/docs/install.md" \
  >&2

exit 1
