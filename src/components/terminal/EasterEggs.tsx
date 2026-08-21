import React, {
  useEffect,
    useRef,
  useMemo,
  useState,
} from "react";

export type EasterEggType =
  | "default"
  | "muted"
  | "error"
  | "success";

export type EasterEggAction =
  | "crash";

export type EasterEggEntry = {
  content: React.ReactNode;
  type?: EasterEggType;
  action?: EasterEggAction;
};

/* ------------------------------------------------------------------ */
/*  Matrix Rain (Intégré au Terminal)                                 */
/* ------------------------------------------------------------------ */

const MATRIX_CHARS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";

function MatrixRain() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ajustement de la taille du canvas à la largeur du terminal
    const width = container.clientWidth;
    const height = 180; // Hauteur du bloc dans le terminal
    canvas.width = width;
    canvas.height = height;

    const fontSize = 13;
    const columns = Math.max(1, Math.floor(width / fontSize));
    const drops: number[] = Array.from({ length: columns }, () =>
      Math.floor(Math.random() * -30)
    );

    const draw = () => {
      // Effet d'atténuation pour la traînée
      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text =
          MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Tête de la goutte plus lumineuse
        ctx.fillStyle = "#a7f3d0"; // emerald-200
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = window.setInterval(draw, 40);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-44 my-2 overflow-hidden rounded bg-black/80 border border-emerald-900/50 select-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ASCII art & contenus                                              */
/* ------------------------------------------------------------------ */

const RM_RF_PATTERNS = [
  "rm -rf /",
  "rm -rf /*",
  "rm -rf *",
  "rm -rf",
];

const SL_TRAIN = `
      ====        ________                ___________
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ |   |        =|___ ___|
   /     |  |   H  |  |     |   |         ||_| |_||
  |      |  |   H  |__--------------------| [___] |
  | ________|___H__/__|_____/[][]~\\_______|       |
  |/ |   |-----------I_____I [][] []  D   |=======|
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__
 |/-=|___|=    ||    ||    ||    |_____/~\\___/
  \\_/      \\O=====O=====O=====O_/      \\_/
`;

const COFFEE_ART = `
      ) ) )
     ( ( (
    .......
    |     |]
    \\     /
     \`---'
`;

/* ------------------------------------------------------------------ */
/*  Résolution des commandes cachées                                  */
/* ------------------------------------------------------------------ */

export function tryEasterEgg(
  normalized: string,
): EasterEggEntry[] | null {

  /* -------------------------------------------------------------- */
  /* rm -rf → faux crash serveur                                    */
  /* -------------------------------------------------------------- */

  if (RM_RF_PATTERNS.includes(normalized)) {
    return [
      {
        content: (
          <div className="space-y-1">
            <p>
              Suppression de / en cours...
            </p>

            <p className="text-red-500 dark:text-red-400">
              Permission accordée. Mauvaise idée.
            </p>
          </div>
        ),
        type: "error",
        action: "crash",
      },
    ];
  }

  /* -------------------------------------------------------------- */
  /* sudo                                                          */
  /* -------------------------------------------------------------- */

  if (normalized.startsWith("sudo")) {
    return [
      {
        content: (
          <p>
            justin is not in the sudoers
            file. This incident will be
            reported.
          </p>
        ),
        type: "error",
      },
    ];
  }

  /* -------------------------------------------------------------- */
  /* whoami                                                        */
  /* -------------------------------------------------------------- */

  if (normalized === "whoami") {
    return [
      {
        content: (
          <p>
            un développeur qui teste si tu
            lis vraiment le contenu du
            terminal
          </p>
        ),
        type: "muted",
      },
    ];
  }

  /* -------------------------------------------------------------- */
  /* sl                                                            */
  /* -------------------------------------------------------------- */

  if (normalized === "sl") {
    return [
      {
        content: (
          <pre className="text-neutral-500 dark:text-neutral-400 leading-tight">
            {SL_TRAIN}
          </pre>
        ),
        type: "muted",
      },
      {
        content: (
          <p className="text-neutral-400 dark:text-neutral-500">
            Tu voulais taper "ls" ?
          </p>
        ),
        type: "muted",
      },
    ];
  }

  /* -------------------------------------------------------------- */
  /* coffee                                                        */
  /* -------------------------------------------------------------- */

  if (
    normalized === "coffee" ||
    normalized === "☕"
  ) {
    return [
      {
        content: (
          <pre className="text-neutral-500 dark:text-neutral-400 leading-tight">
            {COFFEE_ART}
          </pre>
        ),
        type: "muted",
      },
      {
        content: (
          <p>
            En attente de caféine...
          </p>
        ),
        type: "muted",
      },
    ];
  }

  /* -------------------------------------------------------------- */
  /* matrix                                                        */
  /* -------------------------------------------------------------- */

  /* A revoir 
   if (normalized === "matrix") {
    return [
      {
        content: (
          <div className="space-y-2">
            <MatrixRain />
            <p className="text-emerald-500 dark:text-emerald-400 font-mono text-xs">
              Wake up, Neo...
            </p>
          </div>
        ),
        type: "success",
      },
    ];
  }*/

  return null;
}