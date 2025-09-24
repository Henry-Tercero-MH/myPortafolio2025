// Configuración de partículas
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,  
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#00d4ff', '#ff006e', '#8338ec']
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00d4ff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

// Variables globales
let isMenuOpen = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Función principal de inicialización
function initializeApp() {
    setupNavigationMenu();
    setupSmoothScrolling();
    setupTypingEffect();
    setupCounterAnimation();
    setupSkillBars();
    setupScrollAnimations();
    setupFormHandling();
    setupIntersectionObserver();
    setupGlitchEffect();
}

// Configuración del menú de navegación
function setupNavigationMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle del menú hamburguesa
    hamburger.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animación del hamburger
        const spans = hamburger.querySelectorAll('span');
        if (isMenuOpen) {
            spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMenuOpen) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                isMenuOpen = false;
                
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Navegación sticky
    setupStickyNavigation();
}

// Navegación pegajosa con efectos
function setupStickyNavigation() {
    const nav = document.querySelector('.hologram-nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.boxShadow = '0 5px 30px rgba(0, 212, 255, 0.3)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.9)';
            nav.style.boxShadow = 'none';
        }
    });
}

// Scroll suave
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Efecto de escritura
function setupTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const texts = [
        'Desarrollador Full Stack',
        'Diseñador Web',
        'Creador de Experiencias',
        'Innovador Digital'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pausa al final
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pausa antes de empezar el siguiente texto
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    typeWriter();
}

// Animación de contadores
function setupCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 200;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                // Mostrar "1+" solo para números mayores a 1
                if (target > 1) {
                    counter.textContent = target + '+';
                } else {
                    counter.textContent = target;
                }
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 10);
    }
    
    // Observador para activar animaciones cuando sea visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            }
        });
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Animación de barras de habilidades
function setupSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.getAttribute('data-level');
                
                if (!skillBar.classList.contains('animated')) {
                    skillBar.classList.add('animated');
                    skillBar.style.setProperty('--skill-width', level + '%');
                    
                    // Añadir animación de brillo
                    setTimeout(() => {
                        skillBar.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.5)';
                    }, 1000);
                }
            }
        });
    });
    
    skillLevels.forEach(skill => {
        observer.observe(skill);
    });
}

// Animaciones de scroll
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .skill-category, .stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Manejo del formulario de contacto con WhatsApp
function setupFormHandling() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Validar que todos los campos estén llenos
            if (!nombre || !email || !asunto || !mensaje) {
                alert('Por favor completa todos los campos');
                return;
            }
            
            // Formatear mensaje para WhatsApp
            const mensajeWhatsApp = `*NUEVO CLIENTE POTENCIAL*%0A%0A` +
                `*Nombre:* ${nombre}%0A` +
                `*Email:* ${email}%0A` +
                `*Asunto:* ${asunto}%0A%0A` +
                `*Mensaje:*%0A${mensaje}%0A%0A` +
                `*Fecha:* ${new Date().toLocaleDateString('es-GT')}%0A` +
                `*Hora:* ${new Date().toLocaleTimeString('es-GT')}%0A%0A` +
                `_Mensaje enviado desde tu portafolio web_`;
            
            // Número de WhatsApp (formato internacional)
            const numeroWhatsApp = '50240705002';
            
            // Crear URL de WhatsApp
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeWhatsApp}`;
            
            // Efectos visuales del botón
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Abriendo WhatsApp...';
            submitBtn.disabled = true;
            
            // Abrir WhatsApp después de un pequeño delay
            setTimeout(() => {
                window.open(urlWhatsApp, '_blank');
                
                // Restaurar botón y mostrar éxito
                submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado a WhatsApp!';
                submitBtn.style.background = '#25d366';
                
                // Resetear formulario después de un tiempo
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    form.reset();
                    
                    // Mostrar mensaje de confirmación
                    showNotification('¡Perfecto! El mensaje se abrió en WhatsApp. Solo presiona "Enviar" para completar el envío.', 'success');
                }, 3000);
            }, 1000);
        });
        
        // Efectos en los inputs
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.style.borderColor = '#00d4ff';
                this.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
                if (!this.value) {
                    this.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                    this.style.boxShadow = 'none';
                }
            });
        });
    }
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#25d366' : '#00d4ff'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Observer para animaciones generales
function setupIntersectionObserver() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Activar partículas especiales para ciertas secciones
                if (entry.target.id === 'proyectos') {
                    addProjectParticles();
                }
            }
        });
    }, {
        threshold: 0.2
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Efecto glitch mejorado
function setupGlitchEffect() {
    const glitchElement = document.querySelector('.glitch');
    
    if (glitchElement) {
        setInterval(() => {
            if (Math.random() > 0.9) {
                glitchElement.style.animation = 'none';
                glitchElement.offsetHeight; // Trigger reflow
                glitchElement.style.animation = 'glitch 0.3s';
            }
        }, 3000);
    }
}

// Partículas especiales para la sección de proyectos
function addProjectParticles() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            createFloatingParticles(this);
        });
    });
}

function createFloatingParticles(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#00d4ff', '#ff006e', '#8338ec'];
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = rect.left + Math.random() * rect.width + 'px';
        particle.style.top = rect.top + Math.random() * rect.height + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.boxShadow = `0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`;
        
        document.body.appendChild(particle);
        
        // Animación de la partícula
        const animation = particle.animate([
            { 
                transform: 'translateY(0) scale(1)', 
                opacity: 1 
            },
            { 
                transform: 'translateY(-100px) scale(0)', 
                opacity: 0 
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => {
            particle.remove();
        };
    }
}

// Efecto de cursor holográfico
function setupHolographicCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'holographic-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #00d4ff, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: screen;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Efectos hover
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'radial-gradient(circle, #ff006e, transparent)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, #00d4ff, transparent)';
        });
    });
}

// Efecto de matriz en el fondo (opcional)
function setupMatrixEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-2';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const drops = [];
    
    for (let x = 0; x < canvas.width / 10; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00d4ff';
        ctx.font = '15px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(text, i * 10, drops[i] * 10);
            
            if (drops[i] * 10 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 35);
}

// Activar efectos adicionales
document.addEventListener('DOMContentLoaded', function() {
    setupHolographicCursor();
    // setupMatrixEffect(); // Descomentar si quieres el efecto matriz
});

// Optimización de rendimiento
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimizar scroll events
window.addEventListener('scroll', debounce(() => {
    // Eventos de scroll optimizados aquí
}, 10));

// Responsive adjustments
window.addEventListener('resize', debounce(() => {
    // Reajustar partículas y otros elementos
    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        window.pJSDom[0].pJS.fn.canvasSize();
    }
}, 250));

// Preloader (opcional)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Iniciar animaciones de entrada
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

console.log('🚀 Portafolio Holográfico Cargado Exitosamente!');
console.log('✨ Efectos futuristas activados');
console.log('🔮 Sistema holográfico online');