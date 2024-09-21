import { getTransfers } from "@/utils/apiFootball";
import { useQuery } from "react-query";
import "../styling/transfers.css"
import Image from "next/image";
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import { Commet } from "react-loading-indicators";



export default function Transfers({teamId}) {
    const {data: transferData, isLoading} = useQuery(
        ['transferData', teamId], () => getTransfers(teamId), {
            staleTime: Infinity,
            cacheTime: Infinity,
        }
    );

    const filterPlayersOut = (transferData) => {
        if (!transferData) {
            return []
        }
        const filterByYear = transferData?.filter(transfer => transfer.transfers[0].date.includes('2024'))
        const transfersOut = filterByYear.filter(transfer => transfer.transfers[0].teams.out.id === teamId)
        return transfersOut
    }

    const filterPlayersIn = (transferData) => {
        if (!transferData) {
            return []
        }
        const filterByYear = transferData?.filter(transfer => transfer.transfers[0].date.includes('2024'))
        const playersIn = filterByYear.filter(transfer => transfer.transfers[0].teams.out.id !== teamId)
        const transfersIn = playersIn.filter(player => player.transfers[0].type !== 'N/A')
        return transfersIn
    }
    
    const playersIn = filterPlayersIn(transferData);
    const playersOut = filterPlayersOut(transferData);

    if (isLoading) {
        return <div><Commet color="#32cd32" size="medium" text="" textColor="" /></div>
    }

    return (
        <div className="transfers-container">
            <div className="transfers">
                <h2>Players In</h2>
                {playersIn.map((player, i) => (
                    <div className="players-in" key={i}>
                        <h3>{player.player.name}</h3>
                        <p>{player.transfers[0].type}</p>
                        <div className="transfer-logo">
                        <Image src={player.transfers[0].teams.out.logo} 
                        alt="image for players" 
                        height={75} 
                        width={75} 
                        priority={true} />
                        <FaArrowRight className="arrow-icon-right" />
                        <Image src={player.transfers[0].teams.in.logo} 
                        alt="image for players" 
                        height={75} 
                        width={75} 
                        priority={true} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="transfers">
                <h2>Players Out</h2>
                {playersOut.map((player, i) => (
                    <div className="players-out" key={i}>
                        <h3>{player.player.name}</h3>
                        <p>{player.transfers[0].type}</p>
                        <div className="transfer-logo">
                        <Image src={player.transfers[0].teams.out.logo}
                        alt="image for players"
                        height={75}
                        width={75}
                        priority={true} />
                        <FaArrowRight className="arrow-icon-left" />
                        <Image src={player.transfers[0].teams.in.logo}
                        alt="image for players"
                        height={75}
                        width={75}
                        priority={true} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
    
}