# Lecture Video Progress Tracker

This is a web application that tracks how much of a lecture video a user has actually watched. It only counts the parts of the video that the user sees for the first time, and does not increase progress if they rewatch or skip ahead.

## 📌 What it Does

- Tracks video progress based on **unique seconds watched**
- Prevents progress increase if the user skips or re-watches old parts
- Stores user progress using **localStorage**, so they can resume later
- Shows percentage watched and a progress bar
- Automatically resumes from the last position on page reload

## 💻 How to Use

1. Clone or download the project folder.
2. Add your video file in the `assets/` folder (replace the default one if needed).
3. Open `index.html` in your browser to try it out.

That’s it! The progress will save automatically in your browser.

## 📁 Files in the Project

- `index.html` → Main webpage
- `style.css` → All styles for layout and design
- `script.js` → Main logic to track video progress and save it
- `assets/` → Folder to keep the video file

## ⚙️ How Progress is Tracked

- The script listens to the video’s current time every second.
- It stores time intervals that the user watches.
- If the time overlaps with a previously watched part, it is not counted again.
- All watched intervals are saved in the browser’s storage.

## 🔄 Data Saving

- Progress is saved in **localStorage** (browser storage).
- When the user reloads or comes back later, it loads the old intervals and continues from the last watched point.

## 📝 Things You Can Improve (if needed)

- Add a backend to save data for real users (MongoDB or Firebase)
- Add user login and authentication
- Add analytics to see what parts were skipped or rewatched

 

