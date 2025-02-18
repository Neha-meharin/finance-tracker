
        // Initialize XP and level display
        document.addEventListener('DOMContentLoaded', function() {
            // Get saved XP from localStorage or default to 10
            const savedXP = localStorage.getItem('pocketHeroXP') ? 
                parseInt(localStorage.getItem('pocketHeroXP')) : 10;
            
            // Calculate level based on XP
            let currentLevel = 0;
            const xpPerLevel = [100, 200, 300, 400, 500];
            
            let remainingXP = savedXP;
            for (let i = 0; i < xpPerLevel.length; i++) {
                if (remainingXP >= xpPerLevel[i]) {
                    remainingXP -= xpPerLevel[i];
                    currentLevel++;
                } else {
                    break;
                }
            }
            
            // Update the display
            document.getElementById('level-value').textContent = currentLevel;
            document.getElementById('xp-value').textContent = savedXP;
            
            // Calculate target XP for current level
            const targetXP = currentLevel < xpPerLevel.length ? 
                xpPerLevel[currentLevel] : xpPerLevel[xpPerLevel.length - 1];
            document.getElementById('xp-next-level').textContent = targetXP;
            
            // Calculate previous level's total XP
            let previousLevelTotalXP = 0;
            for (let i = 0; i < currentLevel; i++) {
                previousLevelTotalXP += xpPerLevel[i];
            }
            
            // Calculate progress within current level
            const levelXP = savedXP - previousLevelTotalXP;
            const levelProgress = (levelXP / targetXP) * 100;
            document.getElementById('xp-fill').style.width = `${Math.min(levelProgress, 100)}%`;
            
            // Add event listeners for community challenges
            const joinButtons = document.querySelectorAll('.challenge-join');
            joinButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const challenge = this.closest('.community-challenge');
                    const xpText = challenge.querySelector('.challenge-xp span').textContent;
                    const xpMatch = xpText.match(/\d+/);
                    
                    if (xpMatch) {
                        const xpAmount = parseInt(xpMatch[0]);
                        
                        // Check if already joined
                        if (this.textContent === 'Join Challenge') {
                            this.textContent = 'Leave Challenge';
                            challenge.style.borderColor = '#8c52ff';
                            
                            alert(`You've joined the challenge! Complete it to earn ${xpAmount} XP.`);
                        } else {
                            this.textContent = 'Join Challenge';
                            challenge.style.borderColor = '#3e3b4f';
                            
                            
                        }
                    }
                });
            });
            
            // Mobile menu toggle
            document.getElementById('menu-toggle').addEventListener('click', function() {
                const navLinks = document.querySelector('.nav-links');
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            });
            
            // Create post button
            document.querySelector('.create-post').addEventListener('click', function() {
                alert('Coming soon: Create your own post to share with the community!');
            });
        });
    