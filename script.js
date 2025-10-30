    
        // Game state
        let playerScore = 0;
        let computerScore = 0;
        let isPlaying = false;

        // Game choices
        const choices = {
            bug: {
                name: 'Bug',
                description: 'Quebra o Código',
                icon: 'fas fa-bug',
                emoji: '🐛',
                color: '#ef4444'
            },
            feature: {
                name: 'Feature',
                description: 'Implementa Funcionalidade',
                icon: 'fas fa-code',
                emoji: '💻',
                color: '#3b82f6'
            },
            refactor: {
                name: 'Refactor',
                description: 'Limpa o Código',
                icon: 'fas fa-wrench',
                emoji: '🔧',
                color: '#10b981'
            }
        };

        // Game rules: what beats what
        const rules = {
            bug: 'feature',    // Bug quebra Feature
            feature: 'refactor', // Feature supera Refactor
            refactor: 'bug'     // Refactor resolve Bug
        };

        // DOM elements
        const playerChoiceDiv = document.getElementById('player-choice');
        const computerChoiceDiv = document.getElementById('computer-choice');
        const resultContainer = document.getElementById('result-container');
        const resultText = document.getElementById('result-text');
        const playerScoreElement = document.getElementById('player-score');
        const computerScoreElement = document.getElementById('computer-score');
        const choiceButtons = document.querySelectorAll('.choice-btn');
        const resetButton = document.getElementById('reset-btn');

        // Event listeners
        choiceButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (!isPlaying) {
                    const playerChoice = button.dataset.choice;
                    playGame(playerChoice);
                }
            });
        });

        resetButton.addEventListener('click', resetGame);

        // Main game function
        function playGame(playerChoice) {
            isPlaying = true;
            
            // Disable buttons
            choiceButtons.forEach(btn => btn.disabled = true);
            
            // Show player choice
            showChoice(playerChoiceDiv, playerChoice);
            
            // Show computer thinking
            showLoading(computerChoiceDiv);
            
            // Computer makes choice after delay
            setTimeout(() => {
                const computerChoice = getComputerChoice();
                showChoice(computerChoiceDiv, computerChoice);
                
                // Determine winner
                const result = determineWinner(playerChoice, computerChoice);
                
                // Update score
                updateScore(result);
                
                // Show result
                showResult(result, playerChoice, computerChoice);
                
                // Re-enable buttons
                setTimeout(() => {
                    choiceButtons.forEach(btn => btn.disabled = false);
                    isPlaying = false;
                }, 2000);
                
            }, 1500);
        }

        // Show choice in display area
        function showChoice(element, choice) {
            const choiceData = choices[choice];
            element.innerHTML = `
                <div class="choice-icon" style="background-color: ${choiceData.color};">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">${choiceData.emoji}</div>
                </div>
                <div class="choice-name">${choiceData.name}</div>
                <div class="choice-description">${choiceData.description}</div>
            `;
        }

        // Show loading animation
        function showLoading(element) {
            element.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <div class="loading-text">Nelly Tech está pensando...</div>
                </div>
            `;
        }

        // Get random computer choice
        function getComputerChoice() {
            const choiceArray = Object.keys(choices);
            const randomIndex = Math.floor(Math.random() * choiceArray.length);
            return choiceArray[randomIndex];
        }

        // Determine winner
        function determineWinner(playerChoice, computerChoice) {
            if (playerChoice === computerChoice) {
                return 'tie';
            } else if (rules[playerChoice] === computerChoice) {
                return 'player';
            } else {
                return 'computer';
            }
        }

        // Update score
        function updateScore(result) {
            if (result === 'player') {
                playerScore++;
                playerScoreElement.textContent = playerScore;
            } else if (result === 'computer') {
                computerScore++;
                computerScoreElement.textContent = computerScore;
            }
        }

        // Show result
        function showResult(result, playerChoice, computerChoice) {
            let message = '';
            
            if (result === 'tie') {
                message = 'Empate! 🤝';
            } else if (result === 'player') {
                message = `Você ganhou! 🎉 ${choices[playerChoice].name} ${getActionText(playerChoice, computerChoice)} ${choices[computerChoice].name}`;
            } else {
                message = `Nelly Tech ganhou! 🤖 ${choices[computerChoice].name} ${getActionText(computerChoice, playerChoice)} ${choices[playerChoice].name}`;
            }
            
            resultText.textContent = message;
            resultContainer.style.display = 'block';
            
            // Hide result after 3 seconds
            setTimeout(() => {
                resultContainer.style.display = 'none';
            }, 3000);
        }

        // Get action text for result
        function getActionText(winnerChoice, loserChoice) {
            if (winnerChoice === 'bug' && loserChoice === 'feature') {
                return 'quebra';
            } else if (winnerChoice === 'feature' && loserChoice === 'refactor') {
                return 'supera';
            } else if (winnerChoice === 'refactor' && loserChoice === 'bug') {
                return 'resolve';
            }
            return 'vence';
        }

        // Reset game
        function resetGame() {
            playerScore = 0;
            computerScore = 0;
            playerScoreElement.textContent = '0';
            computerScoreElement.textContent = '0';
            
            playerChoiceDiv.innerHTML = '<div class="waiting-message">Escolha sua Jogada</div>';
            computerChoiceDiv.innerHTML = '<div class="waiting-message">Aguardando...</div>';
            resultContainer.style.display = 'none';
            
            choiceButtons.forEach(btn => btn.disabled = false);
            isPlaying = false;
        }
   