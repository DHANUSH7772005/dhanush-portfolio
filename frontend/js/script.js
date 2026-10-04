/* =========================================================
   DHANUSH A - PERSONAL PORTFOLIO
   COMPLETE JAVASCRIPT
========================================================= */

"use strict";

/* =========================================================
   PAGE READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initTheme();
    initNavbar();
    initRevealAnimation();
    initSkills();
    initProjectFilter();
    initContactForm();
    initBackToTop();
    init3DEffects();

});


/* =========================================================
   THEME TOGGLE
========================================================= */

function initTheme() {

    const themeToggle =
        document.getElementById("themeToggle");

    if (!themeToggle) {
        return;
    }

    const icon =
        themeToggle.querySelector("i");

    const savedTheme =
        localStorage.getItem("portfolioTheme");

    if (savedTheme === "light") {

        document.body.classList.add("light-mode");

        updateThemeIcon(icon, true);

    } else {

        document.body.classList.remove("light-mode");

        updateThemeIcon(icon, false);

    }


    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("light-mode");

        const isLight =
            document.body.classList.contains("light-mode");

        localStorage.setItem(
            "portfolioTheme",
            isLight ? "light" : "dark"
        );

        updateThemeIcon(icon, isLight);

    });

}


/* =========================================================
   UPDATE THEME ICON
========================================================= */

function updateThemeIcon(icon, isLight) {

    if (!icon) {
        return;
    }

    if (isLight) {

        icon.classList.remove("bi-moon-fill");

        icon.classList.add("bi-sun-fill");

    } else {

        icon.classList.remove("bi-sun-fill");

        icon.classList.add("bi-moon-fill");

    }

}


/* =========================================================
   NAVBAR
========================================================= */

function initNavbar() {

    const navLinks =
        document.querySelectorAll(
            '.nav-link[href^="#"]'
        );

    const sections =
        document.querySelectorAll("section[id]");


    /* -----------------------------------------------------
       SMOOTH SCROLL
    ----------------------------------------------------- */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbar =
                document.querySelector(".custom-navbar");

            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 70;

            const targetPosition =
                target.getBoundingClientRect().top
                + window.scrollY
                - navbarHeight
                + 2;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });


            /* Close mobile Bootstrap menu */

            const navCollapse =
                document.getElementById("portfolioNav");

            if (
                navCollapse &&
                navCollapse.classList.contains("show") &&
                typeof bootstrap !== "undefined"
            ) {

                const collapse =
                    bootstrap.Collapse.getInstance(
                        navCollapse
                    ) ||
                    new bootstrap.Collapse(
                        navCollapse,
                        {
                            toggle: false
                        }
                    );

                collapse.hide();
            }

        });

    });


    /* -----------------------------------------------------
       ACTIVE NAV LINK
    ----------------------------------------------------- */

    function updateActiveNav() {

        const scrollPosition =
            window.scrollY + 150;

        let currentSection = "home";

        sections.forEach(function (section) {

            const top =
                section.offsetTop;

            const height =
                section.offsetHeight;

            if (
                scrollPosition >= top &&
                scrollPosition < top + height
            ) {

                currentSection =
                    section.id;

            }

        });


        navLinks.forEach(function (link) {

            const href =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === "#" + currentSection
            );

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNav,
        {
            passive: true
        }
    );

    updateActiveNav();

}


/* =========================================================
   REVEAL ANIMATION
========================================================= */

function initRevealAnimation() {

    const elements =
        document.querySelectorAll(".reveal");

    if (!elements.length) {
        return;
    }


    /*
       IMPORTANT:
       First make animation-ready.
       If JavaScript fails, CSS keeps content visible.
    */

    elements.forEach(function (element) {

        element.classList.add("reveal-ready");

    });


    if (
        !("IntersectionObserver" in window) ||
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        elements.forEach(function (element) {

            element.classList.add("visible");

        });

        return;
    }


    const observer =
        new IntersectionObserver(
            function (entries, observerInstance) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observerInstance.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.10
            }
        );


    elements.forEach(function (element) {

        observer.observe(element);

    });

}


/* =========================================================
   SKILL DETAILS DATA
========================================================= */

const skillData = {

    java: {
        title: "Java",
        description:
            "Java is my main programming language. I use it for Core Java programming, OOP concepts and backend development.",
        knowledge:
            "Core Java, OOP, Collections & Basics",
        usage:
            "Backend development and Java projects"
    },

    python: {
        title: "Python Basics",
        description:
            "I have basic knowledge of Python syntax, data handling and programming concepts.",
        knowledge:
            "Python fundamentals",
        usage:
            "Basic programming and data-related learning"
    },

    html: {
        title: "HTML5",
        description:
            "I use HTML5 to create the structure and semantic layout of web pages.",
        knowledge:
            "HTML5 fundamentals",
        usage:
            "Web page structure"
    },

    css: {
        title: "CSS3",
        description:
            "I use CSS3 for styling, responsive layouts, animations and modern UI design.",
        knowledge:
            "CSS3 fundamentals",
        usage:
            "Responsive and attractive interfaces"
    },

    javascript: {
        title: "JavaScript",
        description:
            "I use JavaScript to add dynamic behaviour and interact with backend REST APIs.",
        knowledge:
            "JavaScript fundamentals",
        usage:
            "Frontend logic and API integration"
    },

    bootstrap: {
        title: "Bootstrap",
        description:
            "Bootstrap helps me create responsive layouts and reusable UI components faster.",
        knowledge:
            "Bootstrap 5 basics",
        usage:
            "Responsive frontend development"
    },

    springboot: {
        title: "Spring Boot",
        description:
            "I use Spring Boot to build Java backend applications and REST APIs.",
        knowledge:
            "Spring Boot fundamentals",
        usage:
            "Backend and REST API development"
    },

    restapi: {
        title: "REST API",
        description:
            "I understand how frontend applications communicate with backend services through REST APIs.",
        knowledge:
            "REST API fundamentals",
        usage:
            "Frontend-backend communication"
    },

    mysql: {
        title: "MySQL",
        description:
            "I use MySQL for storing and managing application data using SQL queries.",
        knowledge:
            "SQL and database basics",
        usage:
            "Application data storage"
    },

    git: {
        title: "Git",
        description:
            "I use Git for source code version control and tracking project changes.",
        knowledge:
            "Git fundamentals",
        usage:
            "Version control"
    },

    github: {
        title: "GitHub",
        description:
            "I use GitHub to store projects, manage repositories and share source code.",
        knowledge:
            "Repository and GitHub basics",
        usage:
            "Project hosting and collaboration"
    },

    postman: {
        title: "Postman",
        description:
            "I use Postman to test REST API endpoints and check request and response data.",
        knowledge:
            "API testing basics",
        usage:
            "Testing backend APIs"
    },

    oop: {
        title: "OOP",
        description:
            "I understand Object-Oriented Programming concepts such as classes, objects, inheritance, polymorphism, abstraction and encapsulation.",
        knowledge:
            "Core OOP concepts",
        usage:
            "Java application development"
    },

    dsa: {
        title: "DSA Basics",
        description:
            "I am learning fundamental data structures and algorithms for logical problem solving.",
        knowledge:
            "Basic DSA concepts",
        usage:
            "Problem solving and coding interviews"
    },

    jwt: {
        title: "JWT / Authentication",
        description:
            "I understand the basics of JWT-based authentication and token-based access control.",
        knowledge:
            "Authentication fundamentals",
        usage:
            "Securing REST APIs"
    },

    agile: {
        title: "Agile Basics",
        description:
            "I understand basic Agile concepts such as Sprint, Backlog, Daily Stand-up and iterative development.",
        knowledge:
            "Agile fundamentals",
        usage:
            "Understanding real-world software development"
    }

};


/* =========================================================
   SKILLS
========================================================= */

function initSkills() {

    const skillCards =
        document.querySelectorAll(
            ".interactive-skill"
        );

    const panel =
        document.getElementById(
            "skillDetails"
        );

    const title =
        document.getElementById(
            "skillDetailTitle"
        );

    const description =
        document.getElementById(
            "skillDetailDescription"
        );

    const knowledge =
        document.getElementById(
            "skillKnowledge"
        );

    const usage =
        document.getElementById(
            "skillUsage"
        );

    const closeButton =
        document.getElementById(
            "closeSkillDetails"
        );


    if (!panel) {
        return;
    }


    skillCards.forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                const skillName =
                    card.dataset.skill;

                const data =
                    skillData[skillName];

                if (!data) {
                    return;
                }

                if (title) {
                    title.textContent =
                        data.title;
                }

                if (description) {
                    description.textContent =
                        data.description;
                }

                if (knowledge) {
                    knowledge.textContent =
                        data.knowledge;
                }

                if (usage) {
                    usage.textContent =
                        data.usage;
                }

                panel.classList.add("show");

                panel.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });

            }
        );

    });


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function () {

                panel.classList.remove("show");

            }
        );

    }

}


/* =========================================================
   PROJECT FILTER
========================================================= */

function initProjectFilter() {

    const filterButtons =
        document.querySelectorAll(
            ".filter-btn"
        );

    const projectItems =
        document.querySelectorAll(
            ".project-item"
        );


    if (!filterButtons.length) {
        return;
    }


    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const filter =
                    button.dataset.filter;


                /* Active button */

                filterButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );

                button.classList.add(
                    "active"
                );


                /* Filter projects */

                projectItems.forEach(
                    function (item) {

                        const category =
                            item.dataset.category;

                        if (
                            filter === "all" ||
                            category === filter
                        ) {

                            item.classList.remove(
                                "filter-hidden"
                            );

                        } else {

                            item.classList.add(
                                "filter-hidden"
                            );

                        }

                    }
                );

            }
        );

    });

}


/* =========================================================
   PROJECT DATA
========================================================= */

const projectData = {

    "smart-task": {

        title: "Smart Task Management System",

        type: "Java Full Stack",

        icon: "bi-check2-square",

        description:
            "A Java Full Stack task management web application designed to help users organize and track their daily activities.",

        technologies: [
            "Java",
            "Spring Boot",
            "REST API",
            "MySQL",
            "JavaScript",
            "HTML5",
            "CSS3",
            "JWT"
        ],

        features: [
            "Create, edit and delete tasks",
            "Task priority and status management",
            "Subtask management",
            "Progress tracking",
            "Task reminders",
            "JWT authentication",
            "MySQL database integration"
        ]

    },


    "bus-reservation": {

        title: "Bus Reservation System",

        type: "Core Java",

        icon: "bi-bus-front",

        description:
            "A console-based bus reservation system developed to strengthen Java programming, Object-Oriented Programming and Collections concepts.",

        technologies: [
            "Java",
            "OOP",
            "Collections",
            "ArrayList",
            "Exception Handling"
        ],

        features: [
            "View available buses",
            "Search bus routes",
            "Check seat availability",
            "Book seats",
            "Cancel reservations",
            "Display passenger details"
        ]

    },


    "chatbot": {

        title: "Chatbot Input Validation",

        type: "Web Development",

        icon: "bi-robot",

        description:
            "A web-based project that validates chatbot user input and identifies invalid or incomplete information.",

        technologies: [
            "HTML5",
            "CSS3",
            "JavaScript"
        ],

        features: [
            "User input validation",
            "Invalid input detection",
            "Validation percentage",
            "Interactive interface",
            "Client-side JavaScript validation"
        ]

    }

};


/* =========================================================
   PROJECT FILTER
========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectItems =
    document.querySelectorAll(".project-item");


filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        const filter =
            this.getAttribute("data-filter");


        /* Active button */

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        this.classList.add("active");


        /* Filter projects */

        projectItems.forEach(project => {

            const category =
                project.getAttribute("data-category");


            if (
                filter === "all" ||
                category === filter
            ) {

                project.style.display = "";

                setTimeout(() => {

                    project.classList.add("visible");

                }, 50);

            } else {

                project.classList.remove("visible");

                setTimeout(() => {

                    project.style.display = "none";

                }, 200);

            }

        });

    });

});


/* =========================================================
   PROJECT MODAL
========================================================= */

const projectButtons =
    document.querySelectorAll(".project-details-btn");


projectButtons.forEach(button => {

    button.addEventListener("click", function () {

        const projectId =
            this.getAttribute("data-project");


        const project =
            projectData[projectId];


        if (!project) {
            return;
        }


        /* Title */

        document.getElementById(
            "modalProjectTitle"
        ).textContent = project.title;


        /* Type */

        document.getElementById(
            "modalProjectType"
        ).textContent = project.type;


        /* Description */

        document.getElementById(
            "modalProjectDescription"
        ).textContent = project.description;


        /* Icon */

        document.getElementById(
            "modalProjectIcon"
        ).innerHTML =
            `<i class="bi ${project.icon}"></i>`;


        /* Technologies */

        const techContainer =
            document.getElementById(
                "modalProjectTech"
            );

        techContainer.innerHTML = "";


        project.technologies.forEach(tech => {

            const span =
                document.createElement("span");

            span.textContent = tech;

            techContainer.appendChild(span);

        });


        /* Features */

        const featureContainer =
            document.getElementById(
                "modalProjectFeatures"
            );

        featureContainer.innerHTML = "";


        project.features.forEach(feature => {

            const li =
                document.createElement("li");

            li.innerHTML =
                `<i class="bi bi-check-circle-fill"></i>
                 <span>${feature}</span>`;

            featureContainer.appendChild(li);

        });


        /* Open Bootstrap modal */

        const modalElement =
            document.getElementById("projectModal");


        const modal =
            bootstrap.Modal.getOrCreateInstance(
                modalElement
            );


        modal.show();

    });

});
/* =========================================================
   PROJECT MODAL
========================================================= */

function openProjectDetails(type) {

    const data =
        projectData[type];

    if (!data) {
        return;
    }


    const modalElement =
        document.getElementById(
            "projectModal"
        );

    if (!modalElement) {
        return;
    }


    const modalIcon =
        document.getElementById(
            "modalIcon"
        );

    const modalType =
        document.getElementById(
            "modalType"
        );

    const modalTitle =
        document.getElementById(
            "modalTitle"
        );

    const modalDescription =
        document.getElementById(
            "modalDescription"
        );

    const modalHowBuilt =
        document.getElementById(
            "modalHowBuilt"
        );

    const modalFeatures =
        document.getElementById(
            "modalFeatures"
        );

    const modalTech =
        document.getElementById(
            "modalTech"
        );

    const modalGithub =
        document.getElementById(
            "modalGithub"
        );


    /* Icon */

    if (modalIcon) {

        modalIcon.innerHTML =
            `<i class="${data.icon}"></i>`;

    }


    /* Text */

    if (modalType) {
        modalType.textContent =
            data.type;
    }

    if (modalTitle) {
        modalTitle.textContent =
            data.title;
    }

    if (modalDescription) {
        modalDescription.textContent =
            data.description;
    }

    if (modalHowBuilt) {
        modalHowBuilt.textContent =
            data.howBuilt;
    }


    /* Features */

    if (modalFeatures) {

        modalFeatures.innerHTML = "";

        data.features.forEach(
            function (feature) {

                const li =
                    document.createElement("li");

                li.textContent =
                    feature;

                modalFeatures.appendChild(li);

            }
        );

    }


    /* Technologies */

    if (modalTech) {

        modalTech.innerHTML = "";

        data.technologies.forEach(
            function (technology) {

                const span =
                    document.createElement("span");

                span.textContent =
                    technology;

                modalTech.appendChild(span);

            }
        );

    }


    /* GitHub */

    if (modalGithub) {

        modalGithub.href =
            data.github;

    }


    /* Bootstrap Modal */

    if (
        typeof bootstrap !== "undefined" &&
        bootstrap.Modal
    ) {

        const modal =
            bootstrap.Modal.getOrCreateInstance(
                modalElement
            );

        modal.show();

    } else {

        /*
           Fallback if Bootstrap JS doesn't load.
        */

        modalElement.classList.add("show");

        modalElement.style.display =
            "block";

        modalElement.removeAttribute(
            "aria-hidden"
        );

    }

}


/* =========================================================
   CONTACT FORM
========================================================= */

function initContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );

    const messageBox =
        document.getElementById(
            "formMessage"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                )?.value.trim();

            const email =
                document.getElementById(
                    "email"
                )?.value.trim();

            const subject =
                document.getElementById(
                    "subject"
                )?.value.trim();

            const message =
                document.getElementById(
                    "message"
                )?.value.trim();


            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                showFormMessage(
                    messageBox,
                    "Please fill in all fields.",
                    "error"
                );

                return;

            }


            /* Basic email validation */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                showFormMessage(
                    messageBox,
                    "Please enter a valid email address.",
                    "error"
                );

                return;

            }


            /*
               No backend/email service connected yet.
               So we do NOT falsely say email was sent.
            */

            showFormMessage(
                messageBox,
                "Message form submitted locally. This demo is ready to connect to an email service or backend.",
                "success"
            );


            form.reset();

        }
    );

}


/* =========================================================
   FORM MESSAGE
========================================================= */

function showFormMessage(
    element,
    text,
    type
) {

    if (!element) {
        return;
    }

    element.textContent = text;

    element.className =
        "form-message " + type;

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );

    if (!button) {
        return;
    }


    function updateButton() {

        if (window.scrollY > 500) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        updateButton,
        {
            passive: true
        }
    );


    button.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    updateButton();

}


/* =========================================================
   3D MOUSE EFFECT
========================================================= */

function init3DEffects() {

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }


    /* -----------------------------------------------------
       PROFILE CARD
    ----------------------------------------------------- */

    const profileCard =
        document.querySelector(
            ".profile-card-3d"
        );


    if (profileCard) {

        profileCard.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    profileCard.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateY =
                    ((x - centerX) /
                        centerX) * 7;

                const rotateX =
                    -((y - centerY) /
                        centerY) * 7;

                profileCard.style.transform =
                    `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            }
        );


        profileCard.addEventListener(
            "mouseleave",
            function () {

                profileCard.style.transform =
                    "rotateX(0deg) rotateY(0deg)";

            }
        );

    }


    /* -----------------------------------------------------
       PROJECT CARDS
    ----------------------------------------------------- */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach(
        function (card) {

            card.addEventListener(
                "mousemove",
                function (event) {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateY =
                        ((x - centerX) /
                            centerX) * 3;

                    const rotateX =
                        -((y - centerY) /
                            centerY) * 3;

                    card.style.transform =
                        `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.style.transform =
                        "rotateX(0deg) rotateY(0deg)";

                }
            );

        }
    );

}


/* =========================================================
   ESC KEY
   CLOSE SKILL PANEL
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }


        const skillPanel =
            document.getElementById(
                "skillDetails"
            );

        if (skillPanel) {

            skillPanel.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "Dhanush A Portfolio loaded successfully."
);