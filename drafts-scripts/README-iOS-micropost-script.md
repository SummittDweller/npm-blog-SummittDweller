# Drafts Micropost Script on iOS

This documents how to copy and use `drafts-scripts/micropost.js` on iPhone/iPad with one-time token setup and automatic future runs.

## Goal

- Keep the GitHub token out of source control.
- Store the token securely on each iOS device in Drafts credentials.
- Run the action automatically after first-time setup.

## 1. Copy the script from macOS

On your Mac in this repo:

```sh
pbcopy < drafts-scripts/micropost.js
```

This places the current script on the clipboard so it can be pasted into Drafts on iOS (Universal Clipboard).

## 2. Paste into the Drafts action on iOS

1. Open Drafts on iPhone/iPad.
2. Open the action that contains your micropost JavaScript step.
3. Edit the Script step.
4. Select all existing script content and paste.
5. Save the action.

## 3. One-time token setup per device

On first run (or after credential reset), Drafts prompts for the `Github` credential.

1. Paste your GitHub Personal Access Token into the `token` field.
2. Save/authorize.
3. Run again if needed.

After this, Drafts securely stores the token on that device and future runs should not prompt.

## 4. Recommended token scope

Use a fine-grained token limited to this repository.

- Repository access: this repo only.
- Permissions: `Contents` read and write.

## 5. Verify automatic behavior

1. Create a test Draft and run the action.
2. Confirm no token prompt appears.
3. Confirm the micropost file is created/updated in GitHub.

## Troubleshooting

- Prompt appears every run:
  - Open Drafts credential settings and confirm `Github` credential exists.
  - Ensure the field name is `token`.
  - Re-enter token once and save.

- Script fails with missing token:
  - Re-authorize the `Github` credential in Drafts.

- Universal Clipboard did not transfer:
  - Ensure both devices are signed into the same Apple ID with Bluetooth/Wi-Fi enabled.
  - Fallback: open the script file in GitHub on iOS and copy/paste manually.

## Security note

- Never hardcode PAT values in the script.
- Rotate/revoke tokens if exposure is suspected.
