import { getTransfers } from "@/utils/apiFootball";
import { useQuery } from "react-query";

export default function Transfers({teamId}) {
    const {data: transferData, isLoading} = useQuery(
        ['transferData', teamId], () => getTransfers(teamId), {
            staleTime: Infinity,
            cacheTime: Infinity,
        }
    );

    const filterTransfers = (transferData) => {
        if (!transferData) {
            return []
        }
        const filterByYear = transferData?.filter(transfer => transfer.transfers[0].date.includes('2024'))
        const transfersOut = filterByYear.filter(transfer => transfer.transfers[0].teams.out.id === teamId)
        const transfersIn = filterByYear.filter(transfer => transfer.transfers[0].teams.out.id !== teamId)

        return transfersOut
        
    }

    console.log(filterTransfers(transferData))
    
    
}