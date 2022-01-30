import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Image from 'next/image';

export default function Results() {
    const [votes, setVotes] = useState([]);

    useEffect(() => {
        fetch("/api/getElectionResults").then(res => res.json()).then(data => {
            let temp = data.result;

            let HTML = [];

            let winner = ["", 0];

            for(let i = 0; i < temp.length; i++) {
                if(temp[3] > winner[1]) {

                }
                
                HTML.push(
                    <>
                        <div className={styles.candidate}>
                            Candidate: {temp[i][1]}
                            <br />
                            Votes: {temp[i][3]}

                            <br /> <br />
                        </div>
                    </>
                )
            }

            setVotes(HTML);
        });
    })

    return (
        <>
            <div className={styles.results}>
                <h1>Results</h1>
                {votes}

                <Image src="/barplot.png" width={1200} height={800}/>
            </div>
        </>
    )
}