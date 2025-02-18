
document.addEventListener('DOMContentLoaded', function() {
    let currentXP = parseInt(localStorage.getItem('currentXP') || 10);
    let currentLevel = parseInt(localStorage.getItem('currentLevel') || 0);
    const xpPerLevel = [100, 200, 300, 400, 500]; // XP needed for each level
    let expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    
    // Initialize XP display
    updateXPDisplay();
    
    // Load existing expenses
    renderExpenses();
    updateSummary();
    
    // Handle expense form submission
    document.getElementById('expense-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('expense-name').value;
        const amount = parseFloat(document.getElementById('expense-amount').value);
        const category = document.getElementById('expense-category').value;
        const date = document.getElementById('expense-date').value;
        
        // Add the new expense
        const newExpense = {
            id: Date.now(),
            name,
            amount,
            category,
            date,
            timestamp: new Date().toISOString()
        };
        
        expenses.push(newExpense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        
        // Add XP for tracking an expense
        currentXP += 5;
        checkLevelUp();
        updateXPDisplay();
        
        // Reset form and update display
        this.reset();
        renderExpenses();
        updateSummary();
        
        // Show success message
        alert('🎉 Expense added! +5 XP gained for financial tracking!');
    });
    
    function renderExpenses() {
        const expensesTable = document.getElementById('expenses-list');
        expensesTable.innerHTML = '';
        
        // Sort by date (newest first)
        const sortedExpenses = expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Get only the most recent 10 expenses
        const recentExpenses = sortedExpenses.slice(0, 10);
        
        if (recentExpenses.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="5" style="text-align: center;">No expenses recorded yet</td>';
            expensesTable.appendChild(row);
            return;
        }
        
        // Map category to emoji
        const categoryIcons = {
            'food': '🍔',
            'transport': '🚌',
            'entertainment': '🎬',
            'shopping': '🛍️',
            'utilities': '💡',
            'health': '🏥',
            'education': '📚',
            'other': '❓'
        };
        
        recentExpenses.forEach(expense => {
            const row = document.createElement('tr');
            
            // Format date
            const formattedDate = new Date(expense.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${expense.name}</td>
                <td><span class="category-icon">${categoryIcons[expense.category] || '❓'}</span> ${expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td><button class="delete-btn" data-id="${expense.id}">Delete</button></td>
            `;
            
            expensesTable.appendChild(row);
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                
                // Remove the expense
                expenses = expenses.filter(expense => expense.id !== id);
                localStorage.setItem('expenses', JSON.stringify(expenses));
                
                // Update display
                renderExpenses();
                updateSummary();
            });
        });
    }
    
    function updateSummary() {
        // Calculate totals
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        
        // Get this week's expenses
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Start of current week (Sunday)
        startOfWeek.setHours(0, 0, 0, 0);
        
        const thisWeekTotal = expenses
            .filter(expense => new Date(expense.date) >= startOfWeek)
            .reduce((sum, expense) => sum + expense.amount, 0);
        
        // Get this month's expenses
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        
        const thisMonthTotal = expenses
            .filter(expense => new Date(expense.date) >= startOfMonth)
            .reduce((sum, expense) => sum + expense.amount, 0);
        
        // Get top category
        const categories = {};
        expenses.forEach(expense => {
            if (!categories[expense.category]) {
                categories[expense.category] = 0;
            }
            categories[expense.category] += expense.amount;
        });
        
        let topCategory = 'None yet';
        let topAmount = 0;
        
        for (const category in categories) {
            if (categories[category] > topAmount) {
                topAmount = categories[category];
                topCategory = category.charAt(0).toUpperCase() + category.slice(1);
            }
        }
        
        // Update summary display
        document.getElementById('this-week-total').textContent = `$${thisWeekTotal.toFixed(2)}`;
        document.getElementById('this-month-total').textContent = `$${thisMonthTotal.toFixed(2)}`;
        document.getElementById('top-category').textContent = topCategory;
        document.getElementById('total-expenses').textContent = `$${total.toFixed(2)}`;
    }
    
    function checkLevelUp() {
        if (currentXP >= xpPerLevel[currentLevel] && currentLevel < xpPerLevel.length) {
            currentLevel++;
            alert(`🎉 Congratulations! You've reached Level ${currentLevel}!`);
            
            localStorage.setItem('currentLevel', currentLevel);
        }
        
        localStorage.setItem('currentXP', currentXP);
    }
    
    function updateXPDisplay() {
        document.getElementById('xp-value').textContent = currentXP;
        document.getElementById('level-value').textContent = currentLevel;
        
        // Calculate target XP for current level
        const targetXP = currentLevel < xpPerLevel.length ? xpPerLevel[currentLevel] : xpPerLevel[xpPerLevel.length - 1];
        document.getElementById('xp-next-level').textContent = targetXP;
        
        // Calculate previous level's XP requirement
        const previousLevelXP = currentLevel > 0 ? xpPerLevel[currentLevel - 1] : 0;
        
        // Calculate progress within current level
        const levelProgress = ((currentXP - previousLevelXP) / (targetXP - previousLevelXP)) * 100;
        document.getElementById('xp-fill').style.width = `${Math.min(levelProgress, 100)}%`;
    }
});
