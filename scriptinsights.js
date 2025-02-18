
document.addEventListener("DOMContentLoaded", function() {
let totalBudget = parseFloat(localStorage.getItem("totalBudget")) || 0;
let dailyExpenses = JSON.parse(localStorage.getItem("dailyExpenses")) || {};

let weeklyExpenses = [0, 0, 0, 0]; // Week 1 to Week 4
let currentDate = new Date();
let currentWeek = getCurrentWeek(currentDate); // Find which week today falls into

// Sum up expenses for the current week
Object.keys(dailyExpenses).forEach(date => {
let expenseDate = new Date(date);
let weekIndex = getCurrentWeek(expenseDate) - 1; // Convert week number to array index
if (weekIndex >= 0 && weekIndex < 4) {
    weeklyExpenses[weekIndex] += dailyExpenses[date];
}
});

renderChart(weeklyExpenses);
});

// Function to determine which week of the month a date falls into
function getCurrentWeek(date) {
let day = date.getDate();
if (day <= 7) return 1;
if (day <= 14) return 2;
if (day <= 21) return 3;
return 4;
}

function renderChart(weeklyExpenses) {
const ctx = document.getElementById("expenseChart").getContext("2d");
new Chart(ctx, {
type: "line",
data: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [{
        label: "Total Expenses Per Week",
        data: weeklyExpenses,
        borderColor: "rgba(240, 165, 0, 1)",
        backgroundColor: "rgba(240, 165, 0, 0.2)",
        fill: true
    }]
},
options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true
        }
    }
}
});
}



