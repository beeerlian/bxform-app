import { OptionType } from "@/types/dto-types";

export const optionTypeList: OptionType[] = ["Importance Performance" ,  "Multiple" , "Ratio"  , "Essai" , "Text"];

export const initialIPAOption = {
       importance: [{label: "Sangat Tidak Penting", value: 1}, {label: "Tidak Penting", value: 2}, {label: "Cukup Penting", value: 3}, {label: "Penting", value: 4}, {label: "Sangat Penting", value: 5}],
       performance: [{label: "Sangat Kurang", value: 1}, {label: "Kurang", value: 2}, {label: "Cukup", value: 3}, {label: "Baik", value: 4}, {label: "Sangat Baik", value: 5}]
}




