import {minMaxResponseChild, RangeService} from "@services/range";
import {useQuery} from "react-query";

export const useMinMax = () => {
return useQuery<minMaxResponseChild>(['min-max'], RangeService.getMinMaxValues)
}

export const useRangeValues = () => {
    return useQuery(['range'], RangeService.getRangeValues)
}
