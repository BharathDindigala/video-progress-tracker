const video = document.getElementById('video-player');
const progressBar = document.getElementById('progress-bar-inner');
const percentageDisplay = document.getElementById('percentage');

let watchedIntervals = [];

function updateProgress() {
    const totalWatched = watchedIntervals.reduce((total, interval) => total + (interval.end - interval.start), 0);
    const totalVideoLength = video.duration;
    const progressPercentage = (totalWatched / totalVideoLength) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    percentageDisplay.innerText = `${Math.round(progressPercentage)}%`;
}

video.addEventListener('timeupdate', () => {
    const currentTime = video.currentTime;
    const interval = { start: currentTime, end: currentTime + 1 };

    if (!isIntervalTracked(interval)) {
        watchedIntervals.push(interval);
        updateProgress();
    }
});

function isIntervalTracked(newInterval) {
    return watchedIntervals.some(existingInterval =>
        (newInterval.start >= existingInterval.start && newInterval.start <= existingInterval.end) ||
        (newInterval.end >= existingInterval.start && newInterval.end <= existingInterval.end)
    );
}

function mergeIntervals(intervals) {
    intervals.sort((a, b) => a.start - b.start);
    const merged = [];

    for (let i = 0; i < intervals.length; i++) {
        if (merged.length === 0 || merged[merged.length - 1].end < intervals[i].start) {
            merged.push(intervals[i]);
        } else {
            merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, intervals[i].end);
        }
    }
    return merged;
}

function saveProgress() {
    localStorage.setItem('watchedIntervals', JSON.stringify(watchedIntervals));
}

function loadProgress() {
    const savedProgress = JSON.parse(localStorage.getItem('watchedIntervals'));
    if (savedProgress) {
        watchedIntervals = savedProgress;
        updateProgress();
        video.currentTime = watchedIntervals[watchedIntervals.length - 1]?.end || 0;
    }
}

window.addEventListener('load', loadProgress);
video.addEventListener('pause', saveProgress);
window.addEventListener('beforeunload', saveProgress);
