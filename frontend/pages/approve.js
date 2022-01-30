import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'

export default function Approve() {
    const [addresses, setAddresses] = useState([]);

    const approve = async (address) => {
        fetch("/api/approveRegister?address=" + address).then(res => res.json()).then(data => {
        });
    }

    let x = 0;
    useEffect(() => {
        fetch("/api/getRegisterRequests").then(res => res.json()).then(data => {
            let HTML = [];
            let temp = data.result;
            for(let i = 0; i < data.result.length; i++) {
                HTML.push(
                    <>
                        <div className={styles.user}>
                            Name: {temp[i].name} <br />
                            Email: {temp[i].email} <br />
                            Address: {temp[i].address} <br />

                            <div className={styles.approve} onClick={() => approve(temp[i].address)}>Approve</div>
                        </div>
                    </>
                );
            }

            setAddresses(HTML);
        });
    }, [x]);

    return (
        <>
            {addresses}
        </>
    )
}