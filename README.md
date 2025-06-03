# 🎭 Playwright Test Automation – Quick Start Guide

This project uses [Playwright](https://playwright.dev/) for end-to-end browser automation and testing.

## ⚙️ Setup Commands

Use the following commands in your terminal to set up and manage your Playwright project:

### 🛠 Initialization & Installation

- npx playwright init
  Initializes a new Playwright project and installs required packages.

- npx playwright install
  Installs any missing browser dependencies.

---

### ▶️ Running Tests

- npx playwright test
  Runs **all available tests** in the project.

- npx playwright test sauceDemoPass
  Runs the **passing test case** named `sauceDemoPass`.

- npx playwright test sauceDemoFail
  Runs the **failing test case** named `sauceDemoFail`.

---

### 📊 Viewing Test Reports

- npx playwright show-report
  Opens the generated HTML report in your browser.

- Ctrl + C
  Closes the report window in the terminal.

---

### ✍️ Record Tests Interactively

- npx playwright codegen
  Launches a browser and generates test code as you interact with the UI.

---

## 📌 Notes

- Ensure Node.js is installed on your machine.
- It is recommended to install the Playwright extension for Visual Studio Code.

---

Happy testing! 🚀
