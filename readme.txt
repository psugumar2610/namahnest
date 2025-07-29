# Setting up a New Hugo Project with Custom Theme "ChatBot"

## Step 1: Install Hugo

Before starting, make sure Hugo is installed on your machine. Follow the [Hugo installation guide](https://gohugo.io/getting-started/installing/) to install it for your platform.

```bash
# Verify installation
hugo version
```

---

## Step 2: Create a New Hugo Project

Run the following command to create a new Hugo project:

```bash
hugo new site ChatBot
cd ChatBot
```

---

## Step 3: Create a Custom Theme

Hugo allows you to create custom themes. Let's create one for your project:

```bash
hugo new theme ChatBot
```

This creates a folder named `themes/ChatBot` with some basic theme files.

---

## Step 4: Set the Theme

Open the `config.toml` file in the root directory of your project and set the theme to `ChatBot`:

```toml
theme = "ChatBot"
```

---

## Step 5: Build the Theme

Navigate to `themes/ChatBot` and start building your custom theme:

1. **Layouts**: Create layout files in `themes/ChatBot/layouts`.
2. **Static Files**: Add CSS, JavaScript, and images in `themes/ChatBot/static`.
3. **Base Templates**: Define `baseof.html` in `themes/ChatBot/layouts/_default` for the main layout structure.

For example, create a basic `baseof.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ .Title }}</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    {{ block "main" . }}{{ end }}
</body>
</html>
```

---

## Step 6: Add Content

Create content for your site:

```bash
hugo new posts/welcome.md
```

Edit the `content/posts/welcome.md` file:

```markdown
---
title: "Welcome to ChatBot"
date: 2025-03-22
draft: false
---

This is your first post in the ChatBot project!
```

---

## Step 7: Run the Development Server

Start the Hugo development server to preview your site:

```bash
hugo server
```

Visit `http://localhost:1313` to view your site.

---

## Step 8: Build the Site

When you're ready to build your site for production:

```bash
hugo
```

The output will be in the `public/` directory.

---

You now have a functional Hugo site with a custom theme named "ChatBot"! Customize further as needed.
