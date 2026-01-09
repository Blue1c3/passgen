const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const excludeSimilarCheckbox = document.getElementById('excludeSimilar');
const excludeAmbiguousCheckbox = document.getElementById('excludeAmbiguous');
const generateBtn = document.getElementById('generateBtn');
const passwordOutput = document.getElementById('passwordOutput');
const copyBtn = document.getElementById('copyBtn');
const warning = document.getElementById('warning');
const strength = document.getElementById('strength');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const toast = document.getElementById('toast');

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const SIMILAR = 'il1Lo0O';
const AMBIGUOUS = '{}[]()/\\\'"`~,;:.<>';

function updateSliderBackground() {
    const value = lengthSlider.value;
    const min = lengthSlider.min;
    const max = lengthSlider.max;
    const percentage = ((value - min) / (max - min)) * 100;
    lengthSlider.style.background = `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percentage}%, var(--color-border) ${percentage}%, var(--color-border) 100%)`;
}

lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
    updateSliderBackground();
});

function validateOptions() {
    const hasSelection = uppercaseCheckbox.checked || 
                        lowercaseCheckbox.checked || 
                        numbersCheckbox.checked || 
                        symbolsCheckbox.checked;
    
    if (!hasSelection) {
        warning.classList.add('show');
        generateBtn.disabled = true;
    } else {
        warning.classList.remove('show');
        generateBtn.disabled = false;
    }
    
    return hasSelection;
}

[uppercaseCheckbox, lowercaseCheckbox, numbersCheckbox, symbolsCheckbox].forEach(checkbox => {
    checkbox.addEventListener('change', validateOptions);
});

function getCharacterSet() {
    let charset = '';
    
    if (uppercaseCheckbox.checked) charset += UPPERCASE;
    if (lowercaseCheckbox.checked) charset += LOWERCASE;
    if (numbersCheckbox.checked) charset += NUMBERS;
    if (symbolsCheckbox.checked) charset += SYMBOLS;
    
    if (excludeSimilarCheckbox.checked) {
        charset = charset.split('').filter(char => !SIMILAR.includes(char)).join('');
    }
    
    if (excludeAmbiguousCheckbox.checked) {
        charset = charset.split('').filter(char => !AMBIGUOUS.includes(char)).join('');
    }
    
    return charset;
}

function generateSecurePassword(length, charset) {
    if (!charset) return '';
    
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset[array[i] % charset.length];
    }
    
    return password;
}

function calculateStrength(password) {
    let score = 0;
    
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (password.length >= 20) score += 1;
    
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    
    const uniqueChars = new Set(password).size;
    if (uniqueChars >= password.length * 0.5) score += 1;
    
    if (score <= 3) return 'weak';
    if (score <= 5) return 'fair';
    if (score <= 7) return 'good';
    return 'strong';
}

function updateStrengthIndicator(password) {
    if (!password) {
        strength.classList.remove('show');
        return;
    }
    
    const level = calculateStrength(password);
    
    strengthBar.className = 'strength__bar ' + level;
    strengthText.className = 'strength__text ' + level;
    
    const labels = {
        weak: 'Weak',
        fair: 'Fair',
        good: 'Good',
        strong: 'Strong'
    };
    
    strengthText.textContent = labels[level];
    strength.classList.add('show');
}

generateBtn.addEventListener('click', () => {
    if (!validateOptions()) return;
    
    const length = parseInt(lengthSlider.value);
    const charset = getCharacterSet();
    
    if (!charset) {
        passwordOutput.value = '';
        copyBtn.disabled = true;
        strength.classList.remove('show');
        return;
    }
    
    const password = generateSecurePassword(length, charset);
    passwordOutput.value = password;
    copyBtn.disabled = false;
    
    updateStrengthIndicator(password);
    
    copyBtn.classList.remove('copied');
});

copyBtn.addEventListener('click', async () => {
    const password = passwordOutput.value;
    if (!password) return;
    
    try {
        await navigator.clipboard.writeText(password);
        
        copyBtn.classList.add('copied');
        
        toast.classList.add('show');
        
        setTimeout(() => {
            copyBtn.classList.remove('copied');
        }, 2000);
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    } catch (err) {
        console.error('Failed to copy password:', err);
    }
});

passwordOutput.addEventListener('click', () => {
    if (passwordOutput.value) {
        passwordOutput.select();
    }
});

updateSliderBackground();
validateOptions();

generateBtn.click();
