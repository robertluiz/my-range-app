import {api} from "@services/api";

export const RangeService = {
    getMinMaxValues: async (): Promise<minMaxResponseChild> => {
        const { data } = await api.get<minMaxResponse>('min-max')
        return data[0]
    },
    getRangeValues: async (): Promise<rangeValuesResponseChild> => {
        const { data } = await api.get<rangeValuesResponse>('range')
        return data[0]
    }
}
export type minMaxResponse = minMaxResponseChild[];
export type minMaxResponseChild = {
	min: number;
	max: number;
	id: number;
}

export type rangeValuesResponse = rangeValuesResponseChild[];
export type rangeValuesResponseChild = {
	rangeValues: number[];
	id: string;
}
