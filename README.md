# Dynamic React Dashboard - CNAPP Style
 To View https://accunox-react-t.vercel.app/
This project is a dynamic dashboard page built with React, Redux Toolkit, Tailwind CSS, and Chart.js. It was created as a frontend trainee assignment to demonstrate the ability to build interactive and data-driven user interfaces. The dashboard allows users to manage widgets within different categories dynamically.

## Features

*   **Dynamic Dashboard Rendering:** The initial dashboard structure and widgets are loaded from a JSON configuration.
*   **Categorized Layout:** Widgets are organized into distinct categories (e.g., CSPM, CWPP, Registry Scan).
*   **Widget Management:**
    *   **Add Widgets:** Users can add new widgets to categories via a modal.
    *   **Template-based Addition:** The modal allows selecting from predefined widget templates, filtered by category and searchable.
    *   **Custom Text Widget:** Users can create and add custom text-based widgets with a name and content.
    *   **Remove Widgets:** Each widget has a remove icon (X) to delete it from its category.
    *   **Modal Uncheck to Remove:** In the "Add Widget" modal, unchecking an already added template-based widget and confirming will remove it from the dashboard.
*   **Chart Visualizations:**
    *   Doughnut charts (using Chart.js).
    *   Simulated horizontal stacked bar charts.
    *   "No data available" placeholders for empty chart widgets.
*   **State Management:** Redux Toolkit is used for managing the dashboard's state, including categories and widgets. `createAsyncThunk` is used for the initial (mocked) data fetching.
*   **Responsive Design:** The layout and components are designed to be responsive across different screen sizes using Tailwind CSS.
*   **Styling:** UI styled with Tailwind CSS to closely match the provided design images.
*   **Iconography:** Heroicons are used for icons.

## Technologies Used

*   **React** (v18+)
*   **Redux Toolkit** (for state management)
*   **React-Redux**
*   **Chart.js** (v4+)
*   **React-Chartjs-2** (v5+)
*   **Tailwind CSS** (v3+)
*   **Heroicons** (v2+)
*   JavaScript (ES6+)
*   Node.js & NPM

## Prerequisites

Before you begin, ensure you have met the following requirements:
*   You have installed a recent version of [Node.js](https://nodejs.org/) (which includes npm). Recommended: LTS version.
*   You have `git` installed (for cloning the repository).

## Getting Started

To get a local copy up and running, follow these simple steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/prafulpawar/AccunoxReactT.git
    cd AccunoxReactT
    ```
    *(Replace `AccunoxReactT` with your actual project directory name if it's different after cloning)*

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

## Running the Application

To start the development server and view the application in your browser:

```bash
npm run dev 
