# Chatbot Setup Guide

This project includes a safe optional chatbot loader. The chatbot is not enabled by default, so the website will not fail or show console errors before you add your real chatbot link.

## Option A: Tawk.to live chat link

1. Go to `https://www.tawk.to/` and create a free account.
2. Create a property for **Aarogya Hospital**.
3. Open the chat widget/embed section in Tawk.to.
4. Copy the script URL that looks like this:

```text
https://embed.tawk.to/PROPERTY_ID/WIDGET_ID
```

5. Open `js/chatbot-config.js`.
6. Paste the link like this:

```js
window.AAROGYA_CHATBOT_EMBED_URL = "https://embed.tawk.to/PROPERTY_ID/WIDGET_ID";
```

7. Save the file and redeploy to Netlify.

## Option B: Any chatbot that gives one script URL

If your chatbot provider gives a single JavaScript embed URL, paste that URL in the same place:

```js
window.AAROGYA_CHATBOT_EMBED_URL = "PASTE_YOUR_CHATBOT_SCRIPT_LINK_HERE";
```

## Important checks

- The link must start with `https://`.
- Do not paste a full `<script>...</script>` tag into `chatbot-config.js`; paste only the script `src` URL.
- If the chatbot is not needed, keep the value empty:

```js
window.AAROGYA_CHATBOT_EMBED_URL = "";
```

## Why this method is better

- You update the chatbot link in one file only.
- Every page gets the chatbot automatically.
- The website does not load a broken placeholder URL.
- Netlify deployment stays static and simple.
