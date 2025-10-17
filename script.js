// Global variable to demonstrate scope
// This variable is accessible from all functions in the script
let globalAnimationSpeed = 1.0;

// ======================================================================
// CUSTOM FUNCTIONS WITH SCOPE AWARENESS, PARAMETERS, AND RETURN VALUES
// ======================================================================
//
// This script demonstrates several key JavaScript concepts:
//
// 1. SCOPE AWARENESS:
//    - Global variables (e.g., globalAnimationSpeed) accessible from all functions
//    - Local variables (e.g., sizeFactor, config) accessible only within their function
//    - Private variables (e.g., count in createScopedCounter) accessible only through returned methods
//
// 2. PARAMETERS AND RETURN VALUES:
//    - All new functions accept parameters to customize their behavior
//    - All new functions return useful values (numbers, objects, result objects)
//
// 3. FUNCTION REUSABILITY:
//    - Functions can be reused to control animations, trigger DOM changes, or calculate values
//
// ======================================================================

// Utility function for generating random colors
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function that calculates animation duration based on parameters
// Demonstrates parameters and return values
// Parameters:
// - baseDuration: The base duration in milliseconds
// - speedMultiplier: A multiplier to adjust the speed (globalAnimationSpeed can be used here)
// - elementSize: The size of the element in pixels
// Returns: The calculated duration in milliseconds
function calculateAnimationDuration(baseDuration, speedMultiplier, elementSize) {
    // Local variables to demonstrate scope
    // These variables are only accessible within this function
    let sizeFactor = elementSize / 100;
    let adjustedDuration = baseDuration * speedMultiplier * sizeFactor;
    
    // Return the calculated duration
    return adjustedDuration;
}

// Function that creates reusable animation configurations
// Demonstrates parameters and return values
// Parameters:
// - type: The type of animation (e.g., 'pulse', 'slide', 'fade')
// - duration: The duration of the animation in milliseconds
// - easing: The easing function to use (default: 'ease')
// Returns: An object containing the animation configuration
function createAnimationConfig(type, duration, easing = 'ease') {
    // Local variable to demonstrate scope
    // This variable is only accessible within this function
    const config = {
        animationType: type,
        duration: duration,
        easing: easing,
        timestamp: new Date().toISOString()
    };
    
    // Return the configuration object
    return config;
}

// Function that returns computed styles for elements
// Demonstrates parameters and return values
// Parameter:
// - element: The DOM element to get computed styles for
// Returns: An object containing relevant animation styles
function getComputedAnimationStyles(element) {
    // Local variable to demonstrate scope
    // This variable is only accessible within this function
    const computedStyles = window.getComputedStyle(element);
    
    // Return an object with relevant animation styles
    return {
        animationName: computedStyles.animationName,
        animationDuration: computedStyles.animationDuration,
        animationTimingFunction: computedStyles.animationTimingFunction,
        transform: computedStyles.transform,
        opacity: computedStyles.opacity
    };
}

// Function that manages animation states
// Demonstrates parameters and return values
// Parameters:
// - element: The DOM element to manage animation state for
// - action: The action to perform ('start', 'stop', or 'toggle')
// Returns: An object containing the result of the action
function manageAnimationState(element, action) {
    // Local variables to demonstrate scope
    // These variables are only accessible within this function
    let currentState = element.classList.contains('animating');
    let result = false;
    
    switch (action) {
        case 'start':
            element.classList.add('animating');
            result = true;
            break;
        case 'stop':
            element.classList.remove('animating');
            result = true;
            break;
        case 'toggle':
            element.classList.toggle('animating');
            result = !currentState;
            break;
        default:
            console.warn('Invalid animation action:', action);
    }
    
    // Return the result of the action
    return {
        success: result,
        newState: element.classList.contains('animating'),
        element: element
    };
}

// Function that demonstrates closure and scope
// This function creates a counter object with private state
// Parameter:
// - initialValue: The initial value for the counter (default: 0)
// Returns: An object with methods to manipulate the counter
// Demonstrates:
// - Closure: The returned methods have access to the 'count' variable even after the function has finished executing
// - Scope: The 'count' variable is private to this function and cannot be accessed directly from outside
function createScopedCounter(initialValue = 0) {
    // Local variable that is private to this function scope
    // This variable cannot be accessed directly from outside the function
    let count = initialValue;
    
    // Return an object with methods that have access to the local variable
    // This demonstrates closure - the methods "close over" the 'count' variable
    return {
        increment: function(step = 1) {
            count += step;
            return count;
        },
        decrement: function(step = 1) {
            count -= step;
            return count;
        },
        reset: function() {
            count = initialValue;
            return count;
        },
        getValue: function() {
            return count;
        }
    };
}

// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    // This feature allows users to switch between light and dark modes
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        // Add animation to the toggle button
        this.classList.add('glow');
        
        // Use the manageAnimationState function to handle the animation
        const animationResult = manageAnimationState(this, 'start');
        
        // Use the calculateAnimationDuration function to determine glow duration
        const glowDuration = calculateAnimationDuration(500, globalAnimationSpeed, 20);
        
        setTimeout(() => {
            this.classList.remove('glow');
            manageAnimationState(this, 'stop');
        }, glowDuration);
        
        // Update button text based on current theme
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.textContent = 'Toggle Light Mode';
        } else {
            themeToggle.textContent = 'Toggle Dark Mode';
        }
    });

    // Counter Game Functionality
    // This feature implements a simple counter with increment, decrement, and reset buttons
    const counterElement = document.getElementById('counter');
    const incrementBtn = document.getElementById('increment-btn');
    const decrementBtn = document.getElementById('decrement-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    // Create a scoped counter using our new function
    const scopedCounter = createScopedCounter(0);
    
    // Create an animation configuration for the counter
    const counterAnimationConfig = createAnimationConfig('pulse', 500, 'ease-in-out');
    
    // Increment function
    incrementBtn.addEventListener('click', function() {
        const newCount = scopedCounter.increment();
        counterElement.textContent = newCount;
        // Add animation class
        counterElement.classList.add('counter-animation');
        
        // Use the calculateAnimationDuration function
        const animationDuration = calculateAnimationDuration(
            parseFloat(counterAnimationConfig.duration),
            globalAnimationSpeed,
            counterElement.offsetWidth
        );
        
        // Use the manageAnimationState function
        manageAnimationState(counterElement, 'start');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            counterElement.classList.remove('counter-animation');
            manageAnimationState(counterElement, 'stop');
        }, animationDuration);
    });
    
    // Decrement function
    decrementBtn.addEventListener('click', function() {
        const newCount = scopedCounter.decrement();
        counterElement.textContent = newCount;
        // Add animation class
        counterElement.classList.add('counter-animation');
        
        // Use the calculateAnimationDuration function
        const animationDuration = calculateAnimationDuration(
            parseFloat(counterAnimationConfig.duration),
            globalAnimationSpeed,
            counterElement.offsetWidth
        );
        
        // Use the manageAnimationState function
        manageAnimationState(counterElement, 'start');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            counterElement.classList.remove('counter-animation');
            manageAnimationState(counterElement, 'stop');
        }, animationDuration);
    });
    
    // Reset function
    resetBtn.addEventListener('click', function() {
        const newCount = scopedCounter.reset();
        counterElement.textContent = newCount;
        // Add animation class
        counterElement.classList.add('counter-animation');
        
        // Use the calculateAnimationDuration function
        const animationDuration = calculateAnimationDuration(
            parseFloat(counterAnimationConfig.duration),
            globalAnimationSpeed,
            counterElement.offsetWidth
        );
        
        // Use the manageAnimationState function
        manageAnimationState(counterElement, 'start');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            counterElement.classList.remove('counter-animation');
            manageAnimationState(counterElement, 'stop');
        }, animationDuration);
    });

    // FAQ Collapsible Functionality
    // This feature allows FAQ items to be expanded and collapsed
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Create an animation configuration for FAQ items
    const faqAnimationConfig = createAnimationConfig('slide', 400, 'ease');
    
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            // Toggle the active class on the answer element
            const answer = this.nextElementSibling;
            answer.classList.toggle('active');
            // Toggle active class on the question for styling
            this.classList.toggle('active');
            
            // Use the calculateAnimationDuration function
            const animationDuration = calculateAnimationDuration(
                parseFloat(faqAnimationConfig.duration),
                globalAnimationSpeed,
                answer.offsetHeight
            );
            
            // Use the manageAnimationState function
            const result = manageAnimationState(answer, 'toggle');
            
            // Get computed styles to demonstrate the function
            const computedStyles = getComputedAnimationStyles(answer);
            console.log('FAQ Animation Styles:', computedStyles);
        });
        
        // ======================================================================
        // NEW ANIMATION INTEGRATIONS
        // ======================================================================
        //
        // These functions demonstrate how to integrate CSS animations with JavaScript:
        // 1. Button that triggers a box animation on click
        // 2. Card flip animation that activates on click
        // 3. Loading animation that starts/stops based on user input
        // 4. Popup/modal that slides in and fades out in response to specific events
        //
        // Each function uses our custom functions to demonstrate scope awareness,
        // parameters, return values, and reusability.
        
        // Box animation functionality
        // Implements a button that triggers a box animation on click
        document.addEventListener('DOMContentLoaded', function() {
            const animateBoxBtn = document.getElementById('animate-box-btn');
            const animatedBox = document.getElementById('animated-box');
            
            animateBoxBtn.addEventListener('click', function() {
                // Add animated class to trigger CSS animation
                animatedBox.classList.add('animated');
                
                // Use our new functions to manage the animation
                // This demonstrates function reusability and parameter usage
                const animationResult = manageAnimationState(animatedBox, 'start');
                const animationConfig = createAnimationConfig('boxAnimation', 1000, 'ease');
                
                // Remove animation class after it completes
                // This demonstrates using return values from functions
                setTimeout(() => {
                    animatedBox.classList.remove('animated');
                    manageAnimationState(animatedBox, 'stop');
                }, parseFloat(animationConfig.duration));
            });
            
            // Card flip functionality
            // Implements a card flip animation that activates on click
            const flipCardBtn = document.getElementById('flip-card-btn');
            const flipContainer = document.getElementById('flip-container');
            
            flipCardBtn.addEventListener('click', function() {
                // Toggle flipped class to trigger CSS animation
                flipContainer.classList.toggle('flipped');
                
                // Use our new functions to manage the animation
                // This demonstrates function reusability with different parameters
                const animationResult = manageAnimationState(flipContainer, 'toggle');
                const animationConfig = createAnimationConfig('flip', 800, 'ease');
                
                // Log computed styles to demonstrate the function
                // This demonstrates using return values from functions
                const computedStyles = getComputedAnimationStyles(flipContainer);
                console.log('Card flip animation styles:', computedStyles);
            });
            
            // Loading animation functionality
            // Implements a loading animation that starts/stops based on user input
            const startLoadingBtn = document.getElementById('start-loading-btn');
            const stopLoadingBtn = document.getElementById('stop-loading-btn');
            const loadingSpinner = document.getElementById('loading-spinner');
            
            startLoadingBtn.addEventListener('click', function() {
                // Show loading spinner
                loadingSpinner.classList.add('active');
                
                // Use our new functions to manage the animation
                // This demonstrates function reusability with different elements
                const animationResult = manageAnimationState(loadingSpinner, 'start');
                const animationConfig = createAnimationConfig('spin', 1000, 'linear');
                
                // Log computed styles to demonstrate the function
                // This demonstrates using return values from functions
                const computedStyles = getComputedAnimationStyles(loadingSpinner);
                console.log('Loading spinner animation styles:', computedStyles);
            });
            
            stopLoadingBtn.addEventListener('click', function() {
                // Hide loading spinner
                loadingSpinner.classList.remove('active');
                
                // Use our new functions to manage the animation
                // This demonstrates function reusability with different actions
                const animationResult = manageAnimationState(loadingSpinner, 'stop');
            });
            
            // Popup/modal functionality
            // Implements a popup/modal that slides in and fades out in response to specific events
            const showPopupBtn = document.getElementById('show-popup-btn');
            const popupModal = document.getElementById('popup-modal');
            const closePopupBtn = document.getElementById('close-popup-btn');
            const closeSpan = popupModal.querySelector('.close');
            
            showPopupBtn.addEventListener('click', function() {
                // Show popup modal
                popupModal.classList.add('show');
                
                // Use our new functions to manage the animation
                // This demonstrates function reusability with complex animations
                const animationResult = manageAnimationState(popupModal, 'start');
                const animationConfig = createAnimationConfig('slideIn', 300, 'ease');
                
                // Log computed styles to demonstrate the function
                // This demonstrates using return values from functions
                const computedStyles = getComputedAnimationStyles(popupModal);
                console.log('Popup modal animation styles:', computedStyles);
            });
            
            closePopupBtn.addEventListener('click', function() {
                // Hide popup modal with fade out animation
                popupModal.classList.remove('show');
                popupModal.classList.add('hide');
                
                // Use our new functions to manage the animation
                // This demonstrates function reusability with different actions
                const animationResult = manageAnimationState(popupModal, 'stop');
                
                // Remove hide class after animation completes
                // This demonstrates using return values from functions to determine timing
                setTimeout(() => {
                    popupModal.classList.remove('hide');
                }, 300);
            });
            
            closeSpan.addEventListener('click', function() {
                // Hide popup modal with fade out animation
                popupModal.classList.remove('show');
                popupModal.classList.add('hide');
                
                // Use our new functions to manage the animation
                // This demonstrates function reusability with different event handlers
                const animationResult = manageAnimationState(popupModal, 'stop');
                
                // Remove hide class after animation completes
                // This demonstrates using return values from functions to determine timing
                setTimeout(() => {
                    popupModal.classList.remove('hide');
                }, 300);
            });
            
            // Close modal when clicking outside of it
            window.addEventListener('click', function(event) {
                if (event.target === popupModal) {
                    // Hide popup modal with fade out animation
                    popupModal.classList.remove('show');
                    popupModal.classList.add('hide');
                    
                    // Use our new functions to manage the animation
                    // This demonstrates function reusability with global event handlers
                    const animationResult = manageAnimationState(popupModal, 'stop');
                    
                    // Remove hide class after animation completes
                    // This demonstrates using return values from functions to determine timing
                    setTimeout(() => {
                        popupModal.classList.remove('hide');
                    }, 300);
                }
            });
        });
        
        });

    // Dropdown Menu Functionality
    // This feature implements a custom dropdown menu
    const dropdownBtn = document.getElementById('dropdown-btn');
    const dropdownContent = document.getElementById('dropdown-content');
    const dropdownLinks = dropdownContent.querySelectorAll('a');
    
    // Create an animation configuration for dropdown
    const dropdownAnimationConfig = createAnimationConfig('fade', 300, 'ease-out');
    
    // Toggle dropdown visibility
    dropdownBtn.addEventListener('click', function() {
        const dropdown = document.querySelector('.dropdown');
        dropdown.classList.toggle('show');
        
        // Use the calculateAnimationDuration function
        const animationDuration = calculateAnimationDuration(
            parseFloat(dropdownAnimationConfig.duration),
            globalAnimationSpeed,
            dropdownContent.offsetWidth
        );
        
        // Use the manageAnimationState function
        const result = manageAnimationState(dropdownContent, 'toggle');
    });
    
    // Handle dropdown item selection
    dropdownLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            dropdownBtn.textContent = this.textContent;
            document.querySelector('.dropdown').classList.remove('show');
            
            // Use the manageAnimationState function
            const result = manageAnimationState(document.querySelector('.dropdown'), 'stop');
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            const dropdown = document.querySelector('.dropdown');
            dropdown.classList.remove('show');
            
            // Use the manageAnimationState function
            const result = manageAnimationState(dropdown, 'stop');
        }
    });

    // Tabbed Interface Functionality
    // This feature implements a tabbed content interface
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Get the target tab ID
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show the target tab pane
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Form Validation Functionality
    // This feature validates user input in the registration form
    const userForm = document.getElementById('user-form');
    
    // Create an animation configuration for form feedback
    const formAnimationConfig = createAnimationConfig('fade', 500, 'ease-in-out');
    
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        validateForm();
    });
    
    // Validation function
    function validateForm() {
        // Get form elements
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm-password');
        
        // Get error message elements
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');
        const confirmPasswordError = document.getElementById('confirm-password-error');
        
        // Get feedback element
        const formFeedback = document.getElementById('form-feedback');
        
        // Reset error messages
        nameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';
        formFeedback.textContent = '';
        formFeedback.className = 'form-feedback';
        
        // Show error messages with animation
        function showError(element, message) {
            element.textContent = message;
            element.classList.add('show');
            
            // Use the manageAnimationState function
            manageAnimationState(element, 'start');
        }
        
        // Hide error messages
        function hideError(element) {
            element.textContent = '';
            element.classList.remove('show');
            
            // Use the manageAnimationState function
            manageAnimationState(element, 'stop');
        }
        
        // Validation flags
        let isValid = true;
        
        // Name validation
        if (name.value.trim() === '') {
            showError(nameError, 'Name is required');
            isValid = false;
        } else if (name.value.trim().length < 2) {
            showError(nameError, 'Name must be at least 2 characters');
            isValid = false;
        } else {
            hideError(nameError);
        }
        
        // Email validation
        if (email.value.trim() === '') {
            showError(emailError, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value.trim())) {
            showError(emailError, 'Please enter a valid email address');
            isValid = false;
        } else {
            hideError(emailError);
        }
        
        // Password validation
        if (password.value.trim() === '') {
            showError(passwordError, 'Password is required');
            isValid = false;
        } else if (password.value.length < 6) {
            showError(passwordError, 'Password must be at least 6 characters');
            isValid = false;
        } else {
            hideError(passwordError);
        }
        
        // Confirm password validation
        if (confirmPassword.value.trim() === '') {
            showError(confirmPasswordError, 'Please confirm your password');
            isValid = false;
        } else if (confirmPassword.value !== password.value) {
            showError(confirmPasswordError, 'Passwords do not match');
            isValid = false;
        } else {
            hideError(confirmPasswordError);
        }
        
        // Show feedback based on validation result
        if (isValid) {
            // Add loading animation
            const submitButton = userForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.innerHTML = originalText + ' <span class="loading"></span>';
            submitButton.disabled = true;
            
            // Use the manageAnimationState function
            manageAnimationState(submitButton, 'start');
            
            // Use the calculateAnimationDuration function for submission delay
            const submissionDelay = calculateAnimationDuration(2000, globalAnimationSpeed, 100);
            
            // Simulate form submission
            setTimeout(() => {
                formFeedback.textContent = 'Form submitted successfully!';
                formFeedback.classList.add('success', 'show');
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Use the manageAnimationState function
                manageAnimationState(formFeedback, 'start');
                manageAnimationState(submitButton, 'stop');
                
                // Reset form after success
                userForm.reset();
            }, submissionDelay);
        } else {
            formFeedback.textContent = 'Please fix the errors above';
            formFeedback.classList.add('error', 'show');
            
            // Use the manageAnimationState function
            manageAnimationState(formFeedback, 'start');
            
            // Get computed styles to demonstrate the function
            const computedStyles = getComputedAnimationStyles(formFeedback);
            console.log('Form Feedback Animation Styles:', computedStyles);
        }
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Function to create floating elements
    function createFloatingElement(text, container) {
        const element = document.createElement('div');
        element.textContent = text;
        element.classList.add('floating');
        element.style.position = 'absolute';
        element.style.left = Math.random() * 80 + 10 + '%';
        element.style.top = Math.random() * 80 + 10 + '%';
        element.style.fontSize = Math.random() * 20 + 10 + 'px';
        element.style.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        container.appendChild(element);
        
        // Remove element after animation completes
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, 3000);
    }
    
    // Function to apply glow effect to elements
    function applyGlowEffect(element) {
        element.classList.add('glow');
        setTimeout(() => {
            element.classList.remove('glow');
        }, 1000);
    }
    
    // Add interactive features to the page
    document.addEventListener('DOMContentLoaded', function() {
        // Add floating elements to the header on click
        const header = document.querySelector('header');
        header.addEventListener('click', function(e) {
            if (e.target === header) {
                createFloatingElement('✨', header);
                
                // Demonstrate scope awareness with local variable
                const localClickCount = 1;
                console.log('Local click count:', localClickCount);
                console.log('Global animation speed:', globalAnimationSpeed);
            }
        });
        
        // Add glow effect to sections on hover
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.addEventListener('mouseenter', function() {
                applyGlowEffect(this);
                
                // Use the manageAnimationState function
                const result = manageAnimationState(this, 'start');
                
                // Use the getComputedAnimationStyles function
                const styles = getComputedAnimationStyles(this);
                console.log('Section animation styles:', styles);
            });
            
            section.addEventListener('mouseleave', function() {
                // Use the manageAnimationState function
                const result = manageAnimationState(this, 'stop');
            });
        });
        
        // Add color-changing feature to the header
        let colorChangeInterval;
        header.addEventListener('dblclick', function() {
            if (colorChangeInterval) {
                clearInterval(colorChangeInterval);
                colorChangeInterval = null;
                // Reset to original gradient
                this.style.background = '';
                
                // Use the manageAnimationState function
                const result = manageAnimationState(this, 'stop');
            } else {
                // Create an animation configuration for header color change
                const headerAnimationConfig = createAnimationConfig('colorChange', 1000, 'linear');
                
                colorChangeInterval = setInterval(() => {
                    const color1 = getRandomColor();
                    const color2 = getRandomColor();
                    this.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
                    
                    // Use the manageAnimationState function
                    const result = manageAnimationState(this, 'toggle');
                }, parseFloat(headerAnimationConfig.duration));
            }
        });
    });
});