import { useEffect, useState } from "react"
let sound = document.getElementById("beep");
let coulor = "rgb(223, 223, 223)";
const Timer = () => {
    const [brek, setBrek] = useState(5);
    const [session, setSession] = useState(25);
    const [inSess, setInse] = useState(true);
    const [timeSec, setSec] = useState(0);
    const [timeMin, setMin] = useState(session);
    const [play, setPlay] = useState(false);
    const [Color, setColor] = useState(coulor);

    const handleRefresh = () => {
        setColor(coulor);
        setPlay(false);
        setInse(true);
        setSession(25);
        setBrek(5);
        setMin(25);
        setSec(0);
        sound.pause();
        sound.currentTime = 0;
    };
    let changePace = function () {
        if (play) {
            setPlay(false)
        } else if (!play) {
            setPlay(true)
        };
    };

     useEffect(() => {
        if (play) {
            const timeout = setTimeout(() => {
                if (timeSec > 0) {
                    setSec(timeSec - 1);
                    if (timeSec === 55) {
                        sound.pause();
                        sound.currentTime = 0;
                    };
                    if (timeMin === 0) {
                        setColor("red")
                    } else {
                        setColor(coulor)
                    }
                } else {
                    if (timeMin === 0 && inSess) {
                        setMin(brek);
                        setInse(false);
                        setSec(0);
                        sound.play();
                        setColor(coulor);
                    } else if (timeMin === 0 && !inSess) {
                        setMin(session);
                        setInse(true);
                        setSec(0);
                        sound.play();
                        setColor(coulor)
                    } else {
                        if (timeMin===1) {
                            setColor("red");
                        } else {
                            setColor(coulor)
                        };
                        setMin(timeMin - 1);
                        setSec(59);
                    }
                }
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [timeSec, timeMin, play, brek, session, inSess, Color]);


    const handleBreak = (action) => {
        if (action === "increment") {
            if (brek < 60) {
                let newMad = brek + 1;
                setBrek(newMad);
                if (!inSess) {
                    setColor(coulor);
                    setMin(newMad);
                    setSec(0);
                };
            }
        } else {
            if (brek > 1) {
                let newMad = brek - 1;
                setBrek(newMad);
                if (!inSess) {
                    setColor(coulor);
                    setMin(newMad);
                    setSec(0);
                };
            }
        }
    };
    const handleSession = (action) => {
        if (action === "increment") {
            if (session < 60) {
                let newMad = session + 1;
                setSession(newMad);
                if (inSess) {
                    setColor(coulor);
                    setMin(newMad);
                    setSec(0);
                }
            }
        } else {
            if (session > 1) {
                let newMad = session - 1;
                setSession(newMad);
                if (inSess) {
                    setColor(coulor);
                    setMin(newMad);
                    setSec(0);
                }
            }
        }
    };
    return (
        <div className="timer">
            <h2>TIMER</h2>
            <div className="break-session">
                <div className="break">
                    <div id="break-label">Break Length</div>
                    <div className="inBreak">
                        <i onClick={() => { !play && handleBreak("decrement") }} id="break-decrement" class="fa fa-arrow-circle-o-down"></i>
                        <p id="break-length">{brek}</p>
                        <i onClick={() => { !play && handleBreak("increment") }} id="break-increment" class="fa fa-arrow-circle-o-up"></i>
                    </div>
                </div>
                <div className="session">
                    <div id="session-label">Session Length</div>
                    <div className="inSession">
                        <i onClick={() => { !play && handleSession("decrement") }} id="session-decrement" class="fa fa-arrow-circle-o-down"></i>
                        <p id="session-length">{session}</p>
                        <i onClick={() => { !play && handleSession("increment") }} id="session-increment" class="fa fa-arrow-circle-o-up"></i>
                    </div>
                </div>
            </div>
            <div className="dynamic" style={{color: Color}}>
                {inSess && <div id="timer-label">Session</div>}
                {!inSess && <div id="timer-label">Break</div>}
                <div id="time-left">{timeMin > 9 ? timeMin : "0" + timeMin}:{timeSec < 10 ? "0" + timeSec : timeSec}</div>
                <div className="controls">
                    {play && <i onClick={changePace} id="start_stop" class="fa fa-pause-circle-o" aria-hidden="true"></i>}
                    {!play && <i onClick={changePace} id="start_stop" class="fa fa-play-circle-o" aria-hidden="true"></i>}
                    <i onClick={handleRefresh} id="reset" class="fa fa-refresh" aria-hidden="true"></i>
                </div>
            </div>
            {/* <audio id="beep" src="https://drive.google.com/file/d/1hMwcYzJjTJbkZC6d1TCqgCORCcUlCIrX/view?usp=sharing">
              <source  type="audio/mpeg" /> 
            </audio> */}
        </div>
    );
}

export default Timer;