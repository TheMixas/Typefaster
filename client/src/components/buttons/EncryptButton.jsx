import { useRef, useState } from "react";
import { FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import './../buttons/SCSS/encrypt_button.scss'
import { GiRunningNinja } from "react-icons/gi";





const CHARS = "________";

export default function EncryptButton ({customClass='',buttonText="RACE NOW",backgroundColor, _onClick=()=>{}, CYCLES_PER_LETTER=2,SHUFFLE_TIME = 50}) {
    const intervalRef = useRef(null);

    const [text, setText] = useState(buttonText);

    const scramble = () => {
        let pos = 0;

        intervalRef.current = setInterval(() => {
            const scrambled = buttonText.split("")
                .map((char, index) => {
                    if (pos / CYCLES_PER_LETTER > index) {
                        return char;
                    }

                    const randomCharIndex = Math.floor(Math.random() * CHARS.length);
                    const randomChar = CHARS[randomCharIndex];

                    return randomChar;
                })
                .join("");

            setText(scrambled);
            pos++;

            if (pos >= buttonText.length * CYCLES_PER_LETTER) {
                stopScramble();
            }
        }, SHUFFLE_TIME);
    };

    const stopScramble = () => {
        clearInterval(intervalRef.current || undefined);

        setText(buttonText);
    };

    return (
        <motion.button
            whileHover={{
                scale: 1.025,
            }}
            whileTap={{
                scale: 0.975,
            }}
            onMouseEnter={scramble}
            onMouseLeave={stopScramble}
            //group relative overflow-hidden rounded-lg border-[1px] border-slate-500 bg-slate-700 px-4 py-2 font-mono font-medium uppercase text-slate-300 transition-colors hover:text-indigo-300 old scss
            className={`button-wrapper ${customClass}`}
            onClick={_onClick}
        >
            <div className={`encrypt-button ${customClass}`}>
                <GiRunningNinja style={{height:"5rem",width:"5rem"}} />
                <span className={"encrypt-button--text"}>{text}</span>
            </div>
            <motion.span
                initial={{
                    y: "100%",
                }}
                animate={{
                    y: "-100%",
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 1,
                    ease: "linear",
                }}
                className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
            />
        </motion.button>
    );
};

