((globalThis) => {
    const core = Deno.core;
    function argsToMessage(...args) {
        return args.map((arg) => JSON.stringify(arg)).join(" ");
    }

    const sarcasticPhrases = [
        "Oh, brilliant idea!",
        "Wow, never heard that one before...",
        "Oh, how original...",
        "Congratulations, you broke the code!",
        "Great job, you found a bug!",
        "Keep up the good work, genius!",
        "The brilliance is blinding...",
        "I'm in awe of your coding skills...",
        "You must be a real expert...",
        "Such a groundbreaking contribution...",
        "You should be a comedian...",
        "Sarcasm level: expert...",
    ];

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    }

    let debugMode = false; 
    globalThis.console = {
        log: (...args) => {
            core.print(`[out]: ${argsToMessage(...args)}\n`, false);
        },
        sarcasm: (...args) => {
            const time = getCurrentTime();
            const sarcasticMessage = sarcasticPhrases[Math.floor(Math.random() * sarcasticPhrases.length)];
            const message = argsToMessage(...args) + `\n\x1b[33m${sarcasticMessage}\x1b[0m`; 
            const logMessage = `\x1b[1;36m[${time}] [message]:\x1b[0m ${message}`;
            core.print(`${logMessage}\n`, true);
        },
        warn: (...args) => {
            const time = getCurrentTime();
            const message = argsToMessage(...args);
            const logMessage = `\x1b[1;33m[${time}] [warn]:\x1b[0m ${message}`;
            core.print(`${logMessage}\n`, true);
        },
        error: (...args) => {
            const time = getCurrentTime();
            const message = argsToMessage(...args);
            const logMessage = `\x1b[1;31m[${time}] [error]:\x1b[0m ${message}`;
            core.print(`${logMessage}\n`, true);
        },
        debug: (...args) => {
            if (debugMode) {
                const time = getCurrentTime();
                const message = argsToMessage(...args);
                const logMessage = `\x1b[1;34m[${time}] [debug]:\x1b[0m ${message}`;
                core.print(`${logMessage}\n`, true);
            }
        },
        setDebugMode: (mode) => {
            debugMode = mode;
        }
    };
})(globalThis);
