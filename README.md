# Relay video calls

A lightweight static video-call lobby designed to be hosted on GitHub Pages. It has no build step or runtime dependencies.

## Publish on GitHub Pages

1. Create a GitHub repository and push the contents of this folder to its `main` branch.
2. Open **Settings -> Pages** in the repository.
3. Set **Source** to **GitHub Actions**.
4. Push a change, or run **Deploy static site to GitHub Pages** from the repository's Actions tab.

The site will be available at:

`https://<your-username>.github.io/<repository-name>/`

## Add Scaledrone

The placeholder is in `app.js`:

```js
const channelConfig = {
  roomName: roomInput.value,
  scaledroneChannel: "",
};
```

Add the Scaledrone client and room subscription there, then connect the join form to your WebRTC signaling flow. GitHub Pages serves over HTTPS, which is required by browser camera and microphone permissions.

## Share a call

Enter a room name and select **Copy invite link**. The generated URL includes the room as a `room` query parameter, so anyone opening it on the deployed GitHub Pages site will see the same room prefilled. The Scaledrone/WebRTC connection still needs to be wired into the join action.
