const inputField = document.getElementById('command-input');
const historyDiv = document.getElementById('history');
const terminalBody = document.getElementById('terminal-body');

// History variables
const commandHistory = [];
let historyIndex = -1;

// Data info
const data = {
    'about': `
<span class="keyword">PROFESSIONAL PROFILE:</span>

- Cybersecurity & Software Development Technician (Pentester / Developer).
- 6+ years of self-taught experience across CTFs, Hack The Box, and occasional (1/2 years) Bug Bounty / CVE research.
- Offensive security specialist with a "Security by Design" mindset applied to real development work.
- Runs a personal hacking lab for exploitation practice and vulnerability analysis.
- Builds and publishes security tooling: a multi-threaded port scanner, a Linux privilege-escalation binary scanner, and a Bash "Hangman" game.
- 5+ years hands-on with Python, 2+ years with PHP & Java (OOP, MVC, Laravel, Spring Boot, API design/integration), plus Node.js experience.
- Working theoretical knowledge of C, Ruby and Perl.
- Publishes technical write-ups documenting exploitation processes and vulnerability analysis.

Type <span class="keyword">whoami</span> if acronyms and handles aren't enough for you.
    `,
    'skills': `
<span class="keyword">TECHNICAL SKILLS:</span>

- <span class="keyword">Languages & Frameworks:</span> Python, Bash, PowerShell, Java, PHP, C, Dart, JavaScript, Node.js, Laravel, Spring Boot, Ruby, Perl.
- <span class="keyword">Security:</span> Advanced Pentesting, Ethical Hacking, Bug Bounty, CTFs, Hack The Box Labs, SIEM tools, Active Directory, Writeups.
- <span class="keyword">Infrastructure & Cloud:</span> Networks, Hardware, Linux, Windows, Cloud, Vercel, IT Administration.

<span class="keyword">SOFT SKILLS:</span>

- Teamwork.
- Technical communication.
- Continuous self-training.

<span class="keyword">SPOKEN LANGUAGES:</span>

- Spanish (Native).
- English (Intermediate -- advanced technical reading & writing).
    `,
        'experience': `
<span class="keyword">PROFESSIONAL EXPERIENCE:</span>

> <span class="keyword">Cybersecurity Engineer</span> -- Cojali S.L.
  05/2026 - (on-site, full-time)
  Cybersecurity, security testing and integration architecture: threat modeling, security documentation, penetration testing reporting, and cloud/API architecture design.
  Skills: IT Infrastructure, Technical Support, Cybersecurity Risk, IT Services, Technical Assistance.

> <span class="keyword">Web Application Deployment Intern</span> -- Minsait
  03/2025 - 06/2025
  Collaborated on the implementation and rollout of web applications, streamlining deployment processes.
  Stack/tools: Plastic, Agora, Nexus, among others.

> <span class="keyword">IT Systems Administrator</span> -- Hospital General La Mancha Centro
  03/2022 - 06/2022
  User technical support and system maintenance. Network and hardware configuration.

> <span class="keyword">Treasury Administrator</span> -- Gestoría Soluciones Grupo Asesor S.L
  03/2020 - 06/2020
  Document management and customer service.
    `,
    'education': `
<span class="keyword">ACADEMIC BACKGROUND:</span>

* CFGS -- Web Application Development (DAW)
  IES Juan Bosco | 09/2023 - 06/2025

* CFGS -- Network Systems Administration (ASIR)
  IES Juan Bosco | 09/2020 - 06/2022

* CFGM -- Administrative Management
  EFA Molino de Viento | 09/2018 - 06/2020

Type <span class="keyword">courses</span> for extra certifications.
    `,
    'courses': `
<span class="keyword">COURSES & CERTIFICATIONS:</span>

* Cybersecurity Specialization Course
  IES Juan Bosco | 2022/2023
    `,
    'cve': `
<span class="keyword">CVEs:</span>

  [x] <span class="keyword">CVE-2026-10835</span>   -- published.
  [ ] <span class="keyword">CVE-2026-85000</span>   -- status: COORDINATING (not public yet, details withheld until disclosure).

Responsible disclosure takes patience. This list updates as things go public.
    `,
    'alum4r': `
<span class="keyword">BUG BOUNTY / CTF ACHIEVEMENTS:</span>

- 6 years of self-taught training across Bug Bounty programs, CTFs, and Hack The Box.
- Bugcrowd profile: <a href="https://bugcrowd.com/h/n3" target="_blank">bugcrowd.com/h/n3</a>
- Vulnerability classes reported: HTML Injection, XSS, RCE, Information Disclosure, Open Redirect, among others (some accepted privately, outside formal Bug Bounty programs).
- Acknowledged by: Victoria's Secret, SoundCloud, Tether, MetabullAI, among others.
- Regularly publishes technical write-ups covering exploitation and vulnerability-analysis workflows.
    `,
    'whoami': `
<span class="keyword">Alberto Ucendo Martínez</span>, a.k.a. <span class="keyword">alum4r</span>.
Pentester & developer. Yes, you're still just 'guest'.
    `,
    'contact': `
<span class="keyword">CONTACT:</span>

- Email:    <a href="mailto:n3v3rm1nd8@proton.me">n3v3rm1nd8@proton.me</a>
- LinkedIn: <a href="https://www.linkedin.com/in/alberto-ucendo-45470b284/" target="_blank">linkedin.com/in/alberto-ucendo-45470b284</a>

Type <span class="keyword">social</span> for the rest of my profiles.
    `,
    'social': `
<span class="keyword">SOCIAL:</span>

- LinkedIn:  <a href="https://www.linkedin.com/in/alberto-ucendo-45470b284/" target="_blank">linkedin.com/in/alberto-ucendo-45470b284</a>
- Instagram: <span class="hint">(pending -- handle not set yet)</span>
- X/Twitter: <span class="hint">(pending -- handle not set yet)</span>
    `,
    'github': `
<span class="keyword">REPOSITORIES:</span>

You can view my projects and code at:
- <a href="https://github.com/alum4r" target="_blank">github.com/alum4r</a>
- <a href="https://github.com/prueba9865" target="_blank">github.com/prueba9865</a>
    `,
    'ls': `
about.txt   skills.txt   experience.log   education.txt   courses.txt
cve.list    contact.card social.card      github.link     .secrets
    `,
    'neofetch': `
        alum4r@guest
        ------------
<span class="keyword">OS:</span>        Definitely not Windows
<span class="keyword">Shell:</span>     bash (probably)
<span class="keyword">Terminal:</span>  alum4r-term v2
<span class="keyword">Uptime:</span>    6+ years hacking, still debugging
<span class="keyword">Languages:</span> Python, Bash, PHP, Java, JS, C
<span class="keyword">CVEs:</span>      2 (1 public, 1 coordinating)
<span class="keyword">Packages:</span>  too many side-projects (unmanaged)
<span class="keyword">Coffee:</span>    critically low
    `,
    'help': `
<span class="keyword">AVAILABLE COMMANDS:</span>

  <span class="keyword">about</span>       -> Who I am and my professional profile.
  <span class="keyword">whoami</span>      -> The short answer.
  <span class="keyword">skills</span>      -> Technical and soft skills.
  <span class="keyword">experience</span>  -> Work history.
  <span class="keyword">education</span>   -> Academic background.
  <span class="keyword">courses</span>     -> Certifications and specialization courses.
  <span class="keyword">cve</span>         -> Assigned CVEs and their status.
  <span class="keyword">alum4r</span>      -> Bug Bounty / CTF achievements.
  <span class="keyword">contact</span>     -> How to reach me.
  <span class="keyword">social</span>      -> Social profiles.
  <span class="keyword">github</span>      -> Links to my code repositories.
  <span class="keyword">ls</span>          -> List available files.
  <span class="keyword">clear</span>       -> Clear the screen.

<span class="hint">There's more than what's on this list. Type 'help all' to see everything.</span>
    `,
    'help-all': `
<span class="keyword">CORE COMMANDS:</span>

  <span class="keyword">about</span>       -> Who I am and my professional profile.
  <span class="keyword">whoami</span>      -> The short answer.
  <span class="keyword">skills</span>      -> Technical and soft skills.
  <span class="keyword">experience</span>  -> Work history.
  <span class="keyword">education</span>   -> Academic background.
  <span class="keyword">courses</span>     -> Certifications and specialization courses.
  <span class="keyword">cve</span>         -> Assigned CVEs and their status.
  <span class="keyword">alum4r</span>      -> Bug Bounty / CTF achievements.
  <span class="keyword">contact</span>     -> How to reach me.
  <span class="keyword">social</span>      -> Social profiles.
  <span class="keyword">github</span>      -> Links to my code repositories.
  <span class="keyword">ls</span>          -> List available files.
  <span class="keyword">history</span>     -> Commands you've typed this session.
  <span class="keyword">date</span>        -> Current date and time.
  <span class="keyword">echo</span> [text] -> Repeats whatever you type.
  <span class="keyword">clear</span>       -> Clear the screen.

<span class="keyword">JUST FOR FUN:</span>

  <span class="keyword">neofetch</span>    -> System info, but make it fictional.
  <span class="keyword">sudo</span>        -> Try it. See what happens.
  <span class="keyword">coffee</span>      -> An HTTP status you didn't ask for.
  <span class="keyword">decode</span>      -> Solves the base64 riddle from the welcome banner.
  <span class="keyword">hack</span>        -> A completely fake breach sequence.
  <span class="keyword">matrix</span>      -> Binary, for the aesthetic.

<span class="hint">'help' shows the short list. 'help all' shows everything, including this.</span>
    `
};

inputField.addEventListener('keydown', function(event) {
    // Detect ArrowUp key for history navigation
    if (event.key === 'ArrowUp') {
        event.preventDefault(); // Prevent cursor movement
        if (commandHistory.length === 0) return;

        // Move one step back in history
        historyIndex = Math.max(0, historyIndex - 1);
        inputField.value = commandHistory[historyIndex] || '';

        return;
    }

    // Detect ArrowDown key for history navigation
    if (event.key === 'ArrowDown') {
        event.preventDefault(); // Prevent cursor movement
        if (commandHistory.length === 0) return;

        // Move one step forward in history
        historyIndex = Math.min(commandHistory.length, historyIndex + 1);

        if (historyIndex === commandHistory.length) {
            inputField.value = ''; // Clear input if navigating past the last command
        } else {
            inputField.value = commandHistory[historyIndex];
        }
        
        return;
    }
    
    // Detect Ctrl + L (or Cmd + L on Mac)
    if ((event.ctrlKey || event.metaKey) && (event.key === 'l' || event.key === 'L')) {
        event.preventDefault(); // Prevent default browser action
        clearScreen();
        return;
    }

    if (event.key === 'Enter') {
        // Delete spaces and more here for proper command recognition
        const input = inputField.value.trim();
        processCommand(input);
        inputField.value = '';
        
        // Reset history index to the end after execution
        historyIndex = commandHistory.length;
    }
});

// Keep focus on the input field
document.addEventListener('click', function() {
    inputField.focus();
});

function printCommandLine(cmd) {
    const cmdLine = document.createElement('div');
    cmdLine.className = 'output-line';
    cmdLine.innerHTML = `<span class="prompt">guest@alum4r:~$</span> ${cmd}`;
    historyDiv.appendChild(cmdLine);
}

function printOutput(html, colorOverride) {
    const output = document.createElement('div');
    output.className = 'command-output';
    if (colorOverride) output.style.color = colorOverride;
    output.innerHTML = html;
    historyDiv.appendChild(output);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function clearScreen() {
    historyDiv.innerHTML = '';
    const welcomeMsg = document.querySelector('.welcome-msg').cloneNode(true);
    historyDiv.appendChild(welcomeMsg);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// A handful of not-found responses, picked at random -- because 'command not found' gets old fast.
const notFoundMessages = [
    (cmd) => `bash: ${cmd}: command not found. Try 'help', or keep guessing -- your call.`,
    (cmd) => `404: '${cmd}' not found on this filesystem. It was never here to begin with.`,
    (cmd) => `Segmentation fault (core not dumped, because '${cmd}' isn't a real command).`,
    (cmd) => `'${cmd}'? Bold guess. Wrong, but bold. Try 'help'.`,
    (cmd) => `Access denied: '${cmd}' requires a clearance level this terminal doesn't grant. Try 'help'.`
];

function processCommand(rawCmd) {
    const trimmed = rawCmd.trim();
    const lowerCaseCmd = trimmed.toLowerCase();
    const parts = trimmed.split(/\s+/).filter(Boolean);
    const command = parts.length ? parts[0].toLowerCase() : '';
    const args = parts.slice(1).join(' ');

    // Save non-empty, non-clear commands to history
    if (lowerCaseCmd !== '' && lowerCaseCmd !== 'clear') {
        if (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== trimmed) {
            commandHistory.push(trimmed);
        }
    }

    if (trimmed !== '') {
        printCommandLine(trimmed);
    }

    switch (command) {
        case '':
            return;

        case 'clear':
            clearScreen();
            return;

        case 'history':
            if (commandHistory.length === 0) {
                printOutput(`No commands typed yet. This is a fresh start.`);
            } else {
                printOutput(commandHistory.map((c, i) => `  ${i + 1}  ${c}`).join('\n'));
            }
            return;

        case 'date':
            printOutput(new Date().toString());
            return;

        case 'echo':
            printOutput(args || '');
            return;

        case 'whoami':
            printOutput(data['whoami']);
            return;

        case 'help':
            if (/^(all|-a|--all)$/i.test(args)) {
                printOutput(data['help-all']);
            } else {
                printOutput(data['help']);
            }
            return;

        case 'sudo':
            if (/rm\s+-rf/.test(args)) {
                printOutput(`Nice try. 📸 Screenshotted this for the wall of fame.`, '#ff5555');
            } else {
                printOutput(`guest is not in the sudoers file. This incident will be reported.\n(jk. nobody's watching. probably.)`, '#ff5555');
            }
            return;

        case 'coffee':
            printOutput(`418 I'm a teapot ☕ -- but I'll take an espresso if you're offering.`);
            return;

        case 'decode':
            printOutput(`atob("V2VsY29tZSB0byBhbHVtNHIncyB0ZXJtaW5hbC4=") == "${atob('V2VsY29tZSB0byBhbHVtNHIncyB0ZXJtaW5hbC4=')}"\n\nYou solved the hard-hitting cryptographic challenge at the top of the page. Well done.`);
            return;

        case 'hack':
            printOutput(`Initiating breach protocol...\nBypassing firewall [██████████] 100%\nCracking credentials... nope.\n\nACCESS DENIED. This is a portfolio, not a CTF box. 😏`, '#e2b93d');
            return;

        case 'matrix':
            printOutput(`0100100001100001011000110110101100100000011101000110100001100101\n0101001001101100011000010110111001100101011101000010000001101001\n0110011000100000011110010110111101110101001000000111011101100001\n0110111001110100\n\n(translated for the impatient: this is just for show)`);
            return;

        case 'exit':
        case 'logout':
            printOutput(`There's no escaping a static site. Try 'clear' instead.`);
            return;

        default:
            if (Object.prototype.hasOwnProperty.call(data, command)) {
                printOutput(data[command]);
            } else {
                const msg = notFoundMessages[Math.floor(Math.random() * notFoundMessages.length)](trimmed);
                printOutput(msg, '#ff5555');
            }
            return;
    }
}

// On load, move welcome message to history and remove from main body
document.addEventListener('DOMContentLoaded', function() {
    const welcomeMsg = document.querySelector('.welcome-msg');
    const welcomeClone = welcomeMsg.cloneNode(true);
    welcomeMsg.remove();
    historyDiv.appendChild(welcomeClone);
});
